import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, Utensils, ChevronRight } from 'lucide-react';
import { getDishImage } from '../utils/dishImages';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        api.get('/products?is_featured=1').then(res => {
            setFeaturedProducts(res.data.data.slice(0, 3));
        });
    }, []);

    return (
        <div className="bg-[#fffbf2] min-h-screen text-neutral-dark overflow-hidden m-auto">
            {/* Simple Human Moroccan Hero */}
            <section className="relative min-h-[85vh] flex items-center pt-24 pb-16 px-6">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 border border-primary/20 rounded-[5px]">
                            <span className="w-1.5 h-1.5 rounded-[1px] bg-primary"></span>
                            <span className="text-primary font-semibold text-xs tracking-wider uppercase">Maison Beldi — Table & Terroir</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-neutral-dark leading-[1.1]">
                            L'authenticité <br />
                            <span className="text-primary italic font-normal">du goût marocain</span>
                        </h1>
                        <p className="text-lg text-neutral-dark/75 max-w-lg font-normal leading-relaxed">
                            Une cuisine mijotée avec patience et passion. Des tajines généreux, couscous de fête et pâtisseries fines préparés selon les recettes séculaires de nos familles.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                            <Link to="/menu" className="w-full sm:w-auto bg-primary text-white px-8 py-3.5 rounded-[5px] font-medium text-sm shadow-sm hover:bg-primary-dark transition-all flex items-center justify-center space-x-2">
                                <span>Découvrir la Carte</span>
                                <ArrowRight size={18} />
                            </Link>
                            <Link to="/contact" className="w-full sm:w-auto px-8 py-3.5 rounded-[5px] border border-[#d6cbba] text-neutral-dark font-medium text-sm hover:bg-neutral-light transition-colors text-center">
                                Réserver une Table
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4 pt-2 text-xs font-medium text-neutral-dark/70">
                            <Clock size={15} className="text-primary" />
                            <span>Ouvert tous les jours : 11h30 — 23h30</span>
                        </div>
                    </motion.div>

                    {/* Right: Plate Image with artisanal styling */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative hidden lg:flex justify-center items-center"
                    >
                        {/* Subtle decorative artisanal backdrop frame */}
                        <div className="absolute w-[470px] h-[470px] border border-primary/25 rounded-[5px] translate-x-3 translate-y-3 pointer-events-none"></div>

                        {/* Main Image Container */}
                        <div className="relative z-10 w-[470px] h-[470px] rounded-[5px] overflow-hidden border border-[#ece4d5] shadow-lg bg-white group">
                            <img 
                                src="/hero_tagine.jpg" 
                                alt="Tagine Authentique d'Agneau aux Pruneaux - Maison Beldi" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Top Badge: Signature */}
                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 border border-[#ece4d5] rounded-[5px] shadow-sm flex items-center space-x-1.5">
                                <Star size={13} className="text-amber-500 fill-amber-500" />
                                <span className="text-xs font-bold text-neutral-dark">Plat Signature Beldi</span>
                            </div>

                            {/* Bottom Card: Description */}
                            <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 border border-[#ece4d5] rounded-[5px] shadow-md flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <p className="text-xs font-serif font-bold text-neutral-dark">Tagine d'Agneau aux Pruneaux & Amandes</p>
                                    <p className="text-[11px] text-neutral-dark/65">Cuit lentement au feu doux dans un plat en terre cuite</p>
                                </div>
                                <div className="text-right pl-3 border-l border-[#ece4d5]">
                                    <span className="text-primary font-bold text-sm block leading-none">24.50 MAD</span>
                                    <span className="text-[9px] text-neutral-dark/50 uppercase tracking-wider">Fait Maison</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-20 bg-white relative border-y border-[#ece4d5]">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-4">
                        <div className="space-y-2">
                            <span className="text-primary font-bold tracking-[0.25em] uppercase text-[11px]">Sélection du Chef</span>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-dark">Nos Incontournables</h2>
                            <p className="text-sm text-neutral-dark/60 font-normal">Préparés chaque matin avec les meilleurs produits du marché.</p>
                        </div>
                        <Link to="/menu" className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline">
                            <span>Voir toute la carte</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredProducts.length > 0 ? featuredProducts.map((product, index) => (
                            <motion.div 
                                key={product.id}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                                viewport={{ once: true }}
                                className="bg-[#faf7f2] rounded-[5px] p-4 border border-[#ece4d5] hover:border-primary/40 transition-all hover:shadow-md group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="h-56 rounded-[5px] overflow-hidden relative mb-4 border border-[#ece4d5]">
                                        <img 
                                            src={getDishImage(product)} 
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&auto=format&fit=crop&q=80';
                                            }}
                                        />
                                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-[5px] border border-[#ece4d5] shadow-sm">
                                            <span className="text-primary font-bold text-sm">{product.price} MAD</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className="text-lg font-serif font-bold text-neutral-dark leading-snug group-hover:text-primary transition-colors">{product.name}</h3>
                                            <div className="flex text-amber-500 items-center gap-1 text-xs font-bold shrink-0">
                                                <Star size={14} fill="currentColor" />
                                                <span>4.9</span>
                                            </div>
                                        </div>
                                        <p className="text-neutral-dark/65 text-xs font-normal line-clamp-2 leading-relaxed">{product.description}</p>
                                    </div>
                                </div>

                                <div className="pt-4 mt-4 border-t border-[#ece4d5]/60 flex items-center justify-between gap-3">
                                    <Link to={`/product/${product.id}`} className="text-xs text-neutral-dark/70 hover:text-primary font-medium">
                                        Détails
                                    </Link>
                                    <button 
                                        onClick={() => addToCart(product)}
                                        className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-medium rounded-[5px] transition-colors shadow-sm"
                                    >
                                        Ajouter au Panier
                                    </button>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="col-span-3 text-center py-16 text-gray-400 font-medium italic">
                                Chargement des spécialités...
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Beldi Features */}
            <section className="py-20 bg-[#faf7f2] relative overflow-hidden">
                <div className="container mx-auto px-6 relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-[5px] border border-[#ece4d5] shadow-sm text-center">
                            <div className="w-14 h-14 bg-primary/10 text-primary rounded-[5px] flex items-center justify-center mx-auto mb-5">
                                <Utensils size={26} />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-neutral-dark mb-2">Ingrédients du Terroir</h3>
                            <p className="text-neutral-dark/70 text-xs leading-relaxed">Huile d'olive pure, safran de Taliouine, épices moulues à la commande.</p>
                        </div>
                        <div className="bg-white p-8 rounded-[5px] border border-[#ece4d5] shadow-sm text-center">
                            <div className="w-14 h-14 bg-amber-500/10 text-amber-600 rounded-[5px] flex items-center justify-center mx-auto mb-5">
                                <Star size={26} />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-neutral-dark mb-2">Savoir-Faire Beldi</h3>
                            <p className="text-neutral-dark/70 text-xs leading-relaxed">Cuisson lente au kanoun et au tajine de terre cuite pour révéler chaque arôme.</p>
                        </div>
                        <div className="bg-white p-8 rounded-[5px] border border-[#ece4d5] shadow-sm text-center">
                            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 rounded-[5px] flex items-center justify-center mx-auto mb-5">
                                <Clock size={26} />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-neutral-dark mb-2">Hospitalité Chaleureuse</h3>
                            <p className="text-neutral-dark/70 text-xs leading-relaxed">Un accueil attentif comme à la maison, dans une ambiance sereine et apaisante.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Beldi CTA */}
            <section className="py-16 px-6">
                <div className="container mx-auto bg-neutral-dark rounded-[5px] p-10 md:p-16 text-center text-white relative overflow-hidden border border-[#ece4d5]">
                    <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                        <span className="text-accent uppercase tracking-[0.25em] text-xs font-semibold">Réservation & Commande</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">Venez partager un moment chez Maison Beldi</h2>
                        <p className="text-sm opacity-80 font-normal leading-relaxed">Que ce soit pour un déjeuner en famille, un dîner intime ou une commande à emporter, nous vous préparons une table d'exception.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link to="/contact" className="w-full sm:w-auto bg-primary text-white px-8 py-3.5 rounded-[5px] font-medium text-sm hover:bg-primary-dark transition-colors">
                                Réserver une Table
                            </Link>
                            <Link to="/menu" className="w-full sm:w-auto px-8 py-3.5 rounded-[5px] border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors">
                                Consulter le Menu
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default Home;
