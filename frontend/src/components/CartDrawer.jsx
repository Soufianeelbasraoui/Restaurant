import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, ShieldCheck, ArrowRight, Trash2, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();
    const serviceFee = 5.00;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-neutral-dark/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-screen w-full max-w-lg bg-neutral-base border-l border-neutral-light z-[101] flex flex-col shadow-2xl overflow-hidden"
                    >
                        {/* Moroccan Pattern Overlay */}
                        <div className="absolute inset-0 bg-pattern pointer-events-none opacity-[0.03]"></div>

                        {/* Header */}
                        <div className="relative p-8 border-b border-neutral-light flex items-center justify-between bg-white/50 backdrop-blur-md">
                            <div className="space-y-1">
                                <div className="flex items-center space-x-3 text-primary">
                                    <ShoppingBag size={24} />
                                    <h2 className="text-2xl font-serif font-bold tracking-tight text-neutral-dark">Mon Panier</h2>
                                </div>
                                <p className="text-[10px] font-bold tracking-widest text-accent uppercase">Tradition & Saveurs</p>
                            </div>
                            <button onClick={onClose} className="p-3 hover:bg-neutral-light rounded-full transition-colors text-neutral-dark/40 hover:text-neutral-dark">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6 relative scrollbar-hide">
                            {cart.length > 0 ? (
                                cart.map((item, index) => (
                                    <motion.div 
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        key={item.id} 
                                        className="flex items-center space-x-6 p-4 bg-white rounded-2xl border border-neutral-light shadow-sm hover:border-primary/20 transition-all group"
                                    >
                                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-light flex-shrink-0 border border-neutral-light relative p-1 outline outline-1 outline-accent/10">
                                            <img 
                                                src={item.image ? (item.image.startsWith('http') ? item.image : `http://127.0.0.1:8000/storage/${item.image}`) : 'https://via.placeholder.com/150'} 
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0 space-y-2">
                                            <div className="flex justify-between items-start">
                                                <div className="overflow-hidden">
                                                    <h3 className="font-bold text-gray-900 truncate">{item.name}</h3>
                                                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest mt-0.5">Spécialité Maison</p>
                                                </div>
                                                <span className="text-primary font-bold text-lg ml-2">${item.price}</span>
                                            </div>
                                            
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center bg-neutral-light rounded-lg border border-neutral-light p-1">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 px-2 hover:text-primary text-neutral-dark/40 transition-colors"><Minus size={12} /></button>
                                                    <span className="w-6 text-center font-bold text-sm text-neutral-dark">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 px-2 hover:text-primary text-neutral-dark/40 transition-colors"><Plus size={12} /></button>
                                                </div>
                                                <button 
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-2 text-neutral-dark/20 hover:text-red-500 transition-colors"
                                                    title="Supprimer"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                             ) : (
                                <div className="h-full flex flex-col items-center justify-center space-y-6 text-center py-20">
                                    <div className="w-20 h-20 bg-neutral-light rounded-full flex items-center justify-center text-primary/30 outline outline-1 outline-accent/20">
                                        <ShoppingBag size={40} />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xl font-serif font-bold text-neutral-dark/60 italic">Votre panier est vide</p>
                                        <p className="text-[10px] font-bold tracking-widest text-neutral-dark/30 uppercase">Découvrez nos délices marocains</p>
                                    </div>
                                    <button onClick={onClose} className="btn-outline border-accent/20 text-accent hover:border-accent hover:bg-accent/5 px-10">COMMANDING NOW</button>
                                </div>
                            )}
                        </div>

                        {/* Footer Summary */}
                        <div className="relative p-8 bg-white border-t border-neutral-light space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between text-[11px] font-bold tracking-widest text-neutral-dark/40 uppercase">
                                    <span>Sous-total</span>
                                    <span className="text-neutral-dark">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px] font-bold tracking-widest text-neutral-dark/40 uppercase">
                                    <div className="flex items-center space-x-1.5">
                                        <span>Frais de Service</span>
                                        <Info size={12} className="text-accent" />
                                    </div>
                                    <span className="text-neutral-dark">${serviceFee.toFixed(2)}</span>
                                </div>
                                <div className="pt-4 border-t border-neutral-light overflow-hidden">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-sm font-bold text-neutral-dark uppercase tracking-widest">Total</span>
                                        <span className="text-4xl font-serif font-bold text-primary">${(cartTotal + (cart.length > 0 ? serviceFee : 0)).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => {
                                    onClose();
                                    navigate('/checkout');
                                }}
                                disabled={cart.length === 0}
                                className="w-full btn-primary !py-5 flex items-center justify-center space-x-4 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed group relative overflow-hidden shadow-lg shadow-primary/20"
                            >
                                <span className="relative z-10 flex items-center space-x-3 tracking-[0.2em] font-bold">
                                    <ShieldCheck size={20} />
                                    <span>CONFIRMER LA COMMANDE</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>

                            <p className="text-[9px] text-center text-accent/60 font-bold tracking-[0.2em] uppercase italic">
                                Expérience authentique & Paiement sécurisé
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
