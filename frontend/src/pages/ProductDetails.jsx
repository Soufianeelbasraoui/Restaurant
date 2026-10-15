import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, ShieldCheck, Heart, Share2, Star, ChevronLeft } from 'lucide-react';
import { getDishImage } from '../utils/dishImages';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(() => navigate('/menu'))
            .finally(() => setLoading(false));
    }, [id, navigate]);

    if (loading) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="text-gray-400 font-medium text-sm">Loading details...</p>
            </div>
        </div>
    );

    return (
        <div className="bg-[#faf7f2] min-h-screen text-neutral-dark pt-32 pb-24 px-6">
            <div className="container mx-auto max-w-6xl">
                {/* Back Button */}
                <Link to="/menu" className="inline-flex items-center space-x-2 text-neutral-dark/60 hover:text-primary transition-colors mb-8 text-xs font-medium">
                    <ChevronLeft size={16} />
                    <span>Retour au Menu</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Product Image */}
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="rounded-[5px] overflow-hidden border border-[#ece4d5] shadow-sm aspect-square relative group bg-white">
                            <img 
                                src={getDishImage(product)} 
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&auto=format&fit=crop&q=80';
                                }}
                            />
                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-[5px] border border-[#ece4d5] shadow-sm">
                                <span className="text-primary font-bold text-base">{product.price} MAD</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-10"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-md">
                                    {product.category?.name || 'Dish'}
                                </span>
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-center space-x-3 text-gray-400">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className={`${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
                                    ))}
                                </div>
                                <span className="text-sm font-medium">(100+ Reviews)</span>
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed italic border-l-4 border-gray-100 pl-6 py-2">
                                {product.description}
                            </p>
                        </div>

                        {/* Order Controls */}
                        <div className="space-y-6 pt-6 border-t border-[#ece4d5]">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="flex items-center bg-white rounded-[5px] border border-[#ece4d5] p-1">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-9 h-9 flex items-center justify-center hover:bg-neutral-light rounded-[3px] transition-all text-neutral-dark/60 hover:text-primary"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-10 text-center font-serif font-bold text-base">{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-9 h-9 flex items-center justify-center hover:bg-neutral-light rounded-[3px] transition-all text-neutral-dark/60 hover:text-primary"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button 
                                    onClick={() => addToCart({ ...product, quantity })}
                                    className="flex-1 w-full bg-primary hover:bg-primary-dark text-white text-xs font-medium py-3 px-6 rounded-[5px] transition-colors shadow-sm flex items-center justify-center space-x-2"
                                >
                                    <ShoppingBag size={16} />
                                    <span>Ajouter au Panier</span>
                                </button>
                            </div>

                            <div className="flex items-center space-x-6">
                                <button className="flex items-center space-x-2 text-xs font-medium text-neutral-dark/60 hover:text-primary transition-colors">
                                    <Heart size={14} /> <span>Sauvegarder</span>
                                </button>
                                <button className="flex items-center space-x-2 text-xs font-medium text-neutral-dark/60 hover:text-primary transition-colors">
                                    <Share2 size={14} /> <span>Partager</span>
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-[5px] p-4 border border-[#ece4d5] flex items-center space-x-3">
                                <ShieldCheck className="text-emerald-600" size={20} />
                                <span className="text-xs font-medium text-neutral-dark">Produits Frais du Marché</span>
                            </div>
                            <div className="bg-white rounded-[5px] p-4 border border-[#ece4d5] flex items-center space-x-3">
                                <Star className="text-amber-500" size={20} />
                                <span className="text-xs font-medium text-neutral-dark">Cuisine Maison Beldi</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
