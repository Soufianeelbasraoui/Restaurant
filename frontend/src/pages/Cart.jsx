import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck, Star } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();
    const serviceFee = 5.00;
    const tax = cartTotal * 0.08;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-white text-neutral-dark pt-40 flex flex-col items-center justify-center px-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-8 max-w-lg"
                >
                    <div className="w-32 h-32 bg-primary/5 rounded-full mx-auto flex items-center justify-center text-primary/40 border border-primary/10 shadow-sm">
                        <ShoppingBag size={56} />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold italic text-neutral-dark">Votre Panier est <span className="text-primary not-italic">Vide</span></h1>
                        <p className="text-neutral-dark/40 text-lg font-serif italic">"Une table est faite pour les souvenirs, pas seulement pour les repas."</p>
                    </div>
                    <Link to="/menu" className="btn-primary inline-flex items-center space-x-4">
                        <span>DÉCOUVRIR LE MENU</span>
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen text-neutral-dark pt-40 pb-20 px-6">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Items List */}
                    <div className="flex-1 space-y-10">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-10">
                            <div>
                                <h1 className="text-5xl font-serif font-bold text-neutral-dark italic">Le Panier <span className="text-primary not-italic">Dar Essalam</span></h1>
                                <p className="text-[10px] font-bold tracking-[0.4em] text-neutral-dark/40 uppercase mt-2">Une Sélection de {cart.length} Délices</p>
                            </div>
                            <Link to="/menu" className="text-xs font-bold tracking-widest text-primary hover:text-neutral-dark transition-colors flex items-center space-x-2">
                                <Plus size={14} /> <span>AJOUTER PLUS</span>
                            </Link>
                        </div>

                        <div className="space-y-8">
                            {cart.map((item) => (
                                <motion.div 
                                    key={item.id}
                                    layout
                                    className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm group hover:shadow-md transition-all"
                                >
                                    <div className="flex flex-col sm:flex-row items-center gap-10">
                                        <div className="w-40 h-40 rounded-2xl overflow-hidden border border-gray-100 p-1 relative flex-shrink-0">
                                            <img 
                                                src={item.image ? (item.image.startsWith('http') ? item.image : `http://127.0.0.1:8000/storage/${item.image}`) : 'https://via.placeholder.com/150'} 
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded-xl transition-all duration-700"
                                            />
                                        </div>
                                        
                                        <div className="flex-1 w-full space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-2xl font-serif font-bold text-neutral-dark group-hover:text-primary transition-colors tracking-tight">{item.name}</h3>
                                                    <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-dark/40 uppercase mt-1">Préparation Artisanale</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-2xl font-serif font-bold text-neutral-dark">${(item.price * item.quantity).toFixed(2)}</span>
                                                    <p className="text-[10px] text-neutral-dark/40 font-bold tracking-widest uppercase mt-1">Total</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div className="flex items-center bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-3 hover:text-primary text-gray-400 transition-colors"><Minus size={16} /></button>
                                                    <span className="w-12 text-center text-xl font-serif font-bold text-neutral-dark">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-3 hover:text-primary text-gray-400 transition-colors"><Plus size={16} /></button>
                                                </div>
                                                <button 
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="flex items-center space-x-2 text-[10px] font-bold tracking-[0.3em] text-gray-400 hover:text-red-500 transition-colors uppercase"
                                                >
                                                    <Trash2 size={16} />
                                                    <span>Retirer</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="w-full lg:w-[450px]">
                        <div className="sticky top-40 space-y-8">
                            <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 shadow-sm space-y-10">
                                <div className="space-y-4 pb-10 border-b border-gray-200">
                                    <div className="flex items-center space-x-3 text-primary mb-2">
                                        <ShieldCheck size={20} />
                                        <h2 className="text-[11px] font-bold tracking-[0.4em] uppercase">Résumé de Commande</h2>
                                    </div>
                                    <p className="text-[10px] text-neutral-dark/40 font-medium italic leading-relaxed">
                                        Votre commande inclut une réservation prioritaire et nos meilleures sélections maison.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex justify-between text-xs font-bold tracking-widest text-neutral-dark/40 uppercase">
                                        <span>Sous-total</span>
                                        <span className="text-neutral-dark">${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold tracking-widest text-neutral-dark/40 uppercase">
                                        <span>Taxe Gouvernementale (8%)</span>
                                        <span className="text-neutral-dark">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold tracking-widest text-neutral-dark/40 uppercase">
                                        <span>Service Expérience</span>
                                        <span className="text-neutral-dark">${serviceFee.toFixed(2)}</span>
                                    </div>
                                    <div className="pt-10 flex justify-between items-end border-t border-gray-200">
                                        <div>
                                            <p className="text-[10px] font-bold tracking-[0.4em] text-neutral-dark/40 uppercase">Montant Final</p>
                                            <span className="text-5xl font-serif font-bold text-neutral-dark tracking-tighter italic">Total</span>
                                        </div>
                                        <span className="text-5xl font-serif font-bold text-primary tracking-tighter">
                                            ${(cartTotal + tax + serviceFee).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => navigate('/checkout')}
                                    className="w-full btn-primary !py-6 flex items-center justify-center space-x-4 shadow-xl shadow-primary/20 group"
                                >
                                    <ShieldCheck size={20} />
                                    <span className="tracking-[0.4em]">PROCÉDER RÉSERVATION</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* Trust Badge */}
                            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex items-center space-x-6">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Star size={24} className="fill-primary" />
                                </div>
                                <p className="text-[9px] font-bold tracking-[0.2em] text-neutral-dark/40 uppercase leading-relaxed">
                                    Inclusion de Réservation Prioritaire • Transactions Sécurisées <br/>
                                    <span className="text-primary italic mt-1 inline-block">Paiement Sécurisé Dar Essalam®</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Cart;
