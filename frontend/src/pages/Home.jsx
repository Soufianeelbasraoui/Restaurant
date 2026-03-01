import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, Utensils, ChevronRight } from 'lucide-react';

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
            {/* Simple Moroccan Hero */}
            <section className="relative min-h-[90vh] flex items-center pt-20 px-6">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-block px-4 py-2 bg-foodie-orange/10 rounded-full">
                            <span className="text-foodie-orange font-bold text-sm tracking-wide">Bienvenue chez Dar Essalam</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-serif font-black text-neutral-dark leading-[1.05]">
                            Savourez le <br />
                            <span className="text-foodie-orange">Vrai Maroc</span>
                        </h1>
                        <p className="text-xl text-neutral-dark/70 max-w-lg font-medium leading-relaxed">
                            Un voyage sensoriel à travers les paysages aromatiques du Maroc. 
                            Découvrez l'art intemporel de l'hospitalité traditionnelle.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                            <Link to="/menu" className="bg-foodie-orange text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-foodie-orange/30 hover:scale-105 transition-transform flex items-center space-x-3">
                                <span>Commander Maintenant</span>
                                <ArrowRight size={20} />
                            </Link>
                            <Link to="/about" className="px-10 py-4 rounded-full border-2 border-neutral-dark/10 font-bold hover:bg-neutral-dark/5 transition-colors">
                                Notre Histoire
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4 pt-4 text-sm font-bold text-neutral-dark/60">
                            <Clock size={16} className="text-foodie-orange" />
                            <span>Ouvert: 11h00 - 23h00</span>
                        </div>
                    </motion.div>

                    {/* Right: Plate Image */}
                    <div className="relative hidden lg:block">
                        <div className="relative z-10 w-[500px] h-[500px] rounded-full overflow-hidden border-8 border-white shadow-xl">
                            <img 
                                src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=1000&auto=format&fit=crop" 
                                alt="Moroccan Dish" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                        <div className="space-y-2">
                            <span className="text-foodie-orange font-bold tracking-[0.3em] uppercase text-[10px]">Chef's Selection</span>
                            <h2 className="text-5xl md:text-6xl font-serif font-black text-neutral-dark leading-tight">Nos Plats Populaires</h2>
                        </div>
                        <div className="flex gap-4">
                            <button className="p-4 rounded-full border border-neutral-dark/10 hover:bg-neutral-dark/5 transition-colors"><ArrowRight size={20} className="rotate-180" /></button>
                            <button className="p-4 rounded-full bg-foodie-orange text-white shadow-lg shadow-foodie-orange/20"><ArrowRight size={20} /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {featuredProducts.length > 0 ? featuredProducts.map((product, index) => (
                            <motion.div 
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-[40px] p-4 shadow-lg hover:shadow-2xl transition-all border border-neutral-dark/5 group"
                            >
                                <div className="h-64 rounded-[30px] overflow-hidden relative mb-6">
                                    <img 
                                        src={product.image ? `http://127.0.0.1:8000/storage/${product.image}` : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"} 
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg">
                                        <span className="text-foodie-orange font-black">${product.price}</span>
                                    </div>
                                </div>
                                <div className="px-4 pb-4 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-2xl font-black text-neutral-dark leading-tight">{product.name}</h3>
                                        <div className="flex text-foodie-orange items-center gap-1 font-bold">
                                            <Star size={16} fill="currentColor" />
                                            <span>4.9</span>
                                        </div>
                                    </div>
                                    <p className="text-neutral-dark/40 text-sm font-medium h-10 overflow-hidden">{product.description}</p>
                                    <button 
                                        onClick={() => addToCart(product)}
                                        className="w-full py-4 bg-neutral-dark text-white font-bold rounded-2xl hover:bg-foodie-orange transition-colors active:scale-95 duration-200"
                                    >
                                        Ajouter au Panier
                                    </button>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="col-span-3 text-center py-20 text-gray-400 font-medium italic">
                                Chargement de vos plats préférés...
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Foodie Features */}
            <section className="py-24 bg-[#fffbf2]/50 relative overflow-hidden">
                <div className="container mx-auto px-6 relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all border border-neutral-dark/5 text-center group">
                            <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-[30px] flex items-center justify-center mx-auto mb-8 transition-transform duration-500">
                                <Utensils size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-neutral-dark mb-4">Ingrédients Nobles</h3>
                            <p className="text-neutral-dark/40 font-medium leading-relaxed">Nous sélectionnons le meilleur des terroirs marocains pour des saveurs authentiques.</p>
                        </div>
                        <div className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all border border-neutral-dark/5 text-center group">
                            <div className="w-24 h-24 bg-foodie-orange/10 text-foodie-orange rounded-[30px] flex items-center justify-center mx-auto mb-8 transition-transform duration-500">
                                <Star size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-neutral-dark mb-4">Maîtres du Goût</h3>
                            <p className="text-neutral-dark/40 font-medium leading-relaxed">Nos chefs célèbrent l'héritage culinaire marocain avec passion et précision.</p>
                        </div>
                        <div className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all border border-neutral-dark/5 text-center group">
                            <div className="w-24 h-24 bg-blue-500/10 text-blue-500 rounded-[30px] flex items-center justify-center mx-auto mb-8 transition-transform duration-500">
                                <Clock size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-neutral-dark mb-4">Évasion Intemporelle</h3>
                            <p className="text-neutral-dark/40 font-medium leading-relaxed">Un cadre enchanteur où le temps s'arrête pour laisser place à la convivialité.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Foodie CTA */}
            <section className="py-24 px-6">
                <div className="container mx-auto bg-neutral-dark rounded-[60px] p-12 md:p-24 text-center text-white relative overflow-hidden group">
                    <div className="absolute inset-0 bg-foodie-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative z-10 space-y-10">
                        <h2 className="text-5xl md:text-7xl font-black leading-tight italic">Prêt pour un voyage <br /> <span className="text-foodie-orange italic">immobile ?</span></h2>
                        <p className="text-xl opacity-60 max-w-2xl mx-auto font-medium">Réservez votre table ou commandez en ligne pour savourer l'excellence marocaine chez vous.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/menu" className="bg-foodie-orange text-white px-12 py-5 rounded-3xl font-bold hover:scale-105 transition-transform shadow-xl shadow-foodie-orange/20">
                                Vérifier le Menu
                            </Link>
                            <Link to="/contact" className="px-12 py-5 rounded-3xl border-2 border-white/20 font-bold hover:bg-white/10 transition-colors">
                                Nous Contacter
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
