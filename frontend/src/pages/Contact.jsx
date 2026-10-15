import React, { useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { 
    Mail, 
    Phone, 
    MapPin, 
    Send, 
    Clock, 
    Calendar,
    Users,
    CheckCircle2,
    Sparkles,
    UtensilsCrossed
} from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'Table Reservation',
        message: ''
    });
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus(null);
        try {
            await api.post('/reservations', formData);
            setStatus({ 
                type: 'success', 
                message: 'Choukran ! Votre demande a été transmise avec succès. Notre équipe vous confirmera votre table sous peu.' 
            });
            setFormData({ name: '', email: '', phone: '', subject: 'Table Reservation', message: '' });
        } catch (error) {
            setStatus({ 
                type: 'error', 
                message: 'Une erreur est survenue lors de l\'envoi. Veuillez nous contacter directement par téléphone.' 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#faf7f2] min-h-screen text-neutral-dark pt-32 pb-24 px-6">
            <div className="container mx-auto max-w-6xl">
                {/* Header Section */}
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-[5px]">
                        <Sparkles size={13} className="text-primary" />
                        <span className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">Hospitalité & Réservations</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-dark leading-tight">
                        Nous Joindre à la <span className="text-primary italic font-normal">Maison Beldi</span>
                    </h1>
                    <p className="text-neutral-dark/70 font-normal text-sm leading-relaxed">
                        Pour réserver une table, célébrer une fête de famille ou simplement échanger, nous vous recevons avec la générosité et l'art de vivre marocain.
                    </p>
                </div>

                {/* Main 2-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left Column: Contact Details & Info (5 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        {/* Direct Coordinates Card */}
                        <div className="bg-white p-7 rounded-[5px] border border-[#ece4d5] shadow-sm space-y-6">
                            <h2 className="text-xl font-serif font-bold text-neutral-dark flex items-center gap-2.5 border-b border-[#ece4d5] pb-4">
                                <UtensilsCrossed size={18} className="text-primary" />
                                <span>Coordonnées & Accueil</span>
                            </h2>

                            <div className="space-y-5">
                                <div className="flex items-start space-x-3.5">
                                    <div className="w-10 h-10 rounded-[5px] bg-[#faf7f2] border border-[#ece4d5] flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-neutral-dark/50 uppercase tracking-widest mb-0.5">Adresse</p>
                                        <p className="text-sm font-semibold text-neutral-dark">12 Boulevard Mohammed V</p>
                                        <p className="text-xs text-neutral-dark/65">Casablanca 20250, Maroc</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3.5">
                                    <div className="w-10 h-10 rounded-[5px] bg-[#faf7f2] border border-[#ece4d5] flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-neutral-dark/50 uppercase tracking-widest mb-0.5">Téléphone direct</p>
                                        <p className="text-sm font-semibold text-neutral-dark">+212 (0) 522 34 56 78</p>
                                        <p className="text-xs text-neutral-dark/65">WhatsApp : +212 (0) 661 12 34 56</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3.5">
                                    <div className="w-10 h-10 rounded-[5px] bg-[#faf7f2] border border-[#ece4d5] flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-neutral-dark/50 uppercase tracking-widest mb-0.5">Courriel</p>
                                        <p className="text-sm font-semibold text-neutral-dark">contact@maisonbeldi.ma</p>
                                        <p className="text-xs text-neutral-dark/65">reservation@maisonbeldi.ma</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Opening Hours & Atmosphere */}
                        <div className="bg-white p-7 rounded-[5px] border border-[#ece4d5] shadow-sm space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-9 h-9 rounded-[5px] bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                                    <Clock size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-neutral-dark uppercase tracking-wider">Horaires de Service</p>
                                    <p className="text-xs text-neutral-dark/60">Cuisine ouverte midi & soir</p>
                                </div>
                            </div>

                            <div className="border-t border-[#ece4d5] pt-3 space-y-2 text-xs">
                                <div className="flex justify-between py-1 border-b border-[#ece4d5]/40">
                                    <span className="font-medium text-neutral-dark/70">Lundi — Jeudi</span>
                                    <span className="font-semibold text-neutral-dark">11h30 — 23h30</span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-[#ece4d5]/40">
                                    <span className="font-medium text-neutral-dark/70">Vendredi (Couscous du Vendredi)</span>
                                    <span className="font-semibold text-neutral-dark">12h00 — 00h00</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="font-medium text-neutral-dark/70">Samedi & Dimanche</span>
                                    <span className="font-semibold text-neutral-dark">11h30 — 00h30</span>
                                </div>
                            </div>

                            <div className="bg-[#faf7f2] p-3 rounded-[5px] border border-[#ece4d5] flex items-center space-x-2 text-xs text-neutral-dark/75">
                                <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
                                <span>Thé à la menthe offert dès votre installation.</span>
                            </div>
                        </div>

                        {/* Ambient photo banner */}
                        <div className="rounded-[5px] overflow-hidden border border-[#ece4d5] shadow-sm h-40 relative group">
                            <img 
                                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80" 
                                alt="Ambiance Maison Beldi"
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-3 left-4 text-white">
                                <p className="text-xs font-serif italic text-white/95">« Chez nous, chaque invité est un membre de la famille. »</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Contact & Reservation Form (7 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-7 bg-white rounded-[5px] p-8 md:p-10 border border-[#ece4d5] shadow-sm space-y-6"
                    >
                        <div className="space-y-1.5 border-b border-[#ece4d5] pb-5">
                            <span className="text-primary font-semibold tracking-[0.15em] uppercase text-xs">Formulaire Direct</span>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-dark">Envoyer un Message ou Réserver</h2>
                            <p className="text-neutral-dark/65 text-xs leading-relaxed">
                                Remplissez ce formulaire et notre maître d'hôtel vous contactera par téléphone ou courriel sous 30 minutes.
                            </p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {status && (
                                <div className={`p-4 rounded-[5px] text-xs font-semibold flex items-center space-x-2 ${
                                    status.type === 'success' 
                                        ? 'bg-green-50 text-green-800 border border-green-200' 
                                        : 'bg-red-50 text-red-800 border border-red-200'
                                }`}>
                                    <CheckCircle2 size={16} />
                                    <span>{status.message}</span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-dark/80 tracking-wide">
                                        Nom & Prénom <span className="text-primary">*</span>
                                    </label>
                                    <input 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Ex: Yassine Alami" 
                                        className="w-full bg-[#faf7f2] border border-[#ece4d5] rounded-[5px] px-3.5 py-2.5 text-xs text-neutral-dark placeholder:text-neutral-dark/40 outline-none focus:border-primary focus:bg-white transition-all" 
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-dark/80 tracking-wide">
                                        Adresse Email <span className="text-primary">*</span>
                                    </label>
                                    <input 
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Ex: yassine@domaine.ma" 
                                        className="w-full bg-[#faf7f2] border border-[#ece4d5] rounded-[5px] px-3.5 py-2.5 text-xs text-neutral-dark placeholder:text-neutral-dark/40 outline-none focus:border-primary focus:bg-white transition-all" 
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-dark/80 tracking-wide">
                                        Numéro de téléphone <span className="text-neutral-dark/40 text-[10px] font-normal">(Recommandé)</span>
                                    </label>
                                    <input 
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Ex: +212 612 34 56 78" 
                                        className="w-full bg-[#faf7f2] border border-[#ece4d5] rounded-[5px] px-3.5 py-2.5 text-xs text-neutral-dark placeholder:text-neutral-dark/40 outline-none focus:border-primary focus:bg-white transition-all" 
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-dark/80 tracking-wide">
                                        Objet de la demande <span className="text-primary">*</span>
                                    </label>
                                    <select 
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-[#faf7f2] border border-[#ece4d5] rounded-[5px] px-3.5 py-2.5 text-xs text-neutral-dark outline-none focus:border-primary focus:bg-white transition-all cursor-pointer"
                                    >
                                        <option value="Table Reservation">🍽️ Réservation d'une Table</option>
                                        <option value="Family Event">🎉 Événement Familial / Fête</option>
                                        <option value="Beldi Catering">🥘 Service Traiteur Beldi</option>
                                        <option value="General Inquiry">💬 Question & Information</option>
                                        <option value="Feedback">⭐ Témoignage & Avis</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-neutral-dark/80 tracking-wide">
                                    Votre Message ou précisions <span className="text-primary">*</span>
                                </label>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5" 
                                    placeholder="Indiquez le nombre de personnes, la date et l'heure souhaitées, ou votre question..." 
                                    className="w-full resize-none bg-[#faf7f2] border border-[#ece4d5] rounded-[5px] px-3.5 py-2.5 text-xs text-neutral-dark placeholder:text-neutral-dark/40 outline-none focus:border-primary focus:bg-white transition-all leading-relaxed" 
                                    required
                                />
                            </div>

                            <div className="pt-2">
                                <button 
                                    disabled={isLoading}
                                    className={`w-full py-3.5 bg-primary hover:bg-primary-dark text-white rounded-[5px] font-medium text-xs tracking-wider uppercase transition-colors shadow-sm flex items-center justify-center space-x-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    <Send size={15} />
                                    <span>{isLoading ? 'Envoi en cours...' : 'Envoyer la demande'}</span>
                                </button>
                            </div>

                            <p className="text-[11px] text-neutral-dark/50 text-center">
                                Vos données restent confidentielles et ne sont utilisées que pour le traitement de votre réservation.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
