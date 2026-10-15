import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, MapPin, Phone, Mail, Instagram, Twitter, Facebook } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="bg-[#f5efe4] border-t border-[#ece4d5] pt-16 pb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-pattern pointer-events-none opacity-[0.03]"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link to="/" className="inline-block">
                            <Logo size={30} />
                        </Link>
                        <p className="text-neutral-dark/70 text-sm leading-relaxed max-w-xs font-normal">
                            Une immersion sensorielle au cœur du Maroc. Cuisine de terroir authentique, ingrédients frais et hospitalité beldi sincère.
                        </p>
                        <div className="flex items-center space-x-3">
                            <a href="#" className="p-2.5 bg-white border border-[#ece4d5] rounded-[5px] text-neutral-dark/60 hover:text-primary hover:border-primary/40 transition-all shadow-sm"><Instagram size={17} /></a>
                            <a href="#" className="p-2.5 bg-white border border-[#ece4d5] rounded-[5px] text-neutral-dark/60 hover:text-primary hover:border-primary/40 transition-all shadow-sm"><Twitter size={17} /></a>
                            <a href="#" className="p-2.5 bg-white border border-[#ece4d5] rounded-[5px] text-neutral-dark/60 hover:text-primary hover:border-primary/40 transition-all shadow-sm"><Facebook size={17} /></a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Découvrir</h4>
                        <ul className="space-y-3">
                            {['Menu', 'Locations', 'About Us', 'Contact'].map(item => (
                                <li key={item}>
                                    <Link to={`/${item.toLowerCase().replace(' ', '')}`} className="text-sm text-neutral-dark/60 hover:text-primary transition-colors font-medium">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin size={18} className="text-primary mt-0.5" />
                                <span className="text-sm text-gray-500">123 Street Name, <br/>City, State 10001</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={18} className="text-primary" />
                                <span className="text-sm text-gray-500">(123) 456-7890</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={18} className="text-primary" />
                                <span className="text-sm text-gray-500">hello@restaurant.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">Opening Hours</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">MON - FRI</span>
                                <span className="text-gray-900 font-medium">10:00 - 22:00</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">SAT - SUN</span>
                                <span className="text-gray-900 font-medium">09:00 - 23:00</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-[#ece4d5] flex flex-col md:flex-row items-center justify-between gap-4 relative">
                    <p className="text-[11px] text-neutral-dark/60 font-medium tracking-wide">© {new Date().getFullYear()} MAISON BELDI GROUP — Tous droits réservés</p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-[11px] text-neutral-dark/60 hover:text-primary transition-colors font-medium">Confidentialité</a>
                        <a href="#" className="text-[11px] text-neutral-dark/60 hover:text-primary transition-colors font-medium">Conditions Générales</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
