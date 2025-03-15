"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useHomestay } from "@/hooks/use-homestay";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X, Plus, Loader2 } from "lucide-react";

const homestaySchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  location: z
    .string()
    .min(5, { message: "Location must be at least 5 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  price_per_night: z.coerce
    .number()
    .positive({ message: "Price must be a positive number" }),
  available_rooms: z.coerce
    .number()
    .int()
    .positive({ message: "Available rooms must be a positive integer" }),
  images: z.array(z.string()).default([]),
});

type HomestayFormValues = z.infer<typeof homestaySchema> & { images: string[] };

export function AddHomestayForm() {
  const { createHomestay, isCreating } = useHomestay();
  const [images, setImages] = useState<string[]>([]);
  const [imageInput, setImageInput] = useState("");

  const form = useForm<HomestayFormValues>({
    resolver: zodResolver(homestaySchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      price_per_night: 0,
      available_rooms: 0,
      images: [],
    },
  });

  const addImage = () => {
    if (imageInput && !images.includes(imageInput)) {
      setImages([...images, imageInput]);
      setImageInput("");
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onSubmit = (data: HomestayFormValues) => {
    createHomestay({
      ...data,
      images,
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Homestay</CardTitle>
        <CardDescription>
          Fill in the details to create a new homestay listing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Sunset Villa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Beach Road, Malibu, CA"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A beautiful villa overlooking the beach."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price_per_night"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price per night</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="199.99"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="available_rooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available rooms</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormLabel>Images</FormLabel>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                />
                <Button type="button" size="icon" onClick={addImage}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {images.length > 0 && (
                <div className="mt-4 space-y-2">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-muted p-2 rounded-md"
                    >
                      <span className="text-sm truncate max-w-[80%]">
                        {image}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isCreating}>
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Homestay"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
