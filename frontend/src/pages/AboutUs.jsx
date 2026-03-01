import React from 'react';
import { motion } from 'framer-motion';
import { Award, Utensils, Heart, Leaf, Star, Clock, ShieldCheck } from 'lucide-react';

const AboutUs = () => {
    return (
        <div className="bg-white min-h-screen pb-32 overflow-hidden text-neutral-dark pt-32">
            {/* Moroccan Hero */}
            <section className="container mx-auto px-6 text-center mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <span className="text-primary font-bold uppercase tracking-[0.4em] text-xs">Héritage & Passion</span>
                    <h1 className="text-6xl md:text-7xl font-serif font-bold text-neutral-dark leading-tight">
                        L'Âme de <br/> <span className="text-primary italic">Dar Essalam</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-neutral-dark/60 text-lg leading-relaxed font-medium">
                        Une invitation au voyage au cœur des traditions culinaires du Maroc. 
                        Née d'une passion pour l'authenticité et le partage.
                    </p>
                </motion.div>
            </section>

            {/* Values */}
            <section className="bg-gray-50 py-24 mb-32 border-y border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h2 className="text-4xl font-serif font-bold text-neutral-dark">Notre Philosophie</h2>
                            <p className="text-neutral-dark/60 text-lg leading-relaxed italic border-l-4 border-primary pl-6">
                                "La cuisine marocaine est une symphonie d'épices, de parfums et de générosité."
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                                        <Heart size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Passion</h4>
                                        <p className="text-gray-500 text-sm">Every dish is crafted with love and attention to detail.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                                        <Leaf size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Freshness</h4>
                                        <p className="text-gray-500 text-sm">We source from local farmers and markets every morning.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="rounded-3xl overflow-hidden shadow-md border border-gray-200"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1550966840-3eeacbd6b523?w=800" 
                                alt="Chef at work" 
                                className="w-full h-[500px] object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* The Experience */}
            <section className="container mx-auto px-6 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:order-2 rounded-3xl overflow-hidden shadow-md border border-gray-200"
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800" 
                            alt="The dining room" 
                            className="w-full h-[500px] object-cover"
                        />
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:order-1 space-y-8"
                    >
                        <h2 className="text-4xl font-bold">The Atmosphere</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Whether it's a casual lunch or a special celebration, our space is designed to 
                            be warm, inviting, and comfortable for everyone.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                                <Award className="text-amber-500 mb-4" size={28} />
                                <h4 className="font-bold mb-1">Service</h4>
                                <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Always with a smile</p>
                            </div>
                            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                                <Utensils className="text-blue-500 mb-4" size={28} />
                                <h4 className="font-bold mb-1">Food</h4>
                                <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Consistently great</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
