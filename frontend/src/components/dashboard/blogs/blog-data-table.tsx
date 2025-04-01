"use client";

import { Blog } from "./types";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import {
  createSortableColumn,
  createColumn,
  createActionsColumn,
} from "@/components/ui/data-table/columns";

interface BlogDataTableProps {
  blogs: Blog[];
  onEditBlog: (blog: Blog) => void;
  onDeleteBlog: (blog: Blog) => void;
}

export function BlogDataTable({
  blogs,
  onEditBlog,
  onDeleteBlog,
}: BlogDataTableProps) {
  const columns = [
    createSortableColumn<Blog, string>(
      "title",
      "Blog Title",
      ({ getValue }) => (
        <div className="font-medium max-w-[200px] truncate">{getValue()}</div>
      )
    ),

    createColumn<Blog, string>("category", "Category", ({ getValue }) => (
      <div className="capitalize">{getValue()}</div>
    )),

    createSortableColumn<Blog, string>(
      "createdAt",
      "Created",
      ({ getValue }) => {
        const date = getValue();
        return <div>{format(new Date(date), "MMM d, yyyy")}</div>;
      }
    ),

    createSortableColumn<Blog, string>(
      "updatedAt",
      "Updated",
      ({ getValue }) => {
        const date = getValue();
        return <div>{format(new Date(date), "MMM d, yyyy")}</div>;
      }
    ),

    createActionsColumn<Blog>((row) => (
      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEditBlog(row)}
          className="flex items-center gap-1"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDeleteBlog(row)}
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
      data={blogs}
      searchColumn="title"
      searchPlaceholder="Search blogs..."
    />
  );
}
