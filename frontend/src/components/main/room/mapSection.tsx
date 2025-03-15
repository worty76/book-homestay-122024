import { Map, Bus, MapPin, Car } from "lucide-react"

const locationFeatures = [
  {
    icon: MapPin,
    title: "Alamat",
    description: "Jakarta Pusat, no.201",
  },
  {
    icon: Bus,
    title: "Publik Transit",
    description: "Area strategis dekat dengan transportasi masyarakat",
  },
  {
    icon: Map,
    title: "Peta",
    description: "Memudahkan anda mencari alamat lewat G-Maps",
  },
  {
    icon: Car,
    title: "Tempat parkir",
    description: "Tersedia area parkir yang luas",
  },
]

export default function MapSection() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-[#0a3b33] mb-6">Peta map</h2>

      {/* Map Container */}
      <div className="w-full h-[400px] rounded-lg overflow-hidden mb-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7985117576625!2d107.60870071477246!3d-6.914423695003685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e64c5e8866e5%3A0x37be7ac9d575f7ed!2sHotel%20Indonesia%20Bandung!5e0!3m2!1sen!2sid!4v1647827738325!5m2!1sen!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Hotel Information */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-[#0a3b33] mb-2">Hotel Indonesia</h3>
          <p className="text-gray-700">
            Selamat datang di "Hotel Indonesia" Hotel mewah di tengah jantung kota yang menawarkan pengalaman tinggal
            yang serba modern dan penuh kenyamanan.
          </p>
        </div>

        {/* Location Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locationFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg border border-[#0a3b33]/20 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-[#0a3b33]" />
              </div>
              <div>
                <h4 className="font-medium text-[#0a3b33] mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

