"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export function createSortableColumn<TData, TValue>(
  accessorKey: string,
  header: string,
  cell?: (info: { getValue: () => TValue }) => React.ReactNode
): ColumnDef<TData, TValue> {
  return {
    accessorKey,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 font-medium"
        >
          {header}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: cell
      ? (info) => cell(info)
      : ({ row }) => <div>{String(row.getValue(accessorKey) || "")}</div>,
  };
}

export function createColumn<TData, TValue>(
  accessorKey: string,
  header: string,
  cell?: (info: { getValue: () => TValue }) => React.ReactNode
): ColumnDef<TData, TValue> {
  return {
    accessorKey,
    header: () => <div className="font-medium">{header}</div>,
    cell: cell
      ? (info) => cell(info)
      : ({ row }) => <div>{String(row.getValue(accessorKey) || "")}</div>,
  };
}

// Helper for creating action column
export function createActionsColumn<TData>(
  actions: (row: TData) => React.ReactNode
): ColumnDef<TData, string> {
  return {
    id: "actions",
    header: () => <div className="text-right font-medium">Actions</div>,
    cell: ({ row }) => (
      <div className="flex justify-end">{actions(row.original)}</div>
    ),
  };
}
