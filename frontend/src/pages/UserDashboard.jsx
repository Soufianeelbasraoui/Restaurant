import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    User, 
    Package, 
    Heart, 
    Settings as SettingsIcon, 
    LogOut, 
    ChevronRight, 
    Clock, 
    Mail,
    Trash2,
    Save,
    RotateCcw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchData();
        const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(savedFavorites);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get('/orders');
            setOrders(res.data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = (id) => {
        const newFavs = favorites.filter(f => f.id !== id);
        setFavorites(newFavs);
        localStorage.setItem('favorites', JSON.stringify(newFavs));
    };

    const sidebarItems = [
        { path: 'profile', label: 'My Profile', icon: <User size={18} /> },
        { path: 'orders', label: 'Order History', icon: <Package size={18} /> },
        { path: 'favorites', label: 'Favorites', icon: <Heart size={18} /> },
        { path: 'settings', label: 'Settings', icon: <SettingsIcon size={18} /> },
    ];

    const isActive = (path) => {
        const fullPath = `/dashboard/${path}`;
        const currentPath = location.pathname;
        return currentPath === fullPath || (path === 'profile' && currentPath === '/dashboard');
    };

    // --- Sub-pages ---

    const Profile = () => (
        <div className="space-y-8 mt-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-3xl font-bold text-gray-900">Hello, {user?.name}!</h2>
                <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                    Member Account
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Account Details */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                    <h3 className="text-xl font-bold">Account Details</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                            <Mail className="text-gray-400" size={20} />
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</p>
                                <p className="font-medium">{user?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                            <Clock className="text-gray-400" size={20} />
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Joined</p>
                                <p className="font-medium">October 2024</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Order Summary */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">Recent Order</h3>
                        <Link to="/dashboard/orders" className="text-xs font-bold text-primary hover:underline uppercase">View All</Link>
                    </div>
                    {orders.length > 0 ? (
                        <div className="p-6 bg-gray-50 rounded-xl space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-gray-900">Order #{orders[0].id}</span>
                                <span className="text-[10px] font-bold uppercase px-2 py-1 bg-white rounded-md border border-gray-100">{orders[0].status}</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Total</p>
                                    <p className="text-2xl font-bold text-gray-900">${orders[0].total_price}</p>
                                </div>
                                <Link to="/dashboard/orders" className="p-3 bg-white hover:bg-primary hover:text-white rounded-xl shadow-sm transition-all">
                                    <ChevronRight size={20} />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-6 text-gray-400 italic">No orders yet.</div>
                    )}
                </div>
            </div>
        </div>
    );

    const Orders = () => (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Order History</h2>
            {loading ? (
                <div className="py-20 text-center text-gray-400 italic">Loading your history...</div>
            ) : orders.length > 0 ? (
                <div className="space-y-4">
                    {orders.map(order => (
                        <div key={order.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-6">
                                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                    <Package size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Order #{order.id}</h4>
                                    <p className="text-sm text-gray-400">{new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-10">
                                <div className="text-right">
                                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Total</p>
                                    <p className="font-bold text-lg">${order.total_price}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Status</p>
                                    <span className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border 
                                        ${order.status === 'completed' ? 'bg-green-50 text-green-600 border-green-100' : 
                                          order.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                                          'bg-gray-50 text-gray-400 border-gray-100'}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <button className="p-3 bg-gray-50 hover:bg-primary hover:text-white rounded-xl transition-all">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-40 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 font-medium italic">You haven't ordered anything yet.</p>
                    <Link to="/menu" className="btn-primary mt-6 inline-block">Order Now</Link>
                </div>
            )}
        </div>
    );

    const FavoritesGallery = () => (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Your Favorites</h2>
            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favorites.map((product) => (
                        <motion.div layout key={product.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                            <div className="relative h-48">
                                <img 
                                    src={product.image ? `http://127.0.0.1:8000/storage/${product.image}` : `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400`} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <button 
                                    onClick={() => removeFavorite(product.id)}
                                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="p-5 flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-gray-900">{product.name}</h4>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{product.category}</p>
                                </div>
                                <Link to={`/product/${product.id}`} className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:text-primary transition-colors">
                                    <ChevronRight size={18} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="py-40 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 font-medium italic">No favorites yet.</p>
                    <Link to="/menu" className="btn-primary mt-6 inline-block">Browse Menu</Link>
                </div>
            )}
        </div>
    );

    const Settings = () => (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Account Settings</h2>
            <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                        <input type="text" defaultValue={user?.name} className="w-full" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                        <input type="email" defaultValue={user?.email} className="w-full" />
                    </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-gray-50">
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Default Notifications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            'Order updates via email',
                            'Promotional offers',
                            'New menu alerts',
                            'Account activity alerts'
                        ].map((label, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-transparent hover:border-gray-100 transition-colors">
                                <span className="text-sm font-medium text-gray-700">{label}</span>
                                <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 btn-primary !py-4 flex items-center justify-center space-x-2">
                        <Save size={18} />
                        <span>Save Changes</span>
                    </button>
                    <button className="flex-1 btn-outline !py-4 flex items-center justify-center space-x-2">
                        <RotateCcw size={18} />
                        <span>Reset Form</span>
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen text-neutral-dark pt-32 pb-20 px-6">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-72 space-y-8">
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-8">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                    <User size={40} />
                                </div>
                                <div className="text-center">
                                    <p className="font-bold text-gray-900 text-lg">{user?.name}</p>
                                    <p className="text-[10px] font-extrabold text-primary uppercase tracking-[0.2em]">Verified Member</p>
                                </div>
                            </div>
                            
                            <nav className="space-y-1">
                                {sidebarItems.map(item => (
                                    <Link 
                                        key={item.path}
                                        to={`/dashboard/${item.path}`}
                                        className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all
                                            ${isActive(item.path) 
                                                ? 'bg-primary text-white font-bold shadow-md shadow-primary/20' 
                                                : 'text-gray-500 hover:bg-gray-50 hover:text-primary'}`}
                                    >
                                        {item.icon}
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </Link>
                                ))}
                                <button 
                                    onClick={logout}
                                    className="flex items-center space-x-4 px-4 py-3 w-full rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all mt-4"
                                >
                                    <LogOut size={18} />
                                    <span className="text-sm font-medium">Sign Out</span>
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Routes>
                                    <Route index element={<Profile />} />
                                    <Route path="profile" element={<Profile />} />
                                    <Route path="orders" element={<Orders />} />
                                    <Route path="favorites" element={<FavoritesGallery />} />
                                    <Route path="settings" element={<Settings />} />
                                </Routes>
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
