interface RoomHeaderProps {
  name: string;
  bedsDescription: {
    type: string;
    count: number;
    _id: string;
  }[];
  category: string;
}

export default function RoomHeader({
  name,
  bedsDescription,
  category,
}: RoomHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2 text-[#0a3b33]">{name}</h1>
      <p className="text-[#5a8d69]">
        {bedsDescription.map((bed, index) => (
          <span key={bed._id}>
            {index > 0 && ", "}
            {bed.count} {bed.type} bed{bed.count > 1 ? "s" : ""}
          </span>
        ))}
        {" · "}
        {category === "room" ? "Standard" : category} Room
      </p>
    </div>
  );
}
