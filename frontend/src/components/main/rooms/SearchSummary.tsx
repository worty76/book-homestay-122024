import { SearchParams } from "@/types/room";
import { useTranslation } from "@/hooks/useTranslation";

interface SearchSummaryProps {
  searchParams: SearchParams;
}

export default function SearchSummary({ searchParams }: SearchSummaryProps) {
  const { t } = useTranslation();

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
      ? `${searchParams.adults} ${t("common.guests.adults")}${
          searchParams.children > 0
            ? `, ${searchParams.children} ${t("common.guests.children")}`
            : ""
        }`
      : `${totalGuests} ${t("common.guests.guests")}`;

  return (
    <div className="bg-[#f8f3e9] p-3 rounded-md mb-4 text-sm">
      <p className="font-medium">Your search:</p>
      <div className="flex flex-wrap gap-2 mt-1">
        <span className="bg-white px-2 py-1 rounded-md">
          {t("common.dates.checkIn")}:{" "}
          {searchParams.checkIn?.toLocaleDateString("en-US")}
        </span>
        <span className="bg-white px-2 py-1 rounded-md">
          {t("common.dates.checkOut")}:{" "}
          {searchParams.checkOut?.toLocaleDateString("en-US")}
        </span>
        <span className="bg-white px-2 py-1 rounded-md">{guestsDisplay}</span>
      </div>
    </div>
  );
}
