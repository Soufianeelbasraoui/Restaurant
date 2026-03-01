import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { 
    Settings as SettingsIcon, 
    ShieldCheck, 
    Bell, 
    Database, 
    Globe, 
    Key, 
    Palette, 
    Lock,
    ChevronRight,
    ArrowRight,
    Save,
    RotateCcw
} from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
    const sections = [
        { id: 'identity', label: 'Identity & Security', icon: <Lock size={18} />, desc: 'Password and access' },
        { id: 'aesthetic', label: 'Appearance', icon: <Palette size={18} />, desc: 'Branding and theme' },
        { id: 'operations', label: 'Operations', icon: <Globe size={18} />, desc: 'Regional and time' },
        { id: 'comms', label: 'Notifications', icon: <Bell size={18} />, desc: 'System alert settings' }
    ];

    const [settings, setSettings] = useState({
        admin_email: 'executive.concierge@latelier.group',
        timezone: 'Universal Time (UTC)',
        two_factor_auth: '1',
        auto_logout: '0',
        audit_logs: '1'
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await api.get('/admin/settings');
            if (Object.keys(res.data.data).length > 0) {
                setSettings(prev => ({ ...prev, ...res.data.data }));
            }
        } catch (err) {
            console.error('Failed to fetch settings', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.post('/admin/settings', settings);
            alert('Settings saved successfully!');
        } catch (err) {
            console.error('Failed to save settings', err);
            alert('Error saving settings.');
        } finally {
            setSaving(false);
        }
    };

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: prev[key] === '1' ? '0' : '1' }));
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Configure your administrative environment</p>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-10">
                {/* Navigation Sidebar */}
                <aside className="w-full xl:w-80 space-y-3">
                    {sections.map(s => (
                        <button 
                            key={s.id} 
                            className={`w-full p-4 rounded-xl border text-left transition-all group
                                ${s.id === 'identity' ? 'bg-primary/10 border-primary/20' : 'bg-white border-gray-100 hover:border-gray-200'}`}
                        >
                            <div className="flex items-center space-x-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all
                                    ${s.id === 'identity' ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400 group-hover:text-primary'}`}>
                                    {s.icon}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className={`text-sm font-bold truncate
                                        ${s.id === 'identity' ? 'text-primary' : 'text-gray-900'}`}>
                                        {s.label}
                                    </p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{s.desc}</p>
                                </div>
                                <ChevronRight size={16} className={`transition-transform ${s.id === 'identity' ? 'text-primary/40 translate-x-1' : 'text-gray-300 group-hover:text-gray-400'}`} />
                            </div>
                        </button>
                    ))}
                </aside>

                {/* Main Settings Panel */}
                <main className="flex-1 space-y-8">
                    <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm space-y-10">
                        <div className="pb-8 border-b border-gray-50 flex justify-between items-end">
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wider">Identity & Security</h3>
                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Admin Access Portal</p>
                            </div>
                            <ShieldCheck size={28} className="text-primary/20" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Administrative Email</label>
                                <input 
                                    type="email" 
                                    value={settings.admin_email} 
                                    onChange={(e) => setSettings({...settings, admin_email: e.target.value})}
                                    className="w-full border-gray-100" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">System Timezone</label>
                                <select 
                                    value={settings.timezone}
                                    onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                                    className="w-full border-gray-100"
                                >
                                    <option value="Universal Time (UTC)">Universal Time (UTC)</option>
                                    <option value="New York (EST)">New York (EST)</option>
                                    <option value="London (GMT)">London (GMT)</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-6 pt-6 border-t border-gray-50">
                            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Access Controls</h4>
                            <div className="space-y-4">
                                {[
                                    { key: 'two_factor_auth', label: 'Two-Factor Authentication', desc: 'Secure your login with a second step' },
                                    { key: 'auto_logout', label: 'Auto-Termination', desc: 'Logout after 12 hours of inactivity' },
                                    { key: 'audit_logs', label: 'System Audit Logs', desc: 'Track all administrative changes' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-bold text-gray-900">{item.label}</p>
                                            <p className="text-[10px] text-gray-400 font-medium">{item.desc}</p>
                                        </div>
                                        <div 
                                            onClick={() => toggleSetting(item.key)}
                                            className={`w-10 h-5 rounded-full relative transition-all cursor-pointer ${settings[item.key] === '1' ? 'bg-primary' : 'bg-gray-200'}`}
                                        >
                                            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${settings[item.key] === '1' ? 'right-0.5' : 'left-0.5'}`}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-50 flex flex-col sm:flex-row gap-4">
                            <button onClick={handleSave} disabled={saving} className="flex-1 btn-primary !py-3 flex items-center justify-center space-x-2 text-sm disabled:opacity-50">
                                <Save size={18} />
                                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                            </button>
                            <button type="button" onClick={() => window.location.reload()} className="flex-1 btn-outline !py-3 flex items-center justify-center space-x-2 text-sm text-gray-500">
                                <RotateCcw size={18} />
                                <span>Restore Defaults</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-primary"><Database size={20} /></div>
                            <div>
                                <p className="text-xs font-bold text-gray-900 uppercase tracking-widest">System Health</p>
                                <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Optimal Condition (12ms Latency)</p>
                            </div>
                        </div>
                        <div className="h-1.5 w-32 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                            <div className="h-full bg-green-500 w-1/4 rounded-full"></div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Settings;
