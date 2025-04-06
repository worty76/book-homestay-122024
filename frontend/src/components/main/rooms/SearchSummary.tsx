import { SearchParams } from "@/types/room";

interface SearchSummaryProps {
  searchParams: SearchParams;
}

export default function SearchSummary({ searchParams }: SearchSummaryProps) {
  const hasBasicParams =
    searchParams.checkIn &&
    searchParams.checkOut &&
    (searchParams.guests || searchParams.adults !== undefined);

  if (!hasBasicParams) {
    return null;
  }

  const totalGuests =
    searchParams.adults !== undefined && searchParams.children !== undefined
      ? searchParams.adults + searchParams.children
      : searchParams.guests || 0;

  const guestsDisplay =
    searchParams.adults !== undefined && searchParams.children !== undefined
      ? `${searchParams.adults} người lớn${
          searchParams.children > 0 ? `, ${searchParams.children} trẻ em` : ""
        }`
      : `${totalGuests} người`;

  return (
    <div className="bg-[#f8f3e9] p-3 rounded-md mb-4 text-sm">
      <p className="font-medium">Tìm kiếm của bạn:</p>
      <div className="flex flex-wrap gap-2 mt-1">
        <span className="bg-white px-2 py-1 rounded-md">
          Nhận phòng: {searchParams.checkIn?.toLocaleDateString("vi-VN")}
        </span>
        <span className="bg-white px-2 py-1 rounded-md">
          Trả phòng: {searchParams.checkOut?.toLocaleDateString("vi-VN")}
        </span>
        <span className="bg-white px-2 py-1 rounded-md">{guestsDisplay}</span>
      </div>
    </div>
  );
}
