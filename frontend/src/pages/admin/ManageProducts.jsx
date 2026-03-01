import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { 
    Plus, 
    Edit3, 
    Trash2, 
    Search, 
    Filter, 
    Image as ImageIcon,
    ChevronRight,
    Star,
    ExternalLink,
    X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', category_id: '', is_featured: false, image: null
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [prodRes, catRes] = await Promise.all([
                api.get('/admin/products'),
                api.get('/categories')
            ]);
            setProducts(prodRes.data.data);
            setCategories(catRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category_id: product.category_id,
            is_featured: product.is_featured,
            image: null
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await api.delete(`/admin/products/${id}`);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'image' && !formData[key]) return;
            data.append(key, formData[key] === true ? 1 : formData[key] === false ? 0 : formData[key]);
        });
        // No spoofing needed as the route is POST

        try {
            const url = editingProduct ? `/admin/products/${editingProduct.id}` : '/admin/products';
            await api.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } });
            setShowForm(false);
            setEditingProduct(null);
            fetchData();
        } catch (err) {
            console.error(err);
            const message = err.response?.data?.message || 'Failed to save product. Please check the information.';
            const errors = err.response?.data?.errors;
            if (errors) {
                const errorDetails = Object.values(errors).flat().join('\n');
                alert(`${message}\n\n${errorDetails}`);
            } else {
                alert(message);
            }
        }
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex-1 w-full relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 shadow-none border-gray-100 bg-gray-50/50"
                    />
                </div>
                <div className="flex items-center space-x-3 w-full md:w-auto">
                    <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-gray-900 border border-gray-100 transition-all">
                        <Filter size={18} />
                    </button>
                    <button 
                        onClick={() => { setEditingProduct(null); setFormData({name: '', description: '', price: '', category_id: '', is_featured: false, image: null}); setShowForm(true); }}
                        className="btn-primary flex-1 md:flex-none flex items-center justify-center space-x-2 !py-2.5 px-6 text-sm"
                    >
                        <Plus size={18} />
                        <span>Add Product</span>
                    </button>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Featured</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Price</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            [...Array(5)].map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan="5" className="px-6 py-4"><div className="h-14 bg-gray-50 rounded-xl w-full"></div></td>
                                </tr>
                            ))
                        ) : products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50/30 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                                            <img 
                                                src={product.image ? `http://127.0.0.1:8000/storage/${product.image}` : `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100`} 
                                                className="w-full h-full object-cover"
                                                alt={product.name}
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{product.name}</h4>
                                            <p className="text-xs text-gray-400 font-medium line-clamp-1">{product.description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-bold text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                        {product.category?.name || 'Uncategorized'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center">
                                        {product.is_featured ? (
                                            <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                                <Star size={16} className="fill-blue-600" />
                                            </span>
                                        ) : (
                                            <span className="p-2 text-gray-200">
                                                <Star size={16} />
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="font-bold text-gray-900">${product.price}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button onClick={() => handleEdit(product)} title="Edit" className="p-2.5 bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                            <Edit3 size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(product.id)} title="Delete" className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                        <Link to={`/product/${product.id}`} target="_blank" title="View Page" className="p-2.5 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-lg transition-all">
                                            <ExternalLink size={16} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Form */}
            <AnimatePresence>
                {showForm && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-end">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowForm(false)}
                            className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                            className="relative w-full max-w-xl h-screen bg-white shadow-2xl p-10 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                                    </h2>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Product Details</p>
                                </div>
                                <button onClick={() => setShowForm(false)} className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Product Media</label>
                                    <div className="h-48 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center space-y-2 hover:border-blue-400 transition-all cursor-pointer overflow-hidden relative group">
                                        {formData.image ? (
                                            <img src={URL.createObjectURL(formData.image)} alt="Preview" className="w-full h-full object-cover" />
                                        ) : editingProduct?.image ? (
                                            <img src={`http://127.0.0.1:8000/storage/${editingProduct.image}`} alt="Current" className="w-full h-full object-cover" />
                                        ) : (
                                            <>
                                                <ImageIcon size={32} className="text-gray-300" />
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Upload Product Image</p>
                                            </>
                                        )}
                                        <input 
                                            type="file" 
                                            className="absolute inset-0 opacity-0 cursor-pointer" 
                                            onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Product Name</label>
                                        <input 
                                            required
                                            type="text" 
                                            placeholder="e.g. Classic Burger"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Price ($)</label>
                                        <input 
                                            required
                                            type="number" 
                                            step="0.01"
                                            placeholder="19.99"
                                            value={formData.price}
                                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Category</label>
                                    <select 
                                        required
                                        value={formData.category_id}
                                        onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                                        className="w-full"
                                    >
                                        <option value="">Select Category...</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Description</label>
                                    <textarea 
                                        required
                                        rows="4" 
                                        placeholder="Briefly describe this product..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        className="w-full resize-none"
                                    />
                                </div>

                                <div className="flex items-center space-x-3 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                    <input 
                                        type="checkbox" 
                                        id="is_featured"
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        checked={formData.is_featured}
                                        onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                                    />
                                    <label htmlFor="is_featured" className="text-sm font-bold text-gray-700 cursor-pointer select-none">
                                        Feature this product on homepage
                                    </label>
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
                                        {editingProduct ? 'Save Product' : 'Add Product'}
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

export default ManageProducts;
