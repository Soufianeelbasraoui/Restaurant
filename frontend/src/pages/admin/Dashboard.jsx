import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { 
    LayoutDashboard, 
    ShoppingBag, 
    ShoppingCart, 
    Users, 
    Settings as SettingsIcon, 
    BarChart3, 
    LogOut,
    Menu,
    X,
    ChevronRight,
    Search,
    Bell,
    UserCircle,
    CalendarDays,
    Utensils
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Sub-components
import Overview from './Overview';
import ManageProducts from './ManageProducts';
import ManageCategories from './ManageCategories';
import ManageOrders from './ManageOrders';
import Analytics from './Analytics';
import Customers from './Customers';
import SettingsPage from './Settings';
import ManageReservations from './ManageReservations';

const AdminDashboard = () => {
    const location = useLocation();
    const { logout, user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    // Dynamic Header State
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const searchRef = useRef(null);

    const [notifications, setNotifications] = useState({ orders: [], reservations: [], users: [] });
    const [localUnreadCount, setLocalUnreadCount] = useState(0);
    const [showNotifications, setShowNotifications] = useState(false);
    const notifRef = useRef(null);
    
    // Tracking seen IDs for toasts
    const seenIds = useRef({ orders: new Set(), reservations: new Set(), users: new Set() });
    const isFirstLoad = useRef(true);

    // Initial load & Click outside handlers
    useEffect(() => {
        fetchNotifications();
        
        const interval = setInterval(() => {
            fetchNotifications();
        }, 10000); // Poll every 10 seconds
        
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) setShowSearchDropdown(false);
            if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotifications(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            clearInterval(interval);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await api.get('/admin/notifications');
            const data = res.data.data;
            
            if (!isFirstLoad.current) {
                let newCount = 0;
                // Check for new orders
                data.orders.forEach(o => {
                    if (!seenIds.current.orders.has(o.id)) {
                        toast.success(`New Order #${o.id} received!`);
                        newCount++;
                    }
                });
                // Check for new reservations
                data.reservations.forEach(r => {
                    if (!seenIds.current.reservations.has(r.id)) {
                        toast.success(`New Reservation from ${r.name}!`);
                        newCount++;
                    }
                });
                // Check for new users
                data.users.forEach(u => {
                    if (!seenIds.current.users.has(u.id)) {
                        toast.success(`New User Registered: ${u.name}!`);
                        newCount++;
                    }
                });
                
                if (newCount > 0) {
                    setLocalUnreadCount(prev => prev + newCount);
                }
            } else {
                const lastSeenTimestamp = localStorage.getItem('admin_notifications_last_seen') || 0;
                let initialUnreadCount = 0;
                const countNew = (item) => new Date(item.created_at).getTime() > Number(lastSeenTimestamp) ? 1 : 0;
                
                data.orders.forEach(o => { initialUnreadCount += countNew(o); });
                data.reservations.forEach(r => { initialUnreadCount += countNew(r); });
                data.users.forEach(u => { initialUnreadCount += countNew(u); });
                
                setLocalUnreadCount(initialUnreadCount);
            }

            // Update seen IDs
            data.orders.forEach(o => seenIds.current.orders.add(o.id));
            data.reservations.forEach(r => seenIds.current.reservations.add(r.id));
            data.users.forEach(u => seenIds.current.users.add(u.id));
            
            setNotifications(data);
            isFirstLoad.current = false;
        } catch (err) { console.error('Error fetching notifications:', err); }
    };

    const handleOpenNotifications = () => {
        const isOpen = !showNotifications;
        setShowNotifications(isOpen);
        if (isOpen) {
            setLocalUnreadCount(0);
            localStorage.setItem('admin_notifications_last_seen', Date.now().toString());
        }
    };

    // Debounced Search
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults(null);
            return;
        }
        const delay = setTimeout(async () => {
            setIsSearching(true);
            try {
                const res = await api.get(`/admin/search?q=${searchQuery}`);
                setSearchResults(res.data.data);
                setShowSearchDropdown(true);
            } catch (err) { console.error(err); }
            finally { setIsSearching(false); }
        }, 300);
        return () => clearTimeout(delay);
    }, [searchQuery]);

    const menuItems = [
        { path: '', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { path: 'products', label: 'Products', icon: <ShoppingBag size={18} /> },
        { path: 'categories', label: 'Categories', icon: <Utensils size={18} /> },
        { path: 'orders', label: 'Orders', icon: <ShoppingCart size={18} /> },
        { path: 'analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
        { path: 'customers', label: 'Customers', icon: <Users size={18} /> },
        { path: 'reservations', label: 'Reservations', icon: <CalendarDays size={18} /> },
        { path: 'settings', label: 'Settings', icon: <SettingsIcon size={18} /> },
    ];

    const isActive = (itemPath) => {
        const adminPath = '/admin';
        const targetPath = itemPath === '' ? adminPath : `${adminPath}/${itemPath}`;
        return location.pathname === targetPath;
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-white border-r border-gray-100 mt-4">
            <div className="p-8 mb-4">
                <Link to="/" className="flex items-center space-x-3 group">
                    <div className="bg-primary p-2 rounded-lg shadow-md shadow-primary/20">
                        <Utensils size={20} className="text-white" />
                    </div>
                    <div>
                        <span className="text-gray-900 font-bold text-xl tracking-tight leading-none">Dar Essalam</span>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest leading-none mt-1">Admin Panel</p>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map(item => (
                    <Link 
                        key={item.path}
                        to={`/admin/${item.path}`}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center px-4 py-3 rounded-xl transition-all group
                            ${isActive(item.path)
                            ? 'bg-primary/10 text-primary font-bold' 
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                        <div className="flex items-center space-x-4">
                            <span className={isActive(item.path) ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}>
                                {item.icon}
                            </span>
                            <span className="text-sm font-medium">{item.label}</span>
                        </div>
                    </Link>
                ))}
            </nav>

            <div className="p-6 border-t border-gray-50">
                <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3 overflow-hidden">
                        <div className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 flex-shrink-0">
                            <UserCircle size={20} />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold text-gray-900 truncate">{user?.name}</p>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Administrator</p>
                        </div>
                    </div>
                    <button 
                        onClick={logout}
                        title="Sign Out"
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <LogOut size={16} />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-50 text-neutral-dark pt-20">
            {/* Desktop Sidebar */}
            <aside className="w-72 hidden lg:block h-screen sticky top-0 transform transition-all">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-72 bg-white z-[100] border-r border-gray-100 transform transition-transform duration-300 lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="absolute top-6 right-4">
                    <button onClick={() => setSidebarOpen(false)} className="p-2 text-gray-400 hover:text-gray-900"><X size={24} /></button>
                </div>
                <SidebarContent />
            </aside>

            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-[99] lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Admin Header Bar */}
                <header className="h-20 px-8 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50">
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 text-gray-400 hover:text-gray-900 lg:hidden"
                        >
                            <Menu size={22} />
                        </button>
                        <h2 className="text-xl font-bold text-gray-900">
                            {menuItems.find(i => isActive(i.path))?.label || 'Dashboard'}
                        </h2>
                    </div>

                    <div className="flex items-center space-x-6 relative">
                        <div className="hidden md:flex relative" ref={searchRef}>
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input 
                                type="text"
                                placeholder="Search everything..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => searchQuery && setShowSearchDropdown(true)}
                                className="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:border-primary/40 transition-all outline-none"
                            />
                            {/* Search Dropdown */}
                            {showSearchDropdown && (
                                <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 max-h-96 overflow-y-auto z-50 p-2">
                                    {isSearching ? (
                                        <p className="p-4 text-center text-xs text-gray-500">Searching...</p>
                                    ) : searchResults && (searchResults.customers?.length > 0 || searchResults.products?.length > 0 || searchResults.orders?.length > 0) ? (
                                        <>
                                            {searchResults.customers?.length > 0 && (
                                                <div className="mb-2">
                                                    <p className="px-2 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customers</p>
                                                    {searchResults.customers.map(c => (
                                                        <Link key={c.id} to="/admin/customers" onClick={() => setShowSearchDropdown(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                                                            <div className="font-medium">{c.name}</div>
                                                            <div className="text-xs text-gray-400">{c.email}</div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                            {searchResults.products?.length > 0 && (
                                                <div className="mb-2">
                                                    <p className="px-2 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Products</p>
                                                    {searchResults.products.map(p => (
                                                        <Link key={p.id} to="/admin/products" onClick={() => setShowSearchDropdown(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                                                            <div className="font-medium">{p.name}</div>
                                                            <div className="text-xs text-gray-400">${p.price}</div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                            {searchResults.orders?.length > 0 && (
                                                <div>
                                                    <p className="px-2 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Orders</p>
                                                    {searchResults.orders.map(o => (
                                                        <Link key={o.id} to="/admin/orders" onClick={() => setShowSearchDropdown(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                                                            <div className="font-medium">Order #{o.id}</div>
                                                            <div className="text-xs text-gray-400">${o.total_price} - {o.status}</div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <p className="p-4 text-center text-xs text-gray-500">No results found for "{searchQuery}"</p>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        <div className="relative" ref={notifRef}>
                            <button 
                                onClick={handleOpenNotifications}
                                className="relative p-2 text-gray-400 hover:text-primary transition-all"
                            >
                                <Bell size={18} />
                                {localUnreadCount > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
                                )}
                            </button>
                            
                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden text-left">
                                    <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                                        <h3 className="font-bold text-sm text-gray-900">Notifications</h3>
                                        {localUnreadCount > 0 && (
                                            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-bold">
                                                {localUnreadCount} New
                                            </span>
                                        )}
                                    </div>
                                    <div className="max-h-80 overflow-y-auto p-2">
                                        {notifications.orders?.length === 0 && notifications.reservations?.length === 0 && notifications.users?.length === 0 ? (
                                            <div className="p-8 text-center">
                                                <div className="w-12 h-12 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-3"><Bell size={20} /></div>
                                                <p className="text-sm font-medium text-gray-500">You're all caught up!</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-1">
                                                {notifications.orders.map(o => (
                                                    <Link key={`o-${o.id}`} to="/admin/orders" onClick={() => setShowNotifications(false)} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5"><ShoppingCart size={14} /></div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">New Order #{o.id}</p>
                                                            <p className="text-xs text-gray-500 mt-0.5">Pending preparation (${o.total_price})</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                                {notifications.reservations.map(r => (
                                                    <Link key={`r-${r.id}`} to="/admin/reservations" onClick={() => setShowNotifications(false)} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                                                        <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5"><CalendarDays size={14} /></div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900 group-hover:text-purple-600">Reservation Request</p>
                                                            <p className="text-xs text-gray-500 mt-0.5">From {r.name}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                                {notifications.users?.map(u => (
                                                    <Link key={`u-${u.id}`} to="/admin/customers" onClick={() => setShowNotifications(false)} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                                                        <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center flex-shrink-0 mt-0.5"><Users size={14} /></div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900 group-hover:text-green-600">New User Registered</p>
                                                            <p className="text-xs text-gray-500 mt-0.5">{u.name}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <div className="p-8 flex-1 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        <Routes>
                            <Route index element={<Overview />} />
                            <Route path="products" element={<ManageProducts />} />
                            <Route path="categories" element={<ManageCategories />} />
                            <Route path="orders" element={<ManageOrders />} />
                            <Route path="analytics" element={<Analytics />} />
                            <Route path="customers" element={<Customers />} />
                            <Route path="reservations" element={<ManageReservations />} />
                            <Route path="settings" element={<SettingsPage />} />
                        </Routes>
                    </div>
                </div>

                <footer className="h-10 px-8 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            <span>System Optimal</span>
                        </span>
                    </div>
                    <span>© {new Date().getFullYear()} Dar Essalam Admin</span>
                </footer>
            </main>
        </div>
    );
};

export default AdminDashboard;
