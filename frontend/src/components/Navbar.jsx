import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, Menu, X, LogIn } from 'lucide-react';
import CartDrawer from './CartDrawer';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Accueil', path: '/' },
        { name: 'La Carte', path: '/menu' },
        { name: 'Nos Adresses', path: '/locations' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <>
            <nav className={`fixed top-0 w-full z-[60] transition-all duration-300 ${
                isScrolled 
                    ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-[#ece4d5]' 
                    : 'bg-white/80 backdrop-blur-sm py-4 border-b border-[#ece4d5]/60'
            }`}>
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Brand Logo */}
                    <Link to="/" className="flex items-center">
                        <Logo size={32} />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                                    location.pathname === link.path 
                                        ? 'text-primary' 
                                        : 'text-neutral-dark/70 hover:text-primary'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Header Actions - Pure Borderless Icons */}
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        {/* Cart Icon (Strictly Borderless, No Outline, No Box) */}
                        <button 
                            type="button"
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 text-neutral-dark/80 hover:text-primary transition-colors border-0 border-none outline-none focus:outline-none focus:ring-0 shadow-none bg-transparent hover:bg-transparent cursor-pointer"
                            style={{ border: 'none', outline: 'none' }}
                            title="Mon Panier"
                            aria-label="Mon Panier"
                        >
                            <ShoppingCart size={22} className="stroke-[1.8]" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center pointer-events-none">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Login / Profile Icon (Strictly Borderless, No Outline, No Box) */}
                        {user ? (
                            <div className="flex items-center space-x-1">
                                <Link 
                                    to={user.role === 'admin' ? '/admin' : '/dashboard'} 
                                    title={`Mon Compte (${user.name})`}
                                    aria-label="Mon Compte"
                                    className="relative p-2 text-primary transition-colors border-0 border-none outline-none focus:outline-none focus:ring-0 shadow-none bg-transparent hover:bg-transparent flex items-center justify-center cursor-pointer"
                                    style={{ border: 'none', outline: 'none' }}
                                >
                                    <User size={22} className="stroke-[1.8]" />
                                    <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-green-500" title="En ligne"></span>
                                </Link>
                                <button 
                                    type="button"
                                    onClick={logout} 
                                    title="Déconnexion"
                                    aria-label="Déconnexion"
                                    className="p-2 text-neutral-dark/40 hover:text-red-500 transition-colors border-0 border-none outline-none focus:outline-none focus:ring-0 shadow-none bg-transparent hover:bg-transparent cursor-pointer"
                                    style={{ border: 'none', outline: 'none' }}
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <Link 
                                to="/login" 
                                title="Se connecter"
                                aria-label="Se connecter"
                                className="p-2 text-neutral-dark/80 hover:text-primary transition-colors border-0 border-none outline-none focus:outline-none focus:ring-0 shadow-none bg-transparent hover:bg-transparent flex items-center justify-center cursor-pointer"
                                style={{ border: 'none', outline: 'none' }}
                            >
                                <User size={22} className="stroke-[1.8]" />
                            </Link>
                        )}

                        {/* Mobile Toggle */}
                        <button 
                            type="button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-neutral-dark/70 hover:text-neutral-dark border-0 border-none outline-none focus:outline-none bg-transparent cursor-pointer"
                            style={{ border: 'none', outline: 'none' }}
                            title="Menu"
                        >
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[55] bg-white pt-24 px-6 flex flex-col"
                    >
                        <div className="space-y-4">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-xl font-serif font-bold text-neutral-dark hover:text-primary py-2 border-b border-[#ece4d5]/50"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        
                        <div className="mt-auto mb-10 space-y-4 pt-6 border-t border-[#ece4d5]">
                            {user ? (
                                <div className="space-y-3">
                                    <Link 
                                        to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center space-x-3 p-3 bg-[#faf7f2] rounded-[5px] border border-[#ece4d5]"
                                    >
                                        <div className="w-9 h-9 rounded-[4px] bg-primary text-white flex items-center justify-center font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-neutral-dark">{user.name}</p>
                                            <p className="text-[10px] text-primary uppercase font-bold tracking-wider">
                                                {user.role === 'admin' ? 'Espace Administration' : 'Mon Compte Client'}
                                            </p>
                                        </div>
                                    </Link>
                                    <button 
                                        onClick={() => {
                                            logout();
                                            setIsMobileMenuOpen(false);
                                        }} 
                                        className="w-full py-2.5 text-center text-xs text-red-600 font-semibold border border-red-200 rounded-[5px] hover:bg-red-50 transition-colors"
                                    >
                                        Déconnexion
                                    </button>
                                </div>
                            ) : (
                                <Link 
                                    to="/login" 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className="w-full py-3 bg-primary text-white text-center text-xs font-semibold uppercase tracking-wider rounded-[5px] flex items-center justify-center space-x-2 shadow-sm"
                                >
                                    <LogIn size={16} />
                                    <span>Se Connecter / S'inscrire</span>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Navbar;
