import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, ShoppingBag, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <div className="bg-white min-h-screen text-neutral-dark pt-32 pb-20 px-5">
            <div className="container mx-auto">
                {/* Simple Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-">
                    <div className="space-y-2">
                        <span className="text-accent font-bold tracking-[0.4em] uppercase text-[10px]">Expérience Culinaire</span>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-neutral-dark">Notre Carte</h1>
                        <p className="text-neutral-dark/40 font-medium italic">Un voyage authentique à travers les saveurs du Maroc.</p>
                    </div>

                    {/* Search Bar */}
                    <div className="w-full md:w-80 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text"
                            placeholder="Find a dish..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                        />
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap items-center gap-2 mb-12">
                    <button 
                        onClick={() => setSelectedCategory(null)}
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all
                            ${!selectedCategory ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button 
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all
                                ${selectedCategory === cat.id ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            [...Array(8)].map((_, i) => (
                                <div key={i} className="bg-gray-50 rounded-2xl h-[400px] animate-pulse border border-gray-100"></div>
                            ))
                        ) : products.length > 0 ? (
                            products.map((product) => (
                                <motion.div 
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white  rounded-[10px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
                                >
                                    <div className="h-60 overflow-hidden relative">
                                        <img 
                                            src={product.image ? `http://127.0.0.1:8000/storage/${product.image}` : `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800`} 
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full shadow-sm">
                                            <span className="text-primary font-bold text-sm">${product.price}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 flex-1 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-accent">{product.category?.name || 'Délices'}</p>
                                            <div className="flex text-accent/40"><Star size={10} fill="currentColor" /></div>
                                        </div>
                                        <h3 className="text-xl font-bold text-neutral-dark group-hover:text-primary transition-colors">{product.name}</h3>
                                        <p className="text-neutral-dark/50 text-sm line-clamp-2 leading-relaxed italic">
                                            {product.description}
                                        </p>
                                    </div>

                                    <div className="p-6 pt-0 flex items-center justify-between gap-4 mt-auto">
                                        <Link to={`/product/${product.id}`} className="text-gray-400 hover:text-primary transition-colors">
                                            <ChevronRight size={20} />
                                        </Link>
                                        <button 
                                            onClick={() => addToCart(product)}
                                            className="flex-1 bg-neutral-light hover:bg-primary hover:text-white text-primary text-[10px] font-bold py-4 rounded-xl transition-all uppercase tracking-[0.2em] border border-primary/5 shadow-sm"
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
