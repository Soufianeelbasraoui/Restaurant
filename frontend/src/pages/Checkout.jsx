import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, CreditCard, ShoppingBag, ArrowRight, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    
    const [form, setForm] = useState({
        address: '',
        phone: '',
        payment_method: 'card'
    });

    const tax = cartTotal * 0.08;
    const serviceFee = 5.00;
    const total = cartTotal + tax + serviceFee;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/orders', {
                ...form,
                items: cart.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                total_price: total
            });
            setOrderSuccess(true);
            setTimeout(() => {
                clearCart();
                navigate('/dashboard/orders');
            }, 3000);
        } catch (err) {
            console.error(err);
            alert('Failed to place order. Please check your information.');
        } finally {
            setLoading(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center px-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-10 max-w-xl"
                >
                    <div className="w-40 h-40 bg-primary/10 rounded-full mx-auto flex items-center justify-center text-primary border-4 border-primary/20 shadow-xl animate-pulse">
                        <CheckCircle2 size={72} />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-5xl font-serif font-bold text-neutral-dark uppercase tracking-widest">Réservation <span className="text-primary">Confirmée</span></h1>
                        <p className="text-neutral-dark/40 text-lg font-serif italic">Votre voyage avec Dar Essalam commence maintenant. Redirection vers votre concierge...</p>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen text-neutral-dark pt-40 pb-20 px-6">
            <div className="container mx-auto">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
                    {/* Checkout Form */}
                    <div className="flex-1 space-y-12">
                        <div className="space-y-4 border-b border-gray-100 pb-10">
                            <h1 className="text-5xl font-serif font-bold italic text-neutral-dark">L'Expérience <span className="text-primary not-italic">Commande</span></h1>
                            <div className="flex items-center space-x-3 text-[10px] font-bold tracking-[0.4em] text-neutral-dark/40 uppercase">
                                <span>Identité</span> <ChevronRight size={12} /> <span>Livraison</span> <ChevronRight size={12} /> <span className="text-primary">Finalisation</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-12">
                            {/* Delivery Info */}
                            <div className="space-y-8">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary"><MapPin size={18} /></div>
                                    <h2 className="text-lg font-serif font-bold tracking-widest uppercase">Destination de Livraison</h2>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold tracking-widest text-neutral-dark/40 uppercase ml-1">Adresse d'Arrivée</label>
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="Ex: 128 Avenue Mohammed V"
                                            value={form.address}
                                            onChange={(e) => setForm({...form, address: e.target.value})}
                                            className="w-full !py-4"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold tracking-widest text-neutral-dark/40 uppercase ml-1">Contact Concierge</label>
                                        <input 
                                            required
                                            type="tel" 
                                            placeholder="+212 600-000000"
                                            value={form.phone}
                                            onChange={(e) => setForm({...form, phone: e.target.value})}
                                            className="w-full !py-4"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Options */}
                            <div className="space-y-8 pt-12 border-t border-gray-100">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary"><CreditCard size={18} /></div>
                                    <h2 className="text-lg font-serif font-bold tracking-widest uppercase">Mode de Paiement</h2>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {['card', 'cash'].map(method => (
                                        <label 
                                            key={method}
                                            className={`relative bg-gray-50 rounded-3xl !p-8 cursor-pointer border-2 transition-all flex items-center space-x-6
                                                ${form.payment_method === method ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-primary/20'}`}
                                        >
                                            <input 
                                                type="radio" 
                                                name="payment" 
                                                className="hidden" 
                                                checked={form.payment_method === method}
                                                onChange={() => setForm({...form, payment_method: method})}
                                            />
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                                                ${form.payment_method === method ? 'border-primary bg-primary' : 'border-gray-300'}`}>
                                                {form.payment_method === method && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </div>
                                            <div>
                                                <p className="font-serif font-bold text-lg uppercase tracking-widest">{method === 'card' ? 'Carte Signature' : 'Espèces Privée'}</p>
                                                <p className="text-[10px] text-neutral-dark/40 font-bold tracking-widest uppercase mt-1">
                                                    {method === 'card' ? 'Visa, MC, Amex • Instantané' : 'Paiement à la livraison'}
                                                </p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full btn-primary !py-6 flex items-center justify-center space-x-4 group disabled:opacity-50 shadow-xl shadow-primary/20"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Lock size={18} />
                                        <span className="tracking-[0.4em]">FINALISER MA COMMANDE</span>
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-[450px]">
                        <div className="sticky top-40 space-y-8">
                            <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 shadow-sm space-y-10">
                                <div className="space-y-2 pb-10 border-b border-gray-200">
                                    <div className="flex items-center space-x-3 text-primary">
                                        <ShoppingBag size={18} />
                                        <h2 className="text-[11px] font-bold tracking-[0.4em] uppercase">Votre Collection</h2>
                                    </div>
                                    <p className="text-[10px] text-neutral-dark/40 font-bold uppercase tracking-widest leading-relaxed">
                                        UNE SÉLECTION CURATIVE DES MEILLEURS PLATS
                                    </p>
                                </div>

                                <div className="space-y-8 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                                    {cart.map(item => (
                                        <div key={item.id} className="flex justify-between items-center group">
                                            <div className="flex items-center space-x-6">
                                                <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 p-1 relative">
                                                    <img 
                                                        src={item.image ? (item.image.startsWith('http') ? item.image : `http://127.0.0.1:8000/storage/${item.image}`) : 'https://via.placeholder.com/150'} 
                                                        className="w-full h-full object-cover rounded-lg transition-all duration-700"
                                                    />
                                                    <div className="absolute -top-1 -right-1 bg-primary text-white text-[8px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                                        {item.quantity}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-serif font-bold text-neutral-dark uppercase tracking-widest">{item.name}</p>
                                                    <p className="text-[9px] text-neutral-dark/40 font-bold uppercase mt-1 tracking-widest">{item.quantity} x ${item.price}</p>
                                                </div>
                                            </div>
                                            <span className="text-sm font-serif font-bold text-neutral-dark">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 pt-10 border-t border-gray-200">
                                    <div className="flex justify-between text-[11px] font-bold tracking-widest text-neutral-dark/40 uppercase">
                                        <span>Sous-total</span>
                                        <span className="text-neutral-dark">${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-[11px] font-bold tracking-widest text-neutral-dark/40 uppercase">
                                        <span>Taxe & Service</span>
                                        <span className="text-neutral-dark">${(tax + serviceFee).toFixed(2)}</span>
                                    </div>
                                    <div className="pt-8 flex justify-between items-end">
                                        <span className="text-4xl font-serif font-bold text-neutral-dark italic tracking-tighter">Total</span>
                                        <span className="text-4xl font-serif font-bold text-primary tracking-tighter">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center space-x-4">
                                    <ShieldCheck size={20} className="text-primary" />
                                    <p className="text-[9px] font-bold tracking-[0.2em] text-neutral-dark/40 uppercase leading-relaxed">
                                        Paiement Sécurisé Vérifié <br/>
                                        <span className="text-neutral-dark italic">AUCUN FRAIS DE TRANSACTION APPLIQUÉ</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
