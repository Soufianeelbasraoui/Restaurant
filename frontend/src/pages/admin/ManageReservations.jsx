import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Trash2, Mail, Loader2, Calendar, Eye, X } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedReservation, setSelectedReservation] = useState(null);

    const fetchReservations = async () => {
        try {
            const res = await api.get('/admin/reservations');
            setReservations(res.data);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Voulez-vous vraiment supprimer cette réservation ?')) return;

        try {
            await api.delete(`/admin/reservations/${id}`);
            setReservations(reservations.filter(res => res.id !== id));
            toast.success("Réservation supprimée avec succès");
        } catch (error) {
            console.error("Error deleting reservation:", error);
            toast.error("Erreur lors de la suppression");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Réservations & Contacts</h2>
                    <p className="text-gray-500 mt-1">Gérez les demandes de réservation et les messages.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100 text-left">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Client</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Sujet</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Message</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {reservations.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <CalendarDays size={48} className="text-gray-300" />
                                            <p className="text-lg font-medium">Aucune réservation pour le moment</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                reservations.map((reservation) => (
                                    <motion.tr 
                                        key={reservation.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-gray-50/50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900">{reservation.name}</span>
                                                <div className="flex items-center text-gray-500 text-xs mt-1">
                                                    <Mail size={12} className="mr-1" />
                                                    {reservation.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                ${reservation.subject === 'Table Reservation' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {reservation.subject}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-600 truncate max-w-xs" title={reservation.message}>
                                                {reservation.message}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar size={14} className="mr-1.5" />
                                                {new Date(reservation.created_at).toLocaleDateString('fr-FR', {
                                                    day: '2-digit', month: 'short', year: 'numeric',
                                                    hour: '2-digit', minute:'2-digit'
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button 
                                                    onClick={() => setSelectedReservation(reservation)}
                                                    className="text-gray-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Voir détail"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(reservation.id)}
                                                    className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Supprimer"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* View Reservation Modal */}
            <AnimatePresence>
                {selectedReservation && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
                        onClick={() => setSelectedReservation(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-gray-50">
                                <h3 className="text-xl font-bold text-gray-900">Détails de la réservation</h3>
                                <button 
                                    onClick={() => setSelectedReservation(null)}
                                    className="p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="p-6 space-y-6">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Client</p>
                                    <p className="text-gray-900 font-bold">{selectedReservation.name}</p>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <Mail size={14} className="mr-2" />
                                        <a href={`mailto:${selectedReservation.email}`} className="hover:text-blue-600 transition-colors">
                                            {selectedReservation.email}
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sujet</p>
                                        <p className="text-sm font-bold text-gray-900">{selectedReservation.subject}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date de demande</p>
                                        <div className="flex items-center text-sm text-gray-900 font-bold">
                                            <Calendar size={14} className="mr-1.5 text-gray-400" />
                                            {new Date(selectedReservation.created_at).toLocaleDateString('fr-FR', {
                                                day: '2-digit', month: 'short', year: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Message Complet</p>
                                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                            {selectedReservation.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6 border-t border-gray-50 bg-gray-50 flex justify-end gap-3">
                                <button 
                                    onClick={() => setSelectedReservation(null)}
                                    className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm"
                                >
                                    Fermer
                                </button>
                                <a 
                                    href={`mailto:${selectedReservation.email}`}
                                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-sm flex items-center"
                                >
                                    <Mail size={16} className="mr-2"/>
                                    Répondre
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageReservations;
