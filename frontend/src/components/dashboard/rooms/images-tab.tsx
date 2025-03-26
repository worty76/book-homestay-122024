import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ImagesTab({
  formData,
  setFormData,
  setNewImages,
}: any) {
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-4">
        {formData?.image?.slice(0, 6).map((img: string, index: number) => (
          <div key={index} className="relative">
            <img
              src={img}
              alt={`Room ${index + 1}`}
              className="h-24 w-24 object-cover rounded-md"
              loading="lazy"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
              onClick={() => {
                const newImages = formData.image.filter(
                  (_: any, i: number) => i !== index
                );
                setFormData({ ...formData, image: newImages });
              }}
            >
              ×
            </Button>
          </div>
        ))}
      </div>
      <div className="grid gap-2">
        <Label>Add Images</Label>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              setNewImages(files);
              const previewUrls = Array.from(files).map((file) =>
                URL.createObjectURL(file)
              );
              setFormData({
                ...formData,
                image: [...(formData.image || []), ...previewUrls],
              });
            }
          }}
        />
        <p className="text-sm text-muted-foreground">
          Upload multiple images. Supported formats: JPG, PNG, WebP
        </p>
      </div>
    </div>
  );
}
