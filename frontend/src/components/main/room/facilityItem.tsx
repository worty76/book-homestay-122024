import { Wifi, Lock, Thermometer, Wind, CableCarIcon as Elevator, Clock, Sparkles, Package } from "lucide-react"

interface FacilityItemProps {
  icon: "wifi" | "password" | "heater" | "ac" | "elevator" | "service" | "cleaning" | "amenities"
  text: string
}

export default function FacilityItem({ icon, text }: FacilityItemProps) {
  const getIcon = () => {
    switch (icon) {
      case "wifi":
        return <Wifi className="w-5 h-5 text-[#0a3b33]" />
      case "password":
        return <Lock className="w-5 h-5 text-[#0a3b33]" />
      case "heater":
        return <Thermometer className="w-5 h-5 text-[#0a3b33]" />
      case "ac":
        return <Wind className="w-5 h-5 text-[#0a3b33]" />
      case "elevator":
        return <Elevator className="w-5 h-5 text-[#0a3b33]" />
      case "service":
        return <Clock className="w-5 h-5 text-[#0a3b33]" />
      case "cleaning":
        return <Sparkles className="w-5 h-5 text-[#0a3b33]" />
      case "amenities":
        return <Package className="w-5 h-5 text-[#0a3b33]" />
    }
  }

  return (
    <div className="flex items-center gap-3 group">
      <div className="w-10 h-10 border border-[#0a3b33]/20 rounded-md flex items-center justify-center transition-colors group-hover:bg-[#0a3b33]/5">
        {getIcon()}
      </div>
      <span className="text-gray-700">{text}</span>
    </div>
  )
}

