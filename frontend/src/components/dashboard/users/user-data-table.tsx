"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import {
  createSortableColumn,
  createColumn,
  createActionsColumn,
} from "@/components/ui/data-table/columns";

// Define user type for the component
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

interface UserDataTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

export function UserDataTable({
  users,
  onEditUser,
  onDeleteUser,
}: UserDataTableProps) {
  const columns = [
    createSortableColumn<User, string>(
      "username",
      "Username",
      ({ getValue }) => <div className="font-medium">{getValue()}</div>
    ),

    createSortableColumn<User, string>("email", "Email", ({ getValue }) => (
      <div>{getValue()}</div>
    )),

    createColumn<User, string>("phoneNumber", "Phone", ({ getValue }) => (
      <div>{getValue()}</div>
    )),

    createColumn<User, boolean>("isAdmin", "Admin", ({ getValue }) => (
      <Badge variant={getValue() ? "default" : "secondary"}>
        {getValue() ? "Yes" : "No"}
      </Badge>
    )),

    createColumn<User, boolean>(
      "verifiedAccount",
      "Verified",
      ({ getValue }) => (
        <Badge variant={getValue() ? "default" : "secondary"}>
          {getValue() ? "Verified" : "Unverified"}
        </Badge>
      )
    ),

    createActionsColumn<User>((row) => (
      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEditUser(row)}
          className="flex items-center gap-1"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDeleteUser(row)}
          className="flex items-center gap-1"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      </div>
    )),
  ];

  return (
    <DataTable
      columns={columns}
      data={users}
      searchColumn="username"
      searchPlaceholder="Search users..."
    />
  );
}
