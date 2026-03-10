import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2, Minus, Plus } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  const serviceFee = 5;
  const tax = cartTotal * 0.08;
  const total = cartTotal + tax + serviceFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white font-sans">
        <h1 className="text-2xl font-serif font-bold mb-4 text-neutral-dark">
          Votre panier est vide
        </h1>
        <Link
          to="/menu"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Voir le menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-24 px-4 font-sans">
      <h1 className="text-3xl font-serif font-bold mb-6 text-neutral-dark">
        Votre Panier
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Liste des produits */}
        <div className="flex-1 space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center border p-3 rounded">
              <img
                src={
                  item.image
                    ? item.image.startsWith("http")
                      ? item.image
                      : `http://127.0.0.1:8000/storage/${item.image}`
                    : "https://via.placeholder.com/100"
                }
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1 ml-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-serif font-semibold text-neutral-dark">
                    {item.name}
                  </h3>
                  <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center mt-2 gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="border px-2 rounded"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="border px-2 rounded"
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 ml-4 flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Résumé */}
        <div className="w-full lg:w-72 border p-4 rounded">
          <h2 className="font-serif font-bold mb-3 text-neutral-dark text-lg">Résumé</h2>
          <div className="flex justify-between mb-1 text-sm text-neutral-dark">
            <span>Sous-total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1 text-sm text-neutral-dark">
            <span>Taxe (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-3 text-sm text-neutral-dark">
            <span>Service</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-base border-t pt-2">
            <span>Total</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="mt-4 w-full bg-primary text-white py-2 rounded"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;