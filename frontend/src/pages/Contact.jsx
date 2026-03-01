import React, { useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { 
    Mail, 
    Phone, 
    MapPin, 
    MessageSquare, 
    Send, 
    Clock, 
    ShieldCheck, 
    Globe, 
    ChevronRight 
} from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'Table Reservation',
        message: ''
    });
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus(null);
        try {
            await api.post('/reservations', formData);
            setStatus({ type: 'success', message: 'Votre demande a été envoyée avec succès !' });
            setFormData({ name: '', email: '', subject: 'Table Reservation', message: '' });
        } catch (error) {
            setStatus({ type: 'error', message: 'Une erreur est survenue lors de l\'envoi.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen pb-32 text-neutral-dark pt-32 px-6">
            {/* Moroccan Header */}
            <section className="container mx-auto text-center mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <span className="text-primary font-bold uppercase tracking-[0.4em] text-xs">Nous contacter</span>
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-neutral-dark leading-tight">
                        Bienvenue chez <span className="text-primary italic">Dar Essalam</span>
                    </h1>
                    <p className="text-neutral-dark/60 max-w-xl mx-auto font-medium">
                        Une question, une réservation ou simplement envie de nous saluer ? 
                        Notre équipe est à votre écoute pour rendre votre expérience inoubliable.
                    </p>
                </motion.div>
            </section>

            <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Contact Information */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="space-y-8">
                        <h2 className="text-3xl font-serif font-bold text-neutral-dark">Contact Direct</h2>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-primary flex-shrink-0">
                                    <Mail size={22} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email Us</p>
                                    <p className="text-lg font-semibold text-gray-900">hello@latelier-restaurant.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-primary flex-shrink-0">
                                    <Phone size={22} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Call Us</p>
                                    <p className="text-lg font-semibold text-gray-900">(123) 456-7890</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-primary flex-shrink-0">
                                    <MapPin size={22} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Visit Us</p>
                                    <p className="text-lg font-semibold text-gray-900">123 Culinary Drive, Foodville, NY 10001</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Average Response Time</p>
                            <p className="text-lg font-bold text-gray-900 italic">Under 2 hours</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Clock size={20} />
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl p-10 lg:p-12 border border-gray-100 shadow-sm space-y-8"
                >
                    <h2 className="text-3xl font-bold text-gray-900">Send a Message</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {status && (
                            <div className={`p-4 rounded-xl text-sm font-bold ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                {status.message}
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Your Name</label>
                                <input 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe" 
                                    className="w-full border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                                <input 
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com" 
                                    className="w-full border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Subject</label>
                            <select 
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            >
                                <option value="Table Reservation">Table Reservation</option>
                                <option value="General Inquiry">General Inquiry</option>
                                <option value="Feedback">Feedback</option>
                                <option value="Business Cooperation">Business Cooperation</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Your Message</label>
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5" 
                                placeholder="How can we help you?" 
                                className="w-full resize-none border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                                required
                            />
                        </div>

                        <button 
                            disabled={isLoading}
                            className={`w-full btn-primary !py-4 flex items-center justify-center space-x-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <Send size={20} />
                            <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
                        </button>
                    </form>
                </motion.div>
            </section>
        </div>
    );
};

export default Contact;
