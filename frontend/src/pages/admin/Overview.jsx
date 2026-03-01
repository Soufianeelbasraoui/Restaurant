import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { 
    TrendingUp, 
    ShoppingCart, 
    Users, 
    DollarSign, 
    ChevronRight, 
    Clock, 
    Utensils, 
    ArrowUpRight,
    ArrowDownRight,
    Star
} from 'lucide-react';
import { motion } from 'framer-motion';

const Overview = () => {
    const [stats, setStats] = useState({
        total_orders: 0,
        total_revenue: 0,
        pending_orders: 0,
        total_products: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        api.get('/admin/stats').then(res => setStats(res.data));
        api.get('/admin/orders').then(res => setRecentOrders(res.data.data.slice(0, 5)));
    }, []);

    const statCards = [
        { label: 'Total Revenue', value: `$${parseFloat(stats.total_revenue).toLocaleString()}`, icon: <DollarSign size={20} />, trend: '+12.5%', isUp: true },
        { label: 'Orders', value: stats.total_orders, icon: <ShoppingCart size={20} />, trend: '+8.2%', isUp: true },
        { label: 'Customers', value: '428', icon: <Users size={20} />, trend: '+4.1%', isUp: true },
        { label: 'Products', value: stats.total_products, icon: <Utensils size={20} />, trend: 'Stable', isUp: null },
    ];

    return (
        <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={stat.label} 
                        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary">
                                {stat.icon}
                            </div>
                            {stat.isUp !== null && (
                                <div className={`flex items-center space-x-1 ${stat.isUp ? 'text-green-600' : 'text-red-500'} text-[11px] font-bold`}>
                                    {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    <span>{stat.trend}</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Recent Activity Table */}
                <div className="xl:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
                        <button className="text-sm font-bold text-primary hover:underline">View All Orders</button>
                    </div>
                    
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-gray-900">#{order.id}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                    {order.user.name[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{order.user.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-medium">{order.user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border 
                                                    ${order.status === 'completed' ? 'bg-green-50 text-green-600 border-green-100' : 
                                                      order.status === 'pending' ? 'bg-primary/10 text-primary border-primary/20' : 
                                                      'bg-gray-50 text-gray-400 border-gray-100'}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-sm font-bold text-gray-900">${parseFloat(order.total_price).toFixed(2)}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Admin Insights area */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Admin Insights</h3>
                    
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                            <div className="flex items-center space-x-3 text-primary">
                                <Star size={18} className="fill-primary" />
                                <h4 className="text-xs font-bold uppercase tracking-wider">Kitchen Note</h4>
                            </div>
                            <p className="text-sm text-gray-500 font-medium italic leading-relaxed">
                                Revenue is trending well this week. Consider featuring seasonal specials to maintain momentum.
                            </p>
                            <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-600 transition-all uppercase tracking-widest">
                                Full Analytics
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">System Toggles</h4>
                            <div className="space-y-4">
                                {[
                                    { label: 'Accepting Orders', status: true },
                                    { label: 'Table Booking', status: true },
                                    { label: 'Maintenance Mode', status: false }
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                        <span className="text-xs font-bold text-gray-700">{item.label}</span>
                                        <div className={`w-10 h-5 rounded-full relative transition-all cursor-pointer ${item.status ? 'bg-primary' : 'bg-gray-200'}`}>
                                            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${item.status ? 'right-0.5' : 'left-0.5'}`}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
