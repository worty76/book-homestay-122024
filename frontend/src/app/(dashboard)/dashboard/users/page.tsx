"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { UserDialog } from "../../../../components/dashboard/users/user-dialog";
import { DeleteConfirmDialog } from "../../../../components/dashboard/users/delete-confirm-dialog";
import { toast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/useAuthStore";

// Define user type
interface User {
  _id: string;
  username: string;
  email: string;
  phoneNumber: string;
  identificationNumber: string;
  isAdmin: boolean;
  verifiedAccount: boolean;
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
    };
  };
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]); // Add token as dependency

  const fetchUsers = async () => {
    if (!token) {
      toast({
        title: "Error",
        description: "Authentication required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast({
            title: "Session Expired",
            description: "Please login again",
            variant: "destructive",
          });
          return;
        }
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      if (data && data.users && Array.isArray(data.users)) {
        setUsers(data.users);
      } else if (Array.isArray(data)) {
        setUsers(data);
      } else {
        throw new Error("Invalid data format received from API");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
      // Fallback data
      setUsers([
        {
          _id: "1",
          username: "John Doe",
          email: "john@example.com",
          phoneNumber: "1234567890",
          identificationNumber: "ID123",
          isAdmin: false,
          verifiedAccount: true,
          preferences: {
            notifications: {
              email: true,
              sms: false,
            },
          },
        },
        {
          _id: "2",
          username: "Jane Smith",
          email: "jane@example.com",
          phoneNumber: "0987654321",
          identificationNumber: "ID456",
          isAdmin: true,
          verifiedAccount: true,
          preferences: {
            notifications: {
              email: true,
              sms: true,
            },
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: Omit<User, "_id">) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Failed to create user");

      const newUser = {
        ...userData,
        _id: Math.floor(Math.random() * 1000).toString(),
      };
      setUsers([...users, newUser]);

      toast({
        title: "Success",
        description: "User created successfully",
      });
      return true;
    } catch (error) {
      console.error("Error creating user:", error);
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateUser = async (id: string, userData: Omit<User, "_id">) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/${id}/admin`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) throw new Error("Failed to update user");

      setUsers(
        users.map((user) => (user._id === id ? { ...userData, _id: id } : user))
      );

      toast({
        title: "Success",
        description: "User updated successfully",
      });
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete user");

      setUsers(users.filter((user) => user._id !== id));

      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleEdit = (user: User) => {
    setUserToEdit(user);
    setIsUserDialogOpen(true);
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (formData: Omit<User, "_id">) => {
    let success = false;

    if (userToEdit) {
      success = await updateUser(userToEdit._id, formData);
    } else {
      success = await createUser(formData);
    }

    if (success) {
      setIsUserDialogOpen(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    const success = await deleteUser(userToDelete._id);
    if (success) {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Users</h1>
        <Button
          onClick={() => {
            setUserToEdit(null);
            setIsUserDialogOpen(true);
          }}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users && Array.isArray(users) && users.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-4 text-muted-foreground"
                    >
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users &&
                  Array.isArray(users) &&
                  users.map((user) => (
                    <TableRow key={user._id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {user.username}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                      <TableCell>
                        <Badge variant={user.isAdmin ? "default" : "secondary"}>
                          {user.isAdmin ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.verifiedAccount ? "default" : "secondary"
                          }
                        >
                          {user.verifiedAccount ? "Verified" : "Unverified"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(user)}
                            className="flex items-center gap-1"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(user)}
                            className="flex items-center gap-1"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <UserDialog
        open={isUserDialogOpen}
        onOpenChange={setIsUserDialogOpen}
        user={userToEdit}
        onSubmit={handleFormSubmit}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        userName={userToDelete?.username || ""}
      />
    </div>
  );
}
