<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Reservation;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Admin & Users
        $admin = User::updateOrCreate(
            ['email' => 'admin@restaurant.com'],
            [
                'name' => 'Admin Restaurant',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'phone' => '+212 600-112233',
                'address' => '12 Boulevard Mohammed V, Casablanca',
            ]
        );

        $customer1 = User::updateOrCreate(
            ['email' => 'soufiane@example.com'],
            [
                'name' => 'Soufiane El Basraoui',
                'password' => Hash::make('password'),
                'role' => 'customer',
                'phone' => '+212 612-345678',
                'address' => 'Quartier Gauthier, Casablanca',
            ]
        );

        $customer2 = User::updateOrCreate(
            ['email' => 'yassine@example.com'],
            [
                'name' => 'Yassine Alami',
                'password' => Hash::make('password'),
                'role' => 'customer',
                'phone' => '+212 698-765432',
                'address' => 'Hivernage, Marrakech',
            ]
        );

        $customer3 = User::updateOrCreate(
            ['email' => 'fatima@example.com'],
            [
                'name' => 'Fatima Zahra',
                'password' => Hash::make('password'),
                'role' => 'customer',
                'phone' => '+212 655-443322',
                'address' => 'Agdal, Rabat',
            ]
        );

        // 2. Categories
        $categoriesData = [
            ['name' => 'Tagines Authentiques', 'slug' => 'tagines'],
            ['name' => 'Couscous Royaux', 'slug' => 'couscous'],
            ['name' => 'Pastillas Exquises', 'slug' => 'pastillas'],
            ['name' => 'Entrées & Salades', 'slug' => 'entrees-salades'],
            ['name' => 'Desserts & Douceurs', 'slug' => 'desserts'],
            ['name' => 'Boissons & Thés', 'slug' => 'boissons'],
        ];

        $categories = [];
        foreach ($categoriesData as $cat) {
            $categories[$cat['slug']] = Category::updateOrCreate(
                ['slug' => $cat['slug']],
                ['name' => $cat['name']]
            );
        }

        // 3. Products
        $productsData = [
            [
                'category_id' => $categories['tagines']->id,
                'name' => 'Tagine d\'Agneau aux Pruneaux et Amandes',
                'description' => 'Morceaux d\'agneau tendres mijotés avec des pruneaux confits caramélisés, des amandes dorées et des graines de sésame.',
                'price' => 24.50,
                'image' => 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&auto=format&fit=crop&q=80',
                'is_featured' => true,
                'rating' => 4.9,
                'reviews_count' => 64,
            ],
            [
                'category_id' => $categories['tagines']->id,
                'name' => 'Tagine de Poulet au Citron Confit et Olives',
                'description' => 'Poulet fermier mariné au safran, gingembre et coriandre, servi avec citrons confits maison et olives violettes.',
                'price' => 19.50,
                'image' => 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
                'is_featured' => true,
                'rating' => 4.8,
                'reviews_count' => 42,
            ],
            [
                'category_id' => $categories['tagines']->id,
                'name' => 'Tagine de Kefta aux Œufs et Sauce Tomate',
                'description' => 'Boulettes de bœuf haché épicées cuites dans une réduction de tomates fraîches parfumée au cumin, surmontées d\'œufs pochés.',
                'price' => 18.00,
                'image' => 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&auto=format&fit=crop&q=80',
                'is_featured' => false,
                'rating' => 4.7,
                'reviews_count' => 31,
            ],
            [
                'category_id' => $categories['tagines']->id,
                'name' => 'Tagine de Poisson à la Charmoula',
                'description' => 'Filet de mérou frais cuit sur un lit de pommes de terre, carottes, poivrons marinés à la charmoula traditionnelle.',
                'price' => 22.00,
                'image' => 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
                'is_featured' => false,
                'rating' => 4.8,
                'reviews_count' => 27,
            ],
            [
                'category_id' => $categories['couscous']->id,
                'name' => 'Couscous Royal aux Sept Légumes',
                'description' => 'Semoule fine cuite à la vapeur, assortiment de viandes (agneau, poulet, merguez), légumes fondants et bouillon safrané.',
                'price' => 26.00,
                'image' => 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80',
                'is_featured' => true,
                'rating' => 5.0,
                'reviews_count' => 95,
            ],
            [
                'category_id' => $categories['couscous']->id,
                'name' => 'Couscous Tfaya à l\'Agneau',
                'description' => 'Agneau fondant servi sur semoule fine, généreusement nappé de Tfaya aux oignons caramélisés et raisins secs parfumés à la cannelle.',
                'price' => 25.00,
                'image' => 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80',
                'is_featured' => true,
                'rating' => 4.9,
                'reviews_count' => 53,
            ],
            [
                'category_id' => $categories['couscous']->id,
                'name' => 'Couscous Végétarien du Jardin',
                'description' => 'Semoule parfumée accompagnée de courgettes, courge rouge, navets, carottes, chou et pois chiches au bouillon délicat.',
                'price' => 17.50,
                'image' => 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
                'is_featured' => false,
                'rating' => 4.6,
                'reviews_count' => 22,
            ],
            [
                'category_id' => $categories['pastillas']->id,
                'name' => 'Pastilla Traditionnelle au Poulet et Amandes',
                'description' => 'Feuilleté croustillant garni d\'effiloché de poulet fermier aux épices douces et d\'amandes concassées dorées, saupoudré de sucre glace et cannelle.',
                'price' => 21.00,
                'image' => 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&auto=format&fit=crop&q=80',
                'is_featured' => true,
                'rating' => 4.9,
                'reviews_count' => 88,
            ],
            [
                'category_id' => $categories['pastillas']->id,
                'name' => 'Pastilla Royale aux Fruits de Mer',
                'description' => 'Crevettes royales, calamars et poisson blanc enveloppés de vermicelle de soja pimenté et champignons noirs dans une feuille de brick croustillante.',
                'price' => 23.50,
                'image' => 'https://images.unsplash.com/photo-1553659971-f01207815844?w=800&auto=format&fit=crop&q=80',
                'is_featured' => true,
                'rating' => 4.8,
                'reviews_count' => 74,
            ],
            [
                'category_id' => $categories['entrees-salades']->id,
                'name' => 'Trio de Salades Cuites Marocaines',
                'description' => 'Assiette dégustation comprenant Zaalouk d\'aubergines grillées, Taktouka aux poivrons confits et carottes au cumin et jus d\'orange.',
                'price' => 12.00,
                'image' => 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
                'is_featured' => false,
                'rating' => 4.7,
                'reviews_count' => 38,
            ],
            [
                'category_id' => $categories['entrees-salades']->id,
                'name' => 'Assortiment de Briouates Croustillantes',
                'description' => 'Six pièces de triangles feuilletés farcis au fromage de chèvre et épinards, et à la viande hachée aux herbes fraîches.',
                'price' => 11.50,
                'image' => 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
                'is_featured' => false,
                'rating' => 4.7,
                'reviews_count' => 45,
            ],
            [
                'category_id' => $categories['entrees-salades']->id,
                'name' => 'Harira Traditionnelle & Délices Sucrés',
                'description' => 'Soupe marocaine veloutée aux lentilles, pois chiches et coriandre, accompagnée de dattes Medjool et Chebbakia au sésame.',
                'price' => 9.50,
                'image' => 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80',
                'is_featured' => false,
                'rating' => 4.8,
                'reviews_count' => 59,
            ],
            [
                'category_id' => $categories['desserts']->id,
                'name' => 'Pastilla au Lait & Eau de Fleur d\'Oranger (Jawhara)',
                'description' => 'Feuilles de pastilla croustillantes superposées d\'une crème onctueuse à la fleur d\'oranger et éclats d\'amandes torréfiées.',
                'price' => 8.50,
                'image' => 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=80',
                'is_featured' => false,
                'rating' => 4.9,
                'reviews_count' => 61,
            ],
            [
                'category_id' => $categories['desserts']->id,
                'name' => 'Plateau de Pâtisseries Fines Marocaines',
                'description' => 'Cornes de gazelle à la pâte d\'amande pure, Ghriba aux noix et M\'hancha au miel de fleurs.',
                'price' => 10.00,
                'image' => 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=800&auto=format&fit=crop&q=80',
                'is_featured' => true,
                'rating' => 4.9,
                'reviews_count' => 70,
            ],
            [
                'category_id' => $categories['boissons']->id,
                'name' => 'Thé à la Menthe Fraîche Traditionnel',
                'description' => 'Préparé selon la tradition dans une théière en argent avec du thé vert gunpowder, menthe fraîchement cueillie et sucre pur.',
                'price' => 4.50,
                'image' => 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
                'is_featured' => false,
                'rating' => 4.9,
                'reviews_count' => 110,
            ],
            [
                'category_id' => $categories['boissons']->id,
                'name' => 'Jus d\'Orange Pressé à la Cannelle et Fleur d\'Oranger',
                'description' => 'Oranges marocaines fraîchement pressées relevées d\'une touche délicate de cannelle et de fleur d\'oranger.',
                'price' => 5.00,
                'image' => 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&auto=format&fit=crop&q=80',
                'is_featured' => false,
                'rating' => 4.7,
                'reviews_count' => 34,
            ],
        ];

        $createdProducts = [];
        foreach ($productsData as $prod) {
            $createdProducts[] = Product::updateOrCreate(
                ['name' => $prod['name']],
                $prod
            );
        }

        // 4. Sample Orders
        if (Order::count() === 0) {
            $order1 = Order::create([
                'user_id' => $customer1->id,
                'total_price' => 45.50,
                'status' => 'completed',
                'address' => '15 Rue Abou El Kacem Kotbari, Casablanca',
                'phone' => '+212 612-345678',
                'payment_method' => 'card',
                'created_at' => now()->subDays(2),
            ]);

            OrderItem::create([
                'order_id' => $order1->id,
                'product_id' => $createdProducts[0]->id, // Tagine d'agneau
                'quantity' => 1,
                'price' => 24.50,
            ]);

            OrderItem::create([
                'order_id' => $order1->id,
                'product_id' => $createdProducts[7]->id, // Pastilla poulet
                'quantity' => 1,
                'price' => 21.00,
            ]);

            $order2 = Order::create([
                'user_id' => $customer2->id,
                'total_price' => 50.50,
                'status' => 'processing',
                'address' => 'Résidence Majorelle, Marrakech',
                'phone' => '+212 698-765432',
                'payment_method' => 'card',
                'created_at' => now()->subHours(5),
            ]);

            OrderItem::create([
                'order_id' => $order2->id,
                'product_id' => $createdProducts[4]->id, // Couscous royal
                'quantity' => 1,
                'price' => 26.00,
            ]);

            OrderItem::create([
                'order_id' => $order2->id,
                'product_id' => $createdProducts[1]->id, // Tagine poulet
                'quantity' => 1,
                'price' => 19.50,
            ]);

            OrderItem::create([
                'order_id' => $order2->id,
                'product_id' => $createdProducts[14]->id, // Thé
                'quantity' => 1,
                'price' => 4.50,
            ]);

            $order3 = Order::create([
                'user_id' => $customer3->id,
                'total_price' => 33.50,
                'status' => 'pending',
                'address' => 'Avenue de France, Agdal, Rabat',
                'phone' => '+212 655-443322',
                'payment_method' => 'cash',
                'created_at' => now()->subMinutes(30),
            ]);

            OrderItem::create([
                'order_id' => $order3->id,
                'product_id' => $createdProducts[8]->id, // Pastilla fruits de mer
                'quantity' => 1,
                'price' => 23.50,
            ]);

            OrderItem::create([
                'order_id' => $order3->id,
                'product_id' => $createdProducts[13]->id, // Plateau pâtisseries
                'quantity' => 1,
                'price' => 10.00,
            ]);
        }

        // 5. Sample Reservations
        if (Reservation::count() === 0) {
            Reservation::create([
                'name' => 'Driss Bennani',
                'email' => 'driss.bennani@gmail.com',
                'phone' => '+212 661-889900',
                'subject' => 'Table pour anniversaire',
                'message' => 'Nous souhaitons réserver une belle table dans le patio pour fêter un anniversaire, 6 convives.',
                'status' => 'confirmed',
                'guests' => 6,
                'reservation_date' => now()->addDays(2)->setHour(20)->setMinute(0),
            ]);

            Reservation::create([
                'name' => 'Sophia Martinez',
                'email' => 'sophia.m@outlook.com',
                'phone' => '+33 6 12 34 56 78',
                'subject' => 'Dîner romantique',
                'message' => 'Réservation pour 2 personnes lors de notre séjour à Casablanca.',
                'status' => 'pending',
                'guests' => 2,
                'reservation_date' => now()->addDay()->setHour(20)->setMinute(30),
            ]);
        }

        // 6. Settings
        $defaultSettings = [
            'admin_email' => 'admin@restaurant.com',
            'restaurant_name' => 'Maison Beldi - Table & Terroir Marocain',
            'phone' => '+212 522-123456',
            'address' => '12 Boulevard Mohammed V, Casablanca, Maroc',
            'timezone' => 'Africa/Casablanca (GMT+1)',
            'currency' => 'MAD / USD',
            'two_factor_auth' => '1',
            'auto_logout' => '0',
            'audit_logs' => '1',
        ];

        foreach ($defaultSettings as $key => $val) {
            Setting::updateOrCreate(['key' => $key], ['value' => $val]);
        }
    }
}
