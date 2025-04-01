"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { BlogDataTable } from "@/components/dashboard/blogs/blog-data-table";
import { AddBlogDialog } from "@/components/dashboard/blogs/add-blog-dialog";
import { EditBlogDialog } from "@/components/dashboard/blogs/edit-blog-dialog";
import { Blog, FormDataBlog } from "@/components/dashboard/blogs/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function BlogsPage() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormDataBlog>({
    title: "",
    summary: "",
    content: "",
    category: "",
    tags: "",
  });
  const token = useAuthStore((state) => state.token);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data: Blog[] = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch blogs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const formDataToSend = new FormData();

      (Object.keys(formData) as Array<keyof FormDataBlog>).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      if (image) {
        formDataToSend.append("files", image);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create blog");
      }

      const updatedBlogs = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog`
      ).then((res) => res.json());

      setBlogs(updatedBlogs);

      toast.success("Blog created");

      // Reset form
      setFormData({
        title: "",
        summary: "",
        content: "",
        category: "",
        tags: "",
      });
      setImage(null);
      setPreview(null);
      setIsSubmitting(false);
      setOpen(false);
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setEditDialogOpen(true);
  };

  const handleSaveBlog = async (updatedBlog: Blog, files?: FileList) => {
    try {
      const formData = new FormData();
      formData.append("blogData", JSON.stringify(updatedBlog));

      if (files) {
        Array.from(files).forEach((file) => {
          formData.append("files", file);
        });
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/update/${updatedBlog._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update blog");
      }

      // Refresh blog list
      const updatedBlogs = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog`
      ).then((res) => res.json());

      setBlogs(updatedBlogs);

      toast.success("Blog updated");

      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update blog"
      );
    }
  };

  const handleDeleteBlog = (blog: Blog) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!blogToDelete) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/delete/${blogToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      // Update blogs list
      const updatedBlogs = blogs.filter(
        (blog) => blog._id !== blogToDelete._id
      );
      setBlogs(updatedBlogs);

      toast.success("Blog deleted");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog. Please try again.");
    } finally {
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Blogs</h1>
        <Button onClick={() => setOpen(true)}>Add Blog</Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center p-8">
          <div className="text-center text-red-500">{error}</div>
        </div>
      ) : (
        <BlogDataTable
          blogs={blogs}
          onEditBlog={handleEditBlog}
          onDeleteBlog={handleDeleteBlog}
        />
      )}

      <AddBlogDialog
        open={open}
        setOpen={setOpen}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        formData={formData}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        preview={preview}
      />
      <EditBlogDialog
        blog={selectedBlog}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleSaveBlog}
      />
      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-4">
              Are you sure you want to delete this blog? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setBlogToDelete(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
