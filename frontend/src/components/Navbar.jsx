import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, Utensils, Menu, X, LogIn } from 'lucide-react';
import CartDrawer from './CartDrawer';
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
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'Locations', path: '/locations' },
        { name: 'Contact', path: '/Contact' }
    ];

    return (
        <>
            <nav className={`fixed top-0 w-full z-[60] transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'}`}>
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <Utensils size={24} className="text-primary" />
                        <span className="text-2xl font-serif font-bold tracking-tight text-neutral-dark">
                            Marocco Food
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                className={`text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-5">
                        <button 
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 text-gray-600 hover:text-primary transition-colors"
                        >
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <div className="hidden md:flex items-center space-x-4">
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <Link to={user.role === 'admin' ? '/admin' : '/dashboard/profile'} className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-primary">
                                        <User size={18} />
                                        <span>{user.name.split(' ')[0]}</span>
                                    </Link>
                                    <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors">
                                        <LogOut size={18} />
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" className="btn-primary py-2 px-6 text-sm flex items-center space-x-2">
                                    <LogIn size={16} />
                                    <span>Sign In</span>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Toggle */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-gray-600"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[55] bg-white pt-24 px-6 flex flex-col"
                    >
                        <div className="space-y-6">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-2xl font-bold text-gray-800 hover:text-primary"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        
                        <div className="mt-auto mb-12 space-y-4 pt-6 border-t border-gray-100">
                            {user ? (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                            <User size={20} className="text-gray-500" />
                                        </div>
                                        <span className="font-bold">{user.name}</span>
                                    </div>
                                    <button onClick={logout} className="text-red-500 font-medium">Logout</button>
                                </div>
                            ) : (
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full text-center flex items-center justify-center space-x-2">
                                    <LogIn size={20} />
                                    <span>Login</span>
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
