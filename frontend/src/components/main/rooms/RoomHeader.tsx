interface RoomHeaderProps {
  name: string;
  bedsDescription?: {
    type: string;
    count: number;
    _id: string;
  }[];
  category: string;
}

export default function RoomHeader({
  name,
  bedsDescription = [],
  category,
}: RoomHeaderProps) {
  return (
    <div className="mb-10">
      <h1 className="text-4xl font-bold mb-3 text-[#0a3b33]">{name}</h1>
      <div className="flex items-center">
        <div className="h-0.5 w-14 bg-[#9C6B4A] mr-3"></div>
        <p className="text-[#5a8d69] font-medium">
          {bedsDescription.length > 0 ? (
            bedsDescription.map((bed, index) => (
              <span key={bed._id || `bed-${index}`}>
                {index > 0 && ", "}
                {bed.count || 1} {bed.type || "Standard"} bed{(bed.count || 1) > 1 ? "s" : ""}
              </span>
            ))
          ) : (
            <span>Standard bed</span>
          )}
          {" · "}
          {category === "room" ? "Standard" : category} Room
        </p>
      </div>
    </div>
  );
}
