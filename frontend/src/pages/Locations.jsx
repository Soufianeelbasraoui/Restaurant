import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Navigation, Star } from "lucide-react";

const Locations = () => {
  const outlets = [
    {
      name: "Dar Essalam Marrakech",
      district: "Guéliz, Marrakech",
      address: "Avenue Mohammed V, Marrakech 40000",
      hours: "11:00 - 23:00",
      phone: "+212 524-123456",
      type: "Restaurant Signature",
      image:
        "https://images.unsplash.com/photo-1541167760496-d6230f3c83ad?w=1200",
    },
    {
      name: "Dar Essalam Casablanca",
      district: "Anfa, Casablanca",
      address: "Boulevard d'Anfa, Casablanca 20000",
      hours: "11:00 - 22:00",
      phone: "+212 522-654321",
      type: "Studio Urbain",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
    },
    {
      name: "Dar Essalam Rabat",
      district: "L'Oudaya, Rabat",
      address: "Kasbah des Oudayas, Rabat 10000",
      hours: "10:00 - 00:00",
      phone: "+212 537-987654",
      type: "Héritage Historique",
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200",
    },
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-32 px-6">
      {/* Header */}
      <div className="text-center mb-20">
        <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold">
          Où nous trouver
        </span>
        <h1 className="text-5xl md:text-6xl font-serif font-bold mt-4">
          Nos <span className="text-primary italic">Adresses</span>
        </h1>
      </div>

      {/* Cards */}
      <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {outlets.map((loc, index) => (
          <motion.div
            key={loc.name}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative group rounded-3xl overflow-hidden shadow-lg"
          >
            {/* Image */}
            <img
              src={loc.image}
              alt={loc.name}
              className="w-full h-[420px] object-cover group-hover:scale-110 transition duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 p-8 text-white space-y-4 w-full">
              <div className="flex items-center gap-2 text-primary">
                <Star size={16} className="fill-primary" />
                <span className="uppercase text-xs tracking-widest font-bold">
                  {loc.type}
                </span>
              </div>

              <h3 className="text-2xl font-bold">{loc.name}</h3>
              <p className="text-gray-200 text-sm">{loc.district}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {loc.address}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  {loc.hours}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-primary hover:bg-primary/90 py-3 rounded-xl flex items-center justify-center gap-2 transition">
                  <Navigation size={16} />
                  Directions
                </button>

                <button className="flex-1 border border-white/40 hover:bg-white/20 py-3 rounded-xl flex items-center justify-center gap-2 transition">
                  <Phone size={16} />
                  Call
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Locations;