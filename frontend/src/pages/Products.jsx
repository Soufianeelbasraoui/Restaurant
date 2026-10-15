import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, ShoppingBag, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDishImage } from '../utils/dishImages';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [selectedCategory, searchTerm]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [prodRes, catRes] = await Promise.all([
                api.get('/products', {
                    params: {
                        category_id: selectedCategory,
                        search: searchTerm
                    }
                }),
                api.get('/categories')
            ]);
            setProducts(prodRes.data.data);
            setCategories(catRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#faf7f2] min-h-screen text-neutral-dark pt-32 pb-24 px-6">
            <div className="container mx-auto">
                {/* Image Propre - Hero Banner Culinaire Authentique */}
                <div className="relative w-full h-52 sm:h-64 md:h-72 rounded-[5px] overflow-hidden border border-[#ece4d5] shadow-sm mb-10 group">
                    <img 
                        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&auto=format&fit=crop&q=80" 
                        alt="Maison Beldi - Salle & Ambiance Culinaire Marocaine"
                        className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 md:left-8 text-white space-y-1.5">
                        <span className="inline-block px-3 py-1 bg-primary text-white text-[11px] font-bold uppercase tracking-widest rounded-[5px] shadow-sm">
                            Fait Maison • Épices Rares • Terroir
                        </span>
                        <p className="text-sm md:text-base font-serif italic text-white/95 max-w-xl drop-shadow-sm">
                            « Chaque plat raconte une histoire, chaque épice perpétue notre héritage. »
                        </p>
                    </div>
                </div>

                {/* Clean Human Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6 border-b border-[#ece4d5] pb-8">
                    <div className="space-y-1.5">
                        <span className="text-primary font-semibold tracking-[0.2em] uppercase text-xs">Maison Beldi — La Carte</span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-dark">Nos Spécialités</h1>
                        <p className="text-neutral-dark/65 font-normal text-sm">Plats cuisinés dans le respect des traditions culinaires marocaines.</p>
                    </div>

                    {/* Search Bar with 5px radius */}
                    <div className="w-full md:w-80 relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-dark/40" size={16} />
                        <input 
                            type="text"
                            placeholder="Rechercher un plat, ingrédient..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-8 py-2.5 bg-white border border-[#ece4d5] rounded-[5px] text-xs focus:border-primary outline-none transition-all"
                        />
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-dark/40 hover:text-neutral-dark"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Categories with 5px radius buttons */}
                <div className="flex flex-wrap items-center gap-2 mb-10">
                    <button 
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 rounded-[5px] text-xs font-medium tracking-wide transition-all border
                            ${!selectedCategory ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-neutral-dark/70 border-[#ece4d5] hover:border-primary/40'}`}
                    >
                        Toutes les spécialités
                    </button>
                    {categories.map(cat => (
                        <button 
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-4 py-2 rounded-[5px] text-xs font-medium tracking-wide transition-all border
                                ${selectedCategory === cat.id ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-neutral-dark/70 border-[#ece4d5] hover:border-primary/40'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            [...Array(8)].map((_, i) => (
                                <div key={i} className="bg-white rounded-[5px] h-[360px] animate-pulse border border-[#ece4d5]"></div>
                            ))
                        ) : products.length > 0 ? (
                            products.map((product) => (
                                <motion.div 
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className="bg-white rounded-[5px] overflow-hidden border border-[#ece4d5] shadow-sm hover:shadow-md hover:border-primary/40 transition-all group flex flex-col h-full"
                                >
                                    <div className="h-52 overflow-hidden relative border-b border-[#ece4d5]">
                                        <img 
                                            src={getDishImage(product)} 
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&auto=format&fit=crop&q=80';
                                            }}
                                        />
                                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-[5px] border border-[#ece4d5] shadow-sm">
                                            <span className="text-primary font-bold text-xs">{product.price} MAD</span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-4 flex-1 space-y-2">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-accent">{product.category?.name || 'Spécialité Beldi'}</p>
                                            <div className="flex text-amber-500 items-center gap-0.5 text-xs font-semibold">
                                                <Star size={12} fill="currentColor" />
                                                <span>4.8</span>
                                            </div>
                                        </div>
                                        <h3 className="text-base font-serif font-bold text-neutral-dark group-hover:text-primary transition-colors leading-snug">{product.name}</h3>
                                        <p className="text-neutral-dark/65 text-xs line-clamp-2 leading-relaxed">
                                            {product.description}
                                        </p>
                                    </div>

                                    <div className="p-4 pt-2 border-t border-[#ece4d5]/60 flex items-center justify-between gap-3 mt-auto">
                                        <Link to={`/product/${product.id}`} className="text-xs text-neutral-dark/60 hover:text-primary font-medium">
                                            Détails
                                        </Link>
                                        <button 
                                            onClick={() => addToCart(product)}
                                            className="px-3.5 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-medium rounded-[5px] transition-colors shadow-sm"
                                        >
                                            Ajouter au Panier
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-24 text-center space-y-4">
                                <Search size={48} className="mx-auto text-gray-200" />
                                <h3 className="text-xl font-bold text-gray-400">No dishes found</h3>
                                <button 
                                    onClick={() => {setSearchTerm(''); setSelectedCategory(null);}}
                                    className="text-primary font-bold text-sm hover:underline"
                                >
                                    View full menu
                                </button>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Products;
