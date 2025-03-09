import { useMutation, useQueryClient } from "@tanstack/react-query";
import { homestayApi, type HomestayData } from "@/api/homestay-api";
import { toast } from "sonner";

export function useHomestay() {
  const queryClient = useQueryClient();

  const createHomestayMutation = useMutation({
    mutationFn: (data: HomestayData) => homestayApi.createHomestay(data),
    onSuccess: () => {
      toast.success("Homestay created successfully");
      queryClient.invalidateQueries({ queryKey: ["homestays"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create homestay");
    },
  });

  return {
    createHomestay: createHomestayMutation.mutate,
    isCreating: createHomestayMutation.isPending,
  };
}
