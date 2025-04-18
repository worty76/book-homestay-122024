import { UsersRound } from "lucide-react";

interface BookingEmptyStateProps {
  message: string;
}

export function BookingEmptyState({ message }: BookingEmptyStateProps) {
  return (
    <div className="p-8 border rounded-lg flex flex-col items-center justify-center text-center text-muted-foreground">
      <UsersRound className="h-8 w-8 mb-3" />
      <p>{message}</p>
    </div>
  );
}
