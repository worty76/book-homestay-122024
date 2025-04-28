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
  onSave: (updatedBlog: Blog, file?: File) => Promise<void>;
}

export function EditBlogDialog({
  blog,
  open,
  onOpenChange,
  onSave,
}: EditBlogDialogProps) {
  const [formData, setFormData] = useState<Blog | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (blog) {
      setFormData({ ...blog });
      setPreviewUrl(blog.image || null);
      setSelectedFile(null);
    }
  }, [blog]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create a preview URL for the selected image
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Clean up the URL object when component unmounts or file changes
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  };

  const handleSubmit = async () => {
    if (!formData) return;

    setIsSubmitting(true);
    try {
      await onSave(formData, selectedFile || undefined);
    } catch (error) {
      console.error("Error saving blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              rows={6}
              value={formData.content}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              name="tags"
              value={formData.tags || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Featured Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {previewUrl && (
              <div className="mt-2">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-[200px] rounded object-cover"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3">
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
      </DialogContent>
    </Dialog>
  );
}
