import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { 
    BarChart3, 
    TrendingUp, 
    Users, 
    DollarSign, 
    Calendar, 
    ArrowUpRight,
    Search,
    Filter,
    Download,
    PieChart,
    LineChart as LineChartIcon,
    Star,
    ShoppingCart
} from 'lucide-react';
import { motion } from 'framer-motion';

const Analytics = () => {
    const [data, setData] = useState({
        metrics: { revenue: 0, orders: 0, customers: 0, reservations: 0 },
        chart: Array(12).fill(0),
        categories: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await api.get('/admin/analytics');
                setData(res.data.data);
            } catch (err) {
                console.error('Failed to load analytics', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    const metrics = [
        { label: 'Total Revenue', value: `$${parseFloat(data.metrics.revenue).toFixed(2)}`, trend: '+12%', icon: <DollarSign size={18} /> },
        { label: 'Total Orders', value: data.metrics.orders, trend: '+5%', icon: <ShoppingCart size={18} /> },
        { label: 'Total Customers', value: data.metrics.customers, trend: '+8%', icon: <Users size={18} /> },
        { label: 'Total Reservations', value: data.metrics.reservations, trend: '+2%', icon: <Calendar size={18} /> },
    ];

    return (
        <div className="space-y-10 pb-20">
            {/* Header Control */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-gray-900">Business Analytics</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Performance insights and metrics</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="bg-gray-50 p-1 rounded-xl flex border border-gray-100">
                        <button className="px-4 py-2 bg-white text-gray-900 text-[11px] font-bold tracking-wider uppercase rounded-lg shadow-sm">Monthly</button>
                        <button className="px-4 py-2 text-gray-400 text-[11px] font-bold tracking-wider uppercase rounded-lg hover:text-gray-900 transition-all">Yearly</button>
                    </div>
                    <button className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:text-gray-900 border border-gray-100 transition-all"><Download size={18} /></button>
                </div>
            </div>

            {/* Metric Grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={m.label} 
                        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                {m.icon}
                            </div>
                            <span className={`text-[11px] font-bold ${m.trend.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                                {m.trend}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{m.value}</h3>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{m.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Visual Intelligence Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Chart Placeholder */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-900">Monthly Revenue</h3>
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Chart View</p>
                    </div>
                    
                    <div className="h-64 flex items-end justify-between gap-2 px-2">
                        {data.chart && data.chart.length > 0 ? (() => {
                            const numericData = data.chart.map(Number);
                            const maxVal = Math.max(...numericData, 1);
                            
                            return data.chart.map((h, i) => {
                                const hNum = Number(h);
                                const heightPercent = maxVal === 0 ? 0 : (hNum / maxVal) * 85; // 85% to leave room for the label below and tooltip above
                                
                                return (
                                    <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                                        <div className="absolute -top-2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                            ${hNum.toFixed(0)}
                                        </div>
                                        <motion.div 
                                            initial={{ height: 0 }}
                                            animate={{ height: `${heightPercent}%`, minHeight: hNum > 0 ? '4px' : '0px' }}
                                            transition={{ delay: i * 0.05, duration: 1 }}
                                            className={`w-full rounded-t-lg transition-all ${i === new Date().getMonth() ? 'bg-blue-600' : 'bg-gray-100 hover:bg-blue-200'}`}
                                        />
                                        <span className={`text-[9px] font-bold mt-2 h-4 uppercase ${i === new Date().getMonth() ? 'text-blue-600' : 'text-gray-400'}`}>
                                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                                        </span>
                                    </div>
                                );
                            });
                        })() : (
                            <p className="text-sm text-gray-400 text-center w-full py-4">No revenue data available.</p>
                        )}
                    </div>
                </div>

                {/* Category Performance */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-900">Category Performance</h3>
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Sales Ratio</p>
                    </div>

                    <div className="space-y-6 pt-2">
                        {data.categories.length > 0 ? data.categories.map((item, index) => {
                            const colors = ['bg-blue-600', 'bg-blue-400', 'bg-blue-200', 'bg-gray-100'];
                            return (
                                <div key={item.label} className="space-y-2 group">
                                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                                        <span className="text-gray-500">{item.label}</span>
                                        <span className="text-gray-900">{item.val}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.val}%` }}
                                            transition={{ duration: 1 }}
                                            className={`h-full ${colors[index % colors.length]} rounded-full`}
                                        />
                                    </div>
                                </div>
                            );
                        }) : (
                            <p className="text-sm text-gray-400 text-center py-4">No category data available</p>
                        )}
                    </div>

                    {data.categories.length > 0 && (
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <p className="text-sm text-blue-700 font-medium italic leading-relaxed">
                                "Sales are showing strong performance in '{data.categories[0]?.label}'. Recommend expanding this selection."
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Analytics;
