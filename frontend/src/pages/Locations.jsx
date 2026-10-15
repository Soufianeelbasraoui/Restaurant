import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Navigation, Star } from "lucide-react";

const Locations = () => {
  const outlets = [
    {
      name: "Maison Beldi Marrakech",
      district: "Hivernage & Guéliz, Marrakech",
      address: "Avenue Mohammed V, Marrakech 40000",
      hours: "11:30 - 23:30",
      phone: "+212 524-123456",
      type: "Table d'Hôtes & Patio",
      image:
        "https://images.unsplash.com/photo-1541167760496-d6230f3c83ad?w=1200",
    },
    {
      name: "Maison Beldi Casablanca",
      district: "Gauthier & Anfa, Casablanca",
      address: "Boulevard d'Anfa, Casablanca 20000",
      hours: "11:30 - 23:00",
      phone: "+212 522-654321",
      type: "Bistro Urbain Beldi",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
    },
    {
      name: "Maison Beldi Rabat",
      district: "Les Oudayas & Agdal, Rabat",
      address: "Kasbah des Oudayas, Rabat 10000",
      hours: "11:00 - 23:30",
      phone: "+212 537-987654",
      type: "Demeure Historique",
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200",
    },
  ];

  return (
    <div className="bg-[#faf7f2] min-h-screen pt-32 pb-32 px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-primary uppercase tracking-[0.25em] text-xs font-bold">
          Nos Maisons
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold mt-3 text-neutral-dark">
          Nos <span className="text-primary italic font-normal">Adresses</span>
        </h1>
        <p className="text-sm text-neutral-dark/65 max-w-md mx-auto mt-2 font-normal">Trois lieux chaleureux célébrant la cuisine authentique et l'art de recevoir marocain.</p>
      </div>

      {/* Cards */}
      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {outlets.map((loc, index) => (
          <motion.div
            key={loc.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="relative group rounded-[5px] overflow-hidden shadow-sm border border-[#ece4d5]"
          >
            {/* Image */}
            <img
              src={loc.image}
              alt={loc.name}
              className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 p-6 text-white space-y-3 w-full">
              <div className="flex items-center gap-2 text-accent">
                <Star size={14} className="fill-accent" />
                <span className="uppercase text-[11px] tracking-wider font-semibold">
                  {loc.type}
                </span>
              </div>

              <h3 className="text-xl font-serif font-bold">{loc.name}</h3>
              <p className="text-gray-300 text-xs">{loc.district}</p>

              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-primary shrink-0" />
                  <span>{loc.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-primary shrink-0" />
                  <span>{loc.hours}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2.5 pt-2">
                <button className="flex-1 bg-primary hover:bg-primary-dark py-2.5 rounded-[5px] flex items-center justify-center gap-2 transition text-xs font-medium">
                  <Navigation size={14} />
                  Itinéraire
                </button>

                <a href={`tel:${loc.phone}`} className="flex-1 border border-white/40 hover:bg-white/20 py-2.5 rounded-[5px] flex items-center justify-center gap-2 transition text-xs font-medium text-center">
                  <Phone size={14} />
                  Appeler
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Locations;