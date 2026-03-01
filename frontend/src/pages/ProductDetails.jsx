import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, ShieldCheck, Heart, Share2, Star, ChevronLeft } from 'lucide-react';

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
        <div className="bg-white min-h-screen text-neutral-dark pt-32 pb-20 px-6">
            <div className="container mx-auto">
                {/* Back Button */}
                <Link to="/menu" className="inline-flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors mb-8 font-medium">
                    <ChevronLeft size={20} />
                    <span>Back to Menu</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Product Image */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm aspect-square relative group">
                            <img 
                                src={product.image ? `http://127.0.0.1:8000/storage/${product.image}` : `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200`} 
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                                <span className="text-primary font-bold text-lg">${product.price}</span>
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
                        <div className="space-y-6 pt-6 border-t border-gray-100">
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 p-1">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-all text-gray-400 hover:text-primary"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-all text-gray-400 hover:text-primary"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>

                                <button 
                                    onClick={() => addToCart({ ...product, quantity })}
                                    className="flex-1 w-full btn-primary flex items-center justify-center space-x-3"
                                >
                                    <ShoppingBag size={20} />
                                    <span>Add to Cart</span>
                                </button>
                            </div>

                            <div className="flex items-center space-x-6">
                                <button className="flex items-center space-x-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors uppercase tracking-wider">
                                    <Heart size={16} /> <span>Save</span>
                                </button>
                                <button className="flex items-center space-x-2 text-sm font-bold text-gray-400 hover:text-primary transition-colors uppercase tracking-wider">
                                    <Share2 size={16} /> <span>Share</span>
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center space-x-3">
                                <ShieldCheck className="text-green-600" size={24} />
                                <span className="text-xs font-bold uppercase tracking-tight text-gray-600 leading-tight">Authentic Ingredients</span>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center space-x-3">
                                <Star className="text-amber-500" size={24} />
                                <span className="text-xs font-bold uppercase tracking-tight text-gray-600 leading-tight">Chef's Choice</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
