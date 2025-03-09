import Image from "next/image"
import { Bed, User, Bath, Square, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RoomSpec {
  icon: "bed" | "user" | "bath" | "size"
  text: string
}

interface RoomCardProps {
  title: string
  image: string
  price: string
  specs: RoomSpec[]
  facilities: string[]
}

export default function RoomCard({ title, image, price, specs, facilities }: RoomCardProps) {
  const renderIcon = (icon: string) => {
    switch (icon) {
      case "bed":
        return <Bed className="w-4 h-4 text-[#0a3b33]" />
      case "user":
        return <User className="w-4 h-4 text-[#0a3b33]" />
      case "bath":
        return <Bath className="w-4 h-4 text-[#0a3b33]" />
      case "size":
        return <Square className="w-4 h-4 text-[#0a3b33]" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 border-b pb-8">
      <div className="md:w-1/3 rounded-lg overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={500}
          height={300}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="md:w-2/3 flex flex-col md:flex-row justify-between">
        <div>
          <h3 className="text-xl font-medium text-[#0a3b33] mb-4">{title}</h3>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
            {specs.map((spec, index) => (
              <div key={index} className="flex items-center gap-2">
                {renderIcon(spec.icon)}
                <span className="text-sm">{spec.text}</span>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Tersedia Fasilitas :</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
              {facilities.map((facility, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-[#0a3b33]" />
                  <span className="text-sm">{facility}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
          <div className="text-right">
            <p className="text-xl font-medium text-[#0a3b33]">{price}</p>
            <p className="text-xs text-gray-500">Harga malam</p>
          </div>

          <Button variant="outline" className="rounded-full px-6 mt-4">
            Tentukan tanggal
          </Button>
        </div>
      </div>
    </div>
  )
}

