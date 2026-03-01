import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { 
    Plus, 
    Edit3, 
    Trash2, 
    Grid, 
    Package, 
    ChevronRight,
    Utensils,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({ name: '', slug: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get('/categories');
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setFormData({ name: category.name, slug: category.slug });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category? All associated products will be uncategorized.')) return;
        try {
            await api.delete(`/admin/categories/${id}`);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await api.put(`/admin/categories/${editingCategory.id}`, formData);
            } else {
                await api.post('/admin/categories', formData);
            }
            setShowForm(false);
            setEditingCategory(null);
            fetchData();
        } catch (err) {
            console.error(err);
            alert('Failed to save category.');
        }
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-gray-900">Manage Categories</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Organize your menu collections</p>
                </div>
                <button 
                    onClick={() => { setEditingCategory(null); setFormData({name: '', slug: ''}); setShowForm(true); }}
                    className="btn-primary flex items-center justify-center space-x-2 !py-2.5 px-6 text-sm"
                >
                    <Plus size={18} />
                    <span>Add Category</span>
                </button>
            </div>

            {/* Categories Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100 text-left">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Icon</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Slug</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Items Type</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-4"><div className="w-10 h-10 bg-gray-100 rounded-xl"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-1/2"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-1/3"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-1/4"></div></td>
                                        <td className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-8 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : categories.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <Package size={48} className="text-gray-300" />
                                            <p className="text-lg font-medium">No categories found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                categories.map((cat, index) => (
                                    <motion.tr 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        key={cat.id} 
                                        className="hover:bg-gray-50/50 transition-colors group"
                                    >
                                        <td className="px-6 py-4 border-b border-gray-50">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 transition-colors">
                                                <Grid size={18} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-50">
                                            <span className="font-bold text-gray-900 block">{cat.name}</span>
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-50">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-1 rounded-md">
                                                {cat.slug || 'n/a'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-50">
                                            <div className="flex items-center space-x-2 text-gray-500">
                                                <Package size={14} />
                                                <span className="text-xs font-bold uppercase tracking-wider">Multiple Items</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-50 text-right">
                                            <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => handleEdit(cat)} 
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                    title="Edit Category"
                                                >
                                                    <Edit3 size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(cat.id)} 
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete Category"
                                                >
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

            {/* Modal Form */}
            <AnimatePresence>
                {showForm && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowForm(false)}
                            className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl space-y-8"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {editingCategory ? 'Edit Category' : 'New Category'}
                                    </h2>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Classification Settings</p>
                                </div>
                                <button onClick={() => setShowForm(false)} className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Category Name</label>
                                    <div className="relative">
                                        <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                        <input 
                                            required
                                            type="text" 
                                            className="w-full pl-12"
                                            placeholder="e.g. Main Courses"
                                            value={formData.name}
                                            onChange={(e) => {
                                                const name = e.target.value;
                                                setFormData({
                                                    ...formData, 
                                                    name, 
                                                    slug: name.toLowerCase().replace(/ /g, '-')
                                                });
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Slug (URL Segment)</label>
                                    <input 
                                        required
                                        type="text" 
                                        className="w-full bg-gray-50 text-gray-500 font-medium"
                                        placeholder="main-courses"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({...formData, slug: e.target.value})}
                                    />
                                </div>

                                <div className="pt-6 flex gap-4">
                                    <button 
                                        type="button" 
                                        onClick={() => setShowForm(false)}
                                        className="flex-1 btn-outline !py-3.5 text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="flex-1 btn-primary !py-3.5 text-sm"
                                    >
                                        {editingCategory ? 'Save Changes' : 'Create Category'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageCategories;
