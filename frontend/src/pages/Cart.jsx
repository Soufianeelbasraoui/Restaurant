import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck, Clock, Utensils } from "lucide-react";
import { getDishImage } from "../utils/dishImages";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  // Livraison & emballage isotherme (15 MAD, ou offert dès 120 MAD)
  const deliveryFee = cartTotal >= 120 ? 0 : 15.00;
  const total = cartTotal + (cart.length > 0 ? deliveryFee : 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center px-6 pt-32 pb-24 text-neutral-dark">
        <div className="bg-white p-10 md:p-14 rounded-[5px] border border-[#ece4d5] shadow-sm max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-primary/10 border border-primary/20 text-primary rounded-[5px] mx-auto flex items-center justify-center">
            <ShoppingBag size={36} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-neutral-dark">
              Votre panier est vide
            </h1>
            <p className="text-neutral-dark/65 text-xs leading-relaxed">
              Explorez nos tajines mijotés, couscous de fête et douceurs pour composer votre festin marocain.
            </p>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center justify-center space-x-2 w-full py-3.5 bg-primary hover:bg-primary-dark text-white text-xs font-semibold uppercase tracking-wider rounded-[5px] transition-colors shadow-sm"
          >
            <Utensils size={15} />
            <span>Découvrir La Carte</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#faf7f2] min-h-screen text-neutral-dark pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Header Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#ece4d5] pb-6">
          <div className="space-y-1.5">
            <span className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
              Maison Beldi — Commande
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-dark">
              Mon Panier ({cart.reduce((sum, item) => sum + item.quantity, 0)} {cart.reduce((sum, item) => sum + item.quantity, 0) > 1 ? 'articles' : 'article'})
            </h1>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center space-x-1.5 text-xs font-medium text-neutral-dark/70 hover:text-primary transition-colors self-start sm:self-auto"
          >
            <ArrowLeft size={14} />
            <span>Continuer mes achats</span>
          </Link>
        </div>

        {/* Main Content: List + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 sm:p-5 rounded-[5px] border border-[#ece4d5] shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-primary/40 transition-colors"
              >
                {/* Item Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[5px] overflow-hidden border border-[#ece4d5] flex-shrink-0 bg-[#faf7f2]">
                  <img
                    src={getDishImage(item)}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1.5 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-base font-serif font-bold text-neutral-dark truncate">
                      {item.name}
                    </h3>
                    <span className="text-primary font-bold text-base whitespace-nowrap">
                      {(item.price * item.quantity).toFixed(2)} MAD
                    </span>
                  </div>
                  
                  <p className="text-[11px] text-neutral-dark/60">
                    Prix unitaire : <span className="font-semibold text-neutral-dark/80">{item.price} MAD</span>
                  </p>

                  {/* Quantity & Remove controls */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="inline-flex items-center border border-[#ece4d5] rounded-[5px] bg-[#faf7f2] overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-neutral-dark/60 hover:text-primary hover:bg-white transition-colors disabled:opacity-30"
                        disabled={item.quantity <= 1}
                        title="Diminuer"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-neutral-dark">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-neutral-dark/60 hover:text-primary hover:bg-white transition-colors"
                        title="Augmenter"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-neutral-dark/40 hover:text-red-600 transition-colors inline-flex items-center space-x-1 text-xs"
                      title="Retirer du panier"
                    >
                      <Trash2 size={14} />
                      <span className="hidden sm:inline">Supprimer</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Note beldi */}
            <div className="p-4 bg-white rounded-[5px] border border-[#ece4d5] text-xs text-neutral-dark/70 flex items-center space-x-3">
              <Clock size={18} className="text-primary shrink-0" />
              <span>Chaque plat est mijoté à la commande et livré dans un emballage thermique pour préserver toute sa chaleur et ses arômes.</span>
            </div>
          </div>

          {/* Order Summary (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-[5px] border border-[#ece4d5] shadow-sm space-y-6">
            <h2 className="font-serif font-bold text-lg text-neutral-dark border-b border-[#ece4d5] pb-3">
              Récapitulatif de Commande
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-neutral-dark/75">
                <span>Sous-total plats</span>
                <span className="font-semibold text-neutral-dark">{cartTotal.toFixed(2)} MAD</span>
              </div>
              <div className="flex justify-between text-neutral-dark/75">
                <span>Livraison & Emballage isotherme</span>
                <span className="font-semibold text-neutral-dark">
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 font-bold">Gratuite</span>
                  ) : (
                    `${deliveryFee.toFixed(2)} MAD`
                  )}
                </span>
              </div>

              {cartTotal < 120 && (
                <p className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200/60 p-2 rounded-[5px]">
                  Ajoutez <span className="font-bold">{(120 - cartTotal).toFixed(2)} MAD</span> pour bénéficier de la livraison gratuite !
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-[#ece4d5] flex justify-between items-baseline">
              <span className="font-serif font-bold text-base text-neutral-dark">Total TTC</span>
              <span className="font-serif font-bold text-2xl text-primary">
                {total.toFixed(2)} MAD
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white rounded-[5px] font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center space-x-2"
            >
              <span>Valider la Commande</span>
              <ArrowRight size={16} />
            </button>

            <div className="pt-2 border-t border-[#ece4d5]/60 space-y-2 text-[11px] text-neutral-dark/60">
              <div className="flex items-center space-x-2">
                <ShieldCheck size={14} className="text-green-600 shrink-0" />
                <span>Paiement sécurisé ou à la livraison</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={14} className="text-primary shrink-0" />
                <span>Livraison estimée : 30 — 45 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;