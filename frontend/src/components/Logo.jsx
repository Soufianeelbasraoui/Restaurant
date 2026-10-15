import React from 'react';

export const LogoIcon = ({ size = 32, className = '' }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        {/* Outer Warm Craft Diamond / Moroccan Zellige motif */}
        <rect x="24" y="4" width="28" height="28" rx="3" transform="rotate(45 24 4)" fill="#C85A3B" fillOpacity="0.12" stroke="#C85A3B" strokeWidth="1.8" />
        {/* Inner geometric accent */}
        <rect x="24" y="9" width="21" height="21" rx="2" transform="rotate(45 24 9)" stroke="#D4A373" strokeWidth="1.2" strokeDasharray="2 2" />
        {/* Handcrafted Tagine & Wheat/Olive Motif */}
        <path d="M24 16V13M24 13C22 13 22 11 24 11C26 11 26 13 24 13Z" stroke="#C85A3B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 29L22.5 18.5C23.2 17.2 24.8 17.2 25.5 18.5L31 29" stroke="#C85A3B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 31C15 29.8954 15.8954 29 17 29H31C32.1046 29 33 29.8954 33 31V32C33 33.1046 32.1046 34 31 34H17C15.8954 34 15 33.1046 15 32V31Z" fill="#C85A3B" />
        {/* Subtle Moroccan star dot */}
        <circle cx="24" cy="24" r="1.5" fill="#D4A373" />
    </svg>
);

const Logo = ({ size = 34, showSubtitle = true, light = false }) => {
    return (
        <div className="flex items-center space-x-3 group">
            <div className="p-1.5 bg-neutral-light/60 border border-primary/20 rounded-[5px] transition-transform duration-300 group-hover:scale-105">
                <LogoIcon size={size} />
            </div>
            <div className="flex flex-col leading-none">
                <span className={`text-xl font-serif font-bold tracking-wider ${light ? 'text-white' : 'text-neutral-dark'} transition-colors group-hover:text-primary`}>
                    MAISON BELDI
                </span>
                {showSubtitle && (
                    <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-accent/90 mt-1">
                        Table & Terroir
                    </span>
                )}
            </div>
        </div>
    );
};

export default Logo;
