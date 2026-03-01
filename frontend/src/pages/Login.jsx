import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight, Utensils, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // Forgot Password State
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotLoading, setForgotLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login(credentials);
            if (response.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard/profile');
            }
        } catch (err) {
            console.error(err);
            alert("Login failed. Please check your email and password.");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        if (!forgotEmail) {
            toast.error("Veuillez entrer votre adresse e-mail");
            return;
        }
        
        setForgotLoading(true);
        // Simulate an API call
        setTimeout(() => {
            setForgotLoading(false);
            setShowForgotModal(false);
            toast.success(`Un lien de réinitialisation a été envoyé à ${forgotEmail}`);
            setForgotEmail('');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 pt-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm space-y-8">
                    <div className="text-center space-y-2">
                        <Link to="/" className="inline-flex items-center space-x-2 text-primary mb-4">
                            <Utensils size={32} />
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                        <p className="text-gray-500 font-medium italic">Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                    <input 
                                        required
                                        type="email" 
                                        placeholder="john@example.com"
                                        value={credentials.email}
                                        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                                        className="w-full pl-12"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
                                    <button type="button" onClick={() => setShowForgotModal(true)} className="text-[11px] font-bold text-primary hover:underline">Forgot?</button>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                    <input 
                                        required
                                        type="password" 
                                        placeholder="••••••••"
                                        value={credentials.password}
                                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                        className="w-full pl-12"
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full btn-primary !py-4 flex items-center justify-center space-x-3 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-500 font-medium">
                            Don't have an account? {' '}
                            <Link to="/register" className="text-primary font-bold hover:underline">Rejoindre Dar Essalam</Link>
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Forgot Password Modal */}
            <AnimatePresence>
                {showForgotModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
                        onClick={() => setShowForgotModal(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-8 shadow-xl w-full max-w-sm border border-gray-100 relative"
                        >
                            <button 
                                onClick={() => setShowForgotModal(false)}
                                className="absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all"
                            >
                                <X size={20} />
                            </button>

                            <div className="text-center space-y-2 mb-8 mt-2">
                                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Lock size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Mot de passe oublié ?</h3>
                                <p className="text-sm font-medium text-gray-500 italic">
                                    Entrez votre adresse e-mail et nous vous enverrons un lien pour le réinitialiser.
                                </p>
                            </div>

                            <form onSubmit={handleForgotPassword} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Adresse E-mail</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                        <input 
                                            required
                                            type="email" 
                                            placeholder="john@example.com"
                                            value={forgotEmail}
                                            onChange={(e) => setForgotEmail(e.target.value)}
                                            className="w-full pl-12 bg-gray-50/50"
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={forgotLoading}
                                    className="w-full btn-primary !py-3.5 flex items-center justify-center space-x-2 disabled:opacity-50"
                                >
                                    {forgotLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <span className="font-bold text-sm">Envoyer le lien</span>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Login;
