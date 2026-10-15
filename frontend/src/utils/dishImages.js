/**
 * Smart image resolver for Maison Beldi menu dishes.
 * Ensures every single dish has its own authentic, appetizing Moroccan culinary photograph.
 */
export const getDishImage = (product) => {
    if (!product) return 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&auto=format&fit=crop&q=80';

    if (product.image) {
        if (product.image.startsWith('http://') || product.image.startsWith('https://')) {
            return product.image;
        }
        return `http://127.0.0.1:8000/storage/${product.image}`;
    }

    const name = (product.name || '').toLowerCase();
    const cat = (product.category?.name || product.category || '').toLowerCase();

    // 1. Tagines
    if (name.includes('pruneaux') || (name.includes('agneau') && name.includes('tagine'))) {
        return 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&auto=format&fit=crop&q=80';
    }
    if (name.includes('citron') || name.includes('poulet')) {
        return 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80';
    }
    if (name.includes('kefta') || name.includes('boulette')) {
        return 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&auto=format&fit=crop&q=80';
    }
    if (name.includes('poisson') || name.includes('mérou') || name.includes('charmoula')) {
        return 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80';
    }

    // 2. Couscous
    if (name.includes('sept') || name.includes('royal')) {
        return 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80';
    }
    if (name.includes('tfaya') || name.includes('raisin')) {
        return 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80';
    }
    if (name.includes('végétarien') || name.includes('vegetarien') || name.includes('jardin')) {
        return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80';
    }

    // 3. Pastillas
    if (name.includes('mer') || name.includes('crevette') || name.includes('calamar')) {
        return 'https://images.unsplash.com/photo-1553659971-f01207815844?w=800&auto=format&fit=crop&q=80';
    }
    if (name.includes('pastilla') || name.includes('amande')) {
        return 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&auto=format&fit=crop&q=80';
    }

    // 4. Entrées & Salades
    if (name.includes('salade') || name.includes('zaalouk') || name.includes('taktouka')) {
        return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80';
    }
    if (name.includes('briouate') || name.includes('triangle')) {
        return 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80';
    }
    if (name.includes('harira') || name.includes('soupe')) {
        return 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80';
    }

    // 5. Desserts & Douceurs
    if (name.includes('lait') || name.includes('jawhara')) {
        return 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=80';
    }
    if (name.includes('pâtisserie') || name.includes('patisserie') || name.includes('corne') || name.includes('ghriba')) {
        return 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=800&auto=format&fit=crop&q=80';
    }

    // 6. Boissons
    if (name.includes('thé') || name.includes('the') || name.includes('menthe')) {
        return 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80';
    }
    if (name.includes('jus') || name.includes('orange')) {
        return 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&auto=format&fit=crop&q=80';
    }

    // Category fallbacks
    if (cat.includes('tagine')) return 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&auto=format&fit=crop&q=80';
    if (cat.includes('couscous')) return 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80';
    if (cat.includes('pastilla')) return 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&auto=format&fit=crop&q=80';
    if (cat.includes('entrée') || cat.includes('entree') || cat.includes('salade')) return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80';
    if (cat.includes('dessert')) return 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=800&auto=format&fit=crop&q=80';
    if (cat.includes('boisson')) return 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80';

    return 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&auto=format&fit=crop&q=80';
};
