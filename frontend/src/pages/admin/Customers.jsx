import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { 
    Users, 
    Star, 
    Search, 
    Filter, 
    Mail, 
    Phone, 
    MapPin, 
    MoreVertical, 
    ChevronRight,
    Award,
    ShieldCheck,
    X,
    User,
    Trash2,
    Eye,
    Calendar,
    ShoppingCart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Customers = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/customers');
            setClients(res.data.data);
        } catch (err) {
            console.error('Failed to fetch customers:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCustomer = async (id) => {
        if (!window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;

        try {
            await api.delete(`/admin/customers/${id}`);
            setClients(clients.filter(c => c.id !== id));
            toast.success('Customer deleted successfully');
        } catch (error) {
            console.error("Error deleting customer:", error);
            toast.error('Failed to delete customer');
        }
    };

    const [searchTerm, setSearchTerm] = useState('');

    const filteredClients = clients.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-20">
            {/* Control Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex-1 w-full relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search customers by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 shadow-none border-gray-100 bg-gray-50/50"
                    />
                </div>
                <div className="flex space-x-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-blue-700 transition-all">Add Customer</button>
                    <button className="p-2.5 bg-gray-50 rounded-xl text-gray-400 border border-gray-100"><Filter size={18} /></button>
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100 text-left">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Orders</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total Spent</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-3/4"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-1/2"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-1/4"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-1/4"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-1/2"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-8 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : filteredClients.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <Users size={48} className="text-gray-300" />
                                            <p className="text-lg font-medium">No customers found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredClients.map((client) => (
                                    <motion.tr 
                                        key={client.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-gray-50/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4 border-b border-gray-50">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                                                    {client.name[0]}
                                                </div>
                                                <div>
                                                    <span className="font-bold text-gray-900 block">{client.name}</span>
                                                    <div className="flex items-center text-gray-500 text-xs mt-0.5">
                                                        <Mail size={12} className="mr-1" />
                                                        {client.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-50">
                                            <div className="flex items-center space-x-1 text-green-600">
                                                <ShieldCheck size={14} />
                                                <span className="text-[10px] font-bold tracking-widest uppercase">Verified</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-50">
                                            <span className="text-sm font-bold text-gray-900">{client.orders_count}</span>
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-50">
                                            <span className="text-sm font-bold text-gray-900">${parseFloat(client.orders_sum_total_price || 0).toFixed(2)}</span>
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-50">
                                            <div className="flex items-center text-sm text-gray-500">
                                                {new Date(client.created_at).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-50 text-right">
                                            <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => setSelectedClient(client)} className="text-gray-400 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View Details">
                                                    <Eye size={16} />
                                                </button>
                                                <a href={`mailto:${client.email}`} className="text-gray-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors inline-block" title="Contact">
                                                    <Mail size={16} />
                                                </a>
                                                <button onClick={() => handleDeleteCustomer(client.id)} className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                                    <Trash2 size={16} />
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
            
            {/* Pagination Placeholder */}
            {filteredClients.length > 0 && (
                <div className="py-6 flex items-center justify-between text-sm text-gray-500">
                    <p>Showing <span className="font-bold text-gray-900">{filteredClients.length}</span> customers</p>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">Previous</button>
                        <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">Next</button>
                    </div>
                </div>
            )}
            
            {/* View Customer Modal */}
            <AnimatePresence>
                {selectedClient && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
                        onClick={() => setSelectedClient(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-gray-50">
                                <h3 className="text-xl font-bold text-gray-900">Détails du Client</h3>
                                <button 
                                    onClick={() => setSelectedClient(null)}
                                    className="p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="p-6 space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-2xl">
                                        {selectedClient.name[0]}
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-gray-900">{selectedClient.name}</p>
                                        <div className="flex items-center text-sm text-gray-500 mt-1">
                                            <Mail size={14} className="mr-2" />
                                            <a href={`mailto:${selectedClient.email}`} className="hover:text-blue-600 transition-colors">
                                                {selectedClient.email}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Dépensé</p>
                                            <div className="p-1.5 bg-green-100 text-green-600 rounded-lg">
                                                <Award size={14} />
                                            </div>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">
                                            ${parseFloat(selectedClient.orders_sum_total_price || 0).toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Commandes</p>
                                            <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                                                <ShoppingCart size={14} />
                                            </div>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {selectedClient.orders_count}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-sm text-gray-500">
                                    <div className="flex items-center text-green-600">
                                        <ShieldCheck size={16} className="mr-1.5" />
                                        <span className="font-medium text-xs uppercase tracking-wider">Compte Vérifié</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar size={14} className="mr-1.5" />
                                        <span>Inscrit le {new Date(selectedClient.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6 border-t border-gray-50 bg-gray-50 flex justify-end gap-3">
                                <button 
                                    onClick={() => setSelectedClient(null)}
                                    className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm"
                                >
                                    Fermer
                                </button>
                                <a 
                                    href={`mailto:${selectedClient.email}`}
                                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-sm flex items-center"
                                >
                                    <Mail size={16} className="mr-2"/>
                                    Contacter
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Customers;
