import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { 
    Package, 
    User, 
    ChevronRight, 
    Clock, 
    CreditCard, 
    CheckCircle2, 
    XCircle, 
    Truck, 
    Search,
    Filter,
    X,
    MapPin,
    Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/orders');
            setOrders(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/admin/orders/${id}`, { status });
            fetchData();
            if (selectedOrder?.id === id) setSelectedOrder(null);
        } catch (err) {
            console.error(err);
        }
    };

    const filteredOrders = orders.filter(o => 
        o.id.toString().includes(searchTerm) || 
        o.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-20">
            {/* Control Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex-1 w-full relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search orders by ID or customer name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 shadow-none border-gray-100 bg-gray-50/50"
                    />
                </div>
                <div className="flex space-x-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-2.5 bg-gray-50 rounded-xl text-xs font-bold text-gray-500 border border-gray-100 hover:text-gray-900 transition-all uppercase tracking-wider">Active Only</button>
                    <button className="p-2.5 bg-gray-50 rounded-xl text-gray-400 border border-gray-100"><Filter size={18} /></button>
                </div>
            </div>

            {/* Orders List */}
            <div className="grid grid-cols-1 gap-6">
                {loading ? (
                    [...Array(4)].map((_, i) => (
                        <div key={i} className="h-28 bg-white border border-gray-100 rounded-2xl animate-pulse"></div>
                    ))
                ) : filteredOrders.map((order, index) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        key={order.id} 
                        className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className="flex flex-col xl:flex-row items-center justify-between gap-8">
                            {/* Order Info */}
                            <div className="flex items-center space-x-6 w-full xl:w-auto">
                                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 transition-colors flex-shrink-0">
                                    <Package size={24} />
                                </div>
                                <div>
                                    <div className="flex items-center space-x-3 mb-1">
                                        <h3 className="text-lg font-bold text-gray-900">Order #{order.id}</h3>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border 
                                            ${order.status === 'completed' ? 'bg-green-50 text-green-600 border-green-100' : 
                                              order.status === 'pending' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                                              order.status === 'processing' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                              'bg-gray-50 text-gray-400 border-gray-100'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-1.5 text-xs font-medium text-gray-400">
                                            <Clock size={12} /> 
                                            <span>{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                                        <div className="flex items-center space-x-1.5 text-xs font-medium text-gray-400">
                                            <CreditCard size={12} /> 
                                            <span>{order.payment_method}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div className="flex items-center space-x-4 flex-1 w-full xl:max-w-md xl:px-8 xl:border-x border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 font-bold text-xs border border-gray-100">
                                    {order.user.name[0]}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Customer</p>
                                    <p className="text-sm font-bold text-gray-900 truncate">{order.user.name}</p>
                                    <p className="text-[10px] text-gray-400 truncate">{order.address}</p>
                                </div>
                            </div>

                            {/* Amount & Actions */}
                            <div className="flex items-center justify-between xl:justify-end gap-10 w-full xl:w-auto">
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Total</p>
                                    <p className="text-2xl font-bold text-gray-900">${parseFloat(order.total_price).toFixed(2)}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {order.status === 'pending' && (
                                        <button 
                                            onClick={() => updateStatus(order.id, 'processing')}
                                            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-sm"
                                            title="Start Processing"
                                        >
                                            <Truck size={18} />
                                        </button>
                                    )}
                                    {order.status === 'processing' && (
                                        <button 
                                            onClick={() => updateStatus(order.id, 'completed')}
                                            className="p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all shadow-sm"
                                            title="Complete Order"
                                        >
                                            <CheckCircle2 size={18} />
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => setSelectedOrder(order)}
                                        className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-gray-900 transition-all"
                                        title="View Details"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Detailed Order Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-end">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm" />
                        <motion.div 
                            initial={{ x: '100%' }} 
                            animate={{ x: 0 }} 
                            exit={{ x: '100%' }} 
                            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                            className="relative w-full max-w-xl h-screen bg-white shadow-2xl p-10 overflow-y-auto"
                        >
                            <div className="flex justify-between items-center pb-8 border-b border-gray-100 mb-10">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Manifest for Order #{selectedOrder.id}</p>
                                </div>
                                <button onClick={() => setSelectedOrder(null)} className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 rounded-full"><X size={20} /></button>
                            </div>

                            <div className="space-y-10">
                                {/* Customer Info */}
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
                                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Customer Information</h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Name</p>
                                            <p className="text-sm font-bold text-gray-900">{selectedOrder.user.name}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Phone</p>
                                            <div className="flex items-center space-x-2 text-sm font-medium text-gray-600">
                                                <Phone size={14} className="text-gray-400" />
                                                <span>{selectedOrder.phone || 'N/A'}</span>
                                            </div>
                                        </div>
                                        <div className="col-span-2 space-y-1">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Delivery Address</p>
                                            <div className="flex items-start space-x-2 text-sm font-medium text-gray-600">
                                                <MapPin size={14} className="text-gray-400 mt-1 flex-shrink-0" />
                                                <span>{selectedOrder.address}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="space-y-4">
                                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Items</h3>
                                    <div className="space-y-3">
                                        {selectedOrder.items?.map((item, i) => (
                                            <div key={i} className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-xl">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xs">{item.quantity}x</div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">{item.product.name}</p>
                                                        <p className="text-[10px] text-gray-400 font-medium">${item.price} each</p>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">${(item.quantity * item.price).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="pt-8 border-t border-gray-100 flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                                        <h4 className="text-4xl font-bold text-gray-900">Total</h4>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-4xl font-bold text-blue-600">${parseFloat(selectedOrder.total_price).toFixed(2)}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Tax & service included</p>
                                    </div>
                                </div>

                                {/* Status Actions */}
                                <div className="pt-10 flex gap-4">
                                    <button 
                                        onClick={() => updateStatus(selectedOrder.id, 'cancelled')}
                                        className="flex-1 py-3.5 border border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:text-red-600 hover:border-red-100 hover:bg-red-50 transition-all uppercase tracking-widest"
                                    >
                                        Cancel Order
                                    </button>
                                    <button 
                                        onClick={() => updateStatus(selectedOrder.id, 'completed')}
                                        disabled={selectedOrder.status === 'completed'}
                                        className="flex-1 btn-primary !py-3.5 text-xs font-bold uppercase tracking-widest disabled:opacity-50"
                                    >
                                        Complete Service
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageOrders;
