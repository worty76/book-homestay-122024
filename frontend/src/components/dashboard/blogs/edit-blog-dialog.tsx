import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Blog } from "./types";

interface EditBlogDialogProps {
  blog: Blog | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (blog: Blog, files?: FileList) => Promise<void>;
}

export function EditBlogDialog({
  blog,
  open,
  onOpenChange,
  onSave,
}: EditBlogDialogProps) {
  const [editedBlog, setEditedBlog] = useState<Blog | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (blog) {
      setEditedBlog(blog);
      setPreview(blog.image || null);
    }
  }, [blog]);

  if (!editedBlog) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedBlog((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageFiles(files);
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async () => {
    if (!editedBlog) return;

    try {
      setIsSubmitting(true);
      await onSave(editedBlog, imageFiles || undefined);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Blog Post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              name="title"
              value={editedBlog.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-summary">Summary</Label>
            <Textarea
              id="edit-summary"
              name="summary"
              value={editedBlog.summary}
              onChange={handleInputChange}
              rows={2}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-content">Content</Label>
            <Textarea
              id="edit-content"
              name="content"
              value={editedBlog.content}
              onChange={handleInputChange}
              rows={10}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-category">Category</Label>
            <Input
              id="edit-category"
              name="category"
              value={editedBlog.category}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-tags">Tags</Label>
            <Input
              id="edit-tags"
              name="tags"
              value={editedBlog.tags}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-image">Cover Image</Label>
            <Input
              id="edit-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview && (
              <div className="mt-2">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-40 rounded-md object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
