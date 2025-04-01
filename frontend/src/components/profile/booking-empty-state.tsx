interface BookingEmptyStateProps {
  message: string;
}

export function BookingEmptyState({ message }: BookingEmptyStateProps) {
  return (
    <div className="flex items-center justify-center p-8 border rounded-lg">
      <div className="text-center text-muted-foreground">{message}</div>
    </div>
  );
}
