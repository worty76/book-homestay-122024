import { AddHomestayForm } from "@/components/dashboard/add-homestay-form";

export const metadata = {
  title: "Add New Homestay",
  description: "Create a new homestay listing",
};

export default function AddHomestayPage() {
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Add New Homestay</h1>
      <AddHomestayForm />
    </div>
  );
}
