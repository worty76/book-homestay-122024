import { Button } from "@/components/ui/button";
import { format } from "date-fns"; // Import format from date-fns instead
import { Blog } from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

interface BlogListProps {
  blogs: Blog[];
  isLoading: boolean;
  error: string | null;
  onEditBlog: (blog: Blog) => void;
  onDeleteBlog: (blog: Blog) => void;
}

export function BlogList({
  blogs,
  isLoading,
  error,
  onEditBlog,
  onDeleteBlog,
}: BlogListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 border rounded-lg">
        <div className="text-center text-muted-foreground">
          No blogs found. Create your first blog post!
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Blog Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog._id} className="hover:bg-muted/50">
                <TableCell className="max-w-[200px] truncate font-medium">
                  {blog.title}
                </TableCell>
                <TableCell className="capitalize">{blog.category}</TableCell>
                <TableCell>
                  {format(new Date(blog.createdAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  {format(new Date(blog.updatedAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditBlog(blog)}
                      className="flex items-center gap-1"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteBlog(blog)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
