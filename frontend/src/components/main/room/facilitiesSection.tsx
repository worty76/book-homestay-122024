import Image from "next/image";
import {
  KeyRound,
  Wifi,
  Sparkles,
  ClipboardCheck,
  MessageCircle,
  Coffee,
  Bed,
  Droplet,
  Wind,
  Baby,
  CableCarIcon as Elevator,
  Bell,
  Package,
  Thermometer,
} from "lucide-react";

const services = [
  { icon: KeyRound, label: "Chek-in Password" },
  { icon: Wifi, label: "WIFI Cepat" },
  { icon: Sparkles, label: "Kebersihan Profesional" },
  { icon: ClipboardCheck, label: "Lengkap" },
  { icon: MessageCircle, label: "Konsultasi" },
  { icon: Coffee, label: "Coffee hangat" },
  { icon: Bed, label: "Tempat tidur Nyaman" },
  { icon: Droplet, label: "Tersedia air hangat" },
];

const buildingFacilities = [
  { icon: Wind, label: "Ruangan Ber AC" },
  { icon: Baby, label: "Penitipan Anak" },
  { icon: Elevator, label: "Elevator" },
  { icon: Bell, label: "Tersedia Layanan" },
  { icon: Package, label: "Penitipan Barang" },
  { icon: Thermometer, label: "Pemanas ruangan dan ruang kerja" },
];

export default function FacilitiesSection() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-[#0a3b33] mb-8">
        Fasilitas pada Hotel Indonesia
      </h1>

      {/* Services Banner */}
      <div className="bg-[#5a8d69] text-white rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-medium text-center mb-2">
          Layanan kami mulai
        </h2>
        <p className="text-center mb-12 max-w-3xl mx-auto">
          Bekerja, bersantai, dan hidup. Tempat kami memiliki semua perlengkapan
          penting yang Anda perlukan untuk masa menginap Anda.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                <service.icon className="w-6 h-6" />
              </div>
              <span className="text-sm">{service.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Building Images */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="rounded-xl overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Building exterior view"
            width={600}
            height={400}
            className="w-full h-[300px] object-cover"
          />
        </div>
        <div className="rounded-xl overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Building with palm trees"
            width={600}
            height={400}
            className="w-full h-[300px] object-cover"
          />
        </div>
      </div>

      {/* Building Facilities */}
      <div>
        <h3 className="text-xl font-medium text-[#0a3b33] mb-6">
          Fasilitas Pada Area Bangunan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buildingFacilities.map((facility, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg border border-[#0a3b33]/20 flex items-center justify-center">
                <facility.icon className="w-5 h-5 text-[#0a3b33]" />
              </div>
              <span className="text-gray-700">{facility.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
