import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { motion } from 'framer-motion';
import { 
    ShieldCheck, 
    MapPin, 
    CreditCard, 
    ShoppingBag, 
    ArrowRight, 
    ChevronRight, 
    Lock, 
    CheckCircle2, 
    Clock, 
    Banknote, 
    Phone, 
    User,
    ArrowLeft
} from 'lucide-react';
import { getDishImage } from '../utils/dishImages';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [createdOrderId, setCreatedOrderId] = useState(null);
    
    const [form, setForm] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        city: 'Casablanca',
        address: user?.address || '',
        notes: '',
        payment_method: 'cash' // 'cash' or 'card'
    });

    const deliveryFee = cartTotal >= 120 ? 0 : 15.00;
    const total = cartTotal + (cart.length > 0 ? deliveryFee : 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cart.length === 0) return;

        setLoading(true);
        try {
            const res = await api.post('/orders', {
                address: `${form.city ? form.city + ' — ' : ''}${form.address}${form.notes ? ' (' + form.notes + ')' : ''}`,
                phone: form.phone,
                payment_method: form.payment_method,
                items: cart.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                total_price: total
            });
            const newOrder = res.data?.data;
            if (newOrder?.id) {
                setCreatedOrderId(newOrder.id);
            }
            setOrderSuccess(true);
            clearCart();
            setTimeout(() => {
                navigate('/dashboard/orders');
            }, 3500);
        } catch (err) {
            console.error(err);
            alert('Une erreur est survenue lors de la création de la commande. Veuillez vérifier vos informations.');
        } finally {
            setLoading(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-6 pt-24 pb-20">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-8 md:p-12 rounded-[5px] border border-[#ece4d5] shadow-sm text-center space-y-6 max-w-lg w-full"
                >
                    <div className="w-20 h-20 bg-green-50 border border-green-200 rounded-[5px] mx-auto flex items-center justify-center text-green-600 shadow-sm">
                        <CheckCircle2 size={42} />
                    </div>
                    <div className="space-y-2">
                        <span className="text-primary font-semibold text-xs uppercase tracking-widest">Maison Beldi</span>
                        <h1 className="text-2xl md:text-3xl font-serif font-bold text-neutral-dark">
                            Commande Confirmée avec Succès !
                        </h1>
                        {createdOrderId && (
                            <p className="text-xs font-bold text-neutral-dark/80 bg-[#faf7f2] border border-[#ece4d5] py-1.5 px-3 rounded-[5px] inline-block">
                                Commande N° #{createdOrderId}
                            </p>
                        )}
                        <p className="text-neutral-dark/65 text-xs leading-relaxed max-w-sm mx-auto">
                            Nos cuisiniers s'affairent déjà à mijoter vos plats. Votre livreur prendra contact avec vous à l'approche de votre adresse.
                        </p>
                    </div>

                    <div className="pt-2 border-t border-[#ece4d5] space-y-3">
                        <p className="text-[11px] text-neutral-dark/50">
                            Redirection automatique vers vos commandes dans quelques secondes...
                        </p>
                        <Link 
                            to="/dashboard/orders"
                            className="inline-block py-2.5 px-6 bg-primary hover:bg-primary-dark text-white text-xs font-semibold uppercase tracking-wider rounded-[5px] transition-colors shadow-sm"
                        >
                            Voir mes Commandes
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center px-6 pt-32 pb-24 text-neutral-dark">
                <div className="bg-white p-10 rounded-[5px] border border-[#ece4d5] shadow-sm max-w-md w-full text-center space-y-4">
                    <ShoppingBag size={40} className="mx-auto text-neutral-dark/30" />
                    <h2 className="text-2xl font-serif font-bold text-neutral-dark">Votre panier est vide</h2>
                    <p className="text-neutral-dark/65 text-xs">Veuillez d'abord sélectionner des spécialités de la carte.</p>
                    <Link to="/menu" className="inline-block py-3 px-6 bg-primary text-white text-xs font-semibold rounded-[5px]">
                        Retour au Menu
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#faf7f2] min-h-screen text-neutral-dark pt-32 pb-24 px-6">
            <div className="container mx-auto max-w-6xl space-y-8">
                {/* Header & Steps */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#ece4d5] pb-6">
                    <div className="space-y-1.5">
                        <span className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
                            Maison Beldi — Finalisation
                        </span>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-dark">
                            Validation de la Commande
                        </h1>
                    </div>
                    <Link
                        to="/cart"
                        className="inline-flex items-center space-x-1.5 text-xs font-medium text-neutral-dark/70 hover:text-primary transition-colors self-start sm:self-auto"
                    >
                        <ArrowLeft size={14} />
                        <span>Modifier mon Panier</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Form Info (7 cols) */}
                    <div className="lg:col-span-7 space-y-6">
                        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                            {/* Step 1: Delivery Details */}
                            <div className="bg-white p-6 sm:p-8 rounded-[5px] border border-[#ece4d5] shadow-sm space-y-5">
                                <div className="flex items-center space-x-3 border-b border-[#ece4d5] pb-4">
                                    <div className="w-8 h-8 rounded-[5px] bg-primary/10 text-primary flex items-center justify-center">
                                        <MapPin size={17} />
                                    </div>
                                    <div>
                                        <h2 className="text-base font-serif font-bold text-neutral-dark">1. Adresse de Livraison</h2>
                                        <p className="text-[11px] text-neutral-dark/60">Où devons-nous vous livrer vos plats chauds ?</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-neutral-dark/80">
                                            Nom & Prénom <span className="text-primary">*</span>
                                        </label>
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="Ex: Soufiane El Basraoui"
                                            value={form.name}
                                            onChange={(e) => setForm({...form, name: e.target.value})}
                                            className="w-full bg-[#faf7f2] border border-[#ece4d5] rounded-[5px] px-3.5 py-2.5 text-xs text-neutral-dark outline-none focus:border-primary focus:bg-white transition-all"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-neutral-dark/80">
                                            Numéro de Téléphone <span className="text-primary">*</span>
                                        </label>
                                        <input 
                                            required
                                            type="tel" 
                                            placeholder="+212 612 34 56 78"
                                            value={form.phone}
                                            onChange={(e) => setForm({...form, phone: e.target.value})}
                                            className="w-full bg-[#faf7f2] border border-[#ece4d5] rounded-[5px] px-3.5 py-2.5 text-xs text-neutral-dark outline-none focus:border-primary focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-neutral-dark/80">
                                            Ville <span className="text-primary">*</span>
                                        </label>
                                        <select
                                            value={form.city}
                                            onChange={(e) => setForm({...form, city: e.target.value})}
                                            className="w-full bg-[#faf7f2] border border-[#ece4d5] rounded-[5px] px-3.5 py-2.5 text-xs text-neutral-dark outline-none focus:border-primary focus:bg-white transition-all"
                                        >
                                            <option value="Casablanca">Casablanca</option>
                                            <option value="Rabat">Rabat</option>
                                            <option value="Marrakech">Marrakech</option>
                                            <option value="Tanger">Tanger</option>
                                            <option value="Fès">Fès</option>
                                        </select>
                                    </div>

                                    <div className="sm:col-span-2 space-y-1.5">
                                        <label className="text-xs font-semibold text-neutral-dark/80">
                                            Adresse, Quartier, N° Rue <span className="text-primary">*</span>
                                        </label>
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="Ex: Quartier Gauthier, 14 Rue Jean Jaurès, Apt 6"
                                            value={form.address}
                                            onChange={(e) => setForm({...form, address: e.target.value})}
                                            className="w-full bg-[#faf7f2] border border-[#ece4d5] rounded-[5px] px-3.5 py-2.5 text-xs text-neutral-dark outline-none focus:border-primary focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-neutral-dark/80">
                                        Indications complémentaires pour le livreur <span className="text-neutral-dark/40 font-normal text-[10px]">(Optionnel)</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder="Ex: Interphone 12, sonner 2 fois, à côté de la pharmacie..."
                                        value={form.notes}
                                        onChange={(e) => setForm({...form, notes: e.target.value})}
                                        className="w-full bg-[#faf7f2] border border-[#ece4d5] rounded-[5px] px-3.5 py-2.5 text-xs text-neutral-dark outline-none focus:border-primary focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            {/* Step 2: Payment Mode */}
                            <div className="bg-white p-6 sm:p-8 rounded-[5px] border border-[#ece4d5] shadow-sm space-y-5">
                                <div className="flex items-center space-x-3 border-b border-[#ece4d5] pb-4">
                                    <div className="w-8 h-8 rounded-[5px] bg-primary/10 text-primary flex items-center justify-center">
                                        <CreditCard size={17} />
                                    </div>
                                    <div>
                                        <h2 className="text-base font-serif font-bold text-neutral-dark">2. Mode de Paiement</h2>
                                        <p className="text-[11px] text-neutral-dark/60">Choisissez votre méthode de règlement préférée</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Cash on Delivery */}
                                    <label 
                                        className={`p-4 rounded-[5px] border cursor-pointer transition-all flex items-start space-x-3 ${
                                            form.payment_method === 'cash' 
                                                ? 'border-primary bg-primary/5 shadow-sm' 
                                                : 'border-[#ece4d5] hover:border-primary/40 bg-white'
                                        }`}
                                    >
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            className="mt-1 accent-primary" 
                                            checked={form.payment_method === 'cash'}
                                            onChange={() => setForm({...form, payment_method: 'cash'})}
                                        />
                                        <div className="space-y-0.5">
                                            <div className="flex items-center space-x-1.5 font-semibold text-xs text-neutral-dark">
                                                <Banknote size={15} className="text-green-600" />
                                                <span>Espèces à la Livraison</span>
                                            </div>
                                            <p className="text-[11px] text-neutral-dark/60 leading-relaxed">
                                                Réglez directement au livreur à la réception de votre commande.
                                            </p>
                                        </div>
                                    </label>

                                    {/* Card */}
                                    <label 
                                        className={`p-4 rounded-[5px] border cursor-pointer transition-all flex items-start space-x-3 ${
                                            form.payment_method === 'card' 
                                                ? 'border-primary bg-primary/5 shadow-sm' 
                                                : 'border-[#ece4d5] hover:border-primary/40 bg-white'
                                        }`}
                                    >
                                        <input 
                                            type="radio" 
                                            name="payment" 
                                            className="mt-1 accent-primary" 
                                            checked={form.payment_method === 'card'}
                                            onChange={() => setForm({...form, payment_method: 'card'})}
                                        />
                                        <div className="space-y-0.5">
                                            <div className="flex items-center space-x-1.5 font-semibold text-xs text-neutral-dark">
                                                <CreditCard size={15} className="text-primary" />
                                                <span>Carte Bancaire (CMI)</span>
                                            </div>
                                            <p className="text-[11px] text-neutral-dark/60 leading-relaxed">
                                                Paiement instantané sécurisé par carte marocaine ou internationale.
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Right: Order Summary Sidebar (5 cols) */}
                    <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-[5px] border border-[#ece4d5] shadow-sm space-y-6 sticky top-28">
                        <div className="flex items-center justify-between border-b border-[#ece4d5] pb-3">
                            <h2 className="font-serif font-bold text-base text-neutral-dark">
                                Votre Commande ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                            </h2>
                            <Link to="/cart" className="text-xs text-primary font-medium hover:underline">
                                Modifier
                            </Link>
                        </div>

                        {/* Items preview list */}
                        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                                    <div className="flex items-center space-x-3 overflow-hidden">
                                        <img 
                                            src={getDishImage(item)} 
                                            alt={item.name}
                                            className="w-12 h-12 rounded-[5px] object-cover border border-[#ece4d5] shrink-0"
                                        />
                                        <div className="overflow-hidden">
                                            <p className="font-semibold text-neutral-dark truncate">{item.name}</p>
                                            <p className="text-[11px] text-neutral-dark/60">Qté : {item.quantity}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-neutral-dark whitespace-nowrap">
                                        {(item.price * item.quantity).toFixed(2)} MAD
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Price breakdown */}
                        <div className="space-y-2.5 pt-4 border-t border-[#ece4d5] text-xs">
                            <div className="flex justify-between text-neutral-dark/70">
                                <span>Sous-total plats</span>
                                <span className="font-semibold text-neutral-dark">{cartTotal.toFixed(2)} MAD</span>
                            </div>
                            <div className="flex justify-between text-neutral-dark/70">
                                <span>Livraison & Isotherme</span>
                                <span className="font-semibold text-neutral-dark">
                                    {deliveryFee === 0 ? <span className="text-green-600 font-bold">Gratuite</span> : `${deliveryFee.toFixed(2)} MAD`}
                                </span>
                            </div>
                            <div className="pt-3 border-t border-[#ece4d5] flex justify-between items-baseline">
                                <span className="font-serif font-bold text-base text-neutral-dark">Total à régler</span>
                                <span className="font-serif font-bold text-2xl text-primary">{total.toFixed(2)} MAD</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            form="checkout-form"
                            disabled={loading || cart.length === 0}
                            className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-[5px] font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <Lock size={15} />
                                    <span>Confirmer la Commande • {total.toFixed(2)} MAD</span>
                                </>
                            )}
                        </button>

                        {/* Reassurance notes */}
                        <div className="pt-3 border-t border-[#ece4d5]/60 space-y-2 text-[11px] text-neutral-dark/65">
                            <div className="flex items-center space-x-2">
                                <ShieldCheck size={14} className="text-green-600 shrink-0" />
                                <span>Paiement 100% garanti et sans frais cachés</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock size={14} className="text-primary shrink-0" />
                                <span>Temps moyen de livraison : 30 à 45 minutes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
