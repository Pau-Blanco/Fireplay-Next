'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

interface Game {
    id: number;
    name: string;
    background_image: string;
    description: string;
    [key: string]: any; // For other potential properties we might not use
}

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
}

export default function ProductSheetPage() {
    const { slug } = useParams();
    const router = useRouter();

    const [game, setGame] = useState<Game | null>(null);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if (!slug) return;

        const fetchGame = async () => {
            const res = await fetch(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`);
            const data = await res.json();
            setGame(data);

            // Generate random price between 20 and 70 €
            const randomPrice = (Math.random() * 50 + 20).toFixed(2);
            setPrice(Number(randomPrice));
        };

        fetchGame();
    }, [slug]);

    const handleAddToCart = () => {
        if (!game) return;

        const item: CartItem = {
            id: game.id,
            name: game.name,
            price,
            image: game.background_image,
        };

        onAuthStateChanged(auth, async (user: User | null) => {
            if (user) {
                const ref = doc(db, 'carritos', user.uid);
                const snap = await getDoc(ref);
                const cart: CartItem[] = snap.exists() ? snap.data().items : [];

                const already = cart.find((g: CartItem) => g.id === game.id);
                if (!already) {
                    const updated = [...cart, item];
                    await setDoc(ref, { items: updated });
                    alert('Juego añadido al carrito (guardado en Firestore) ✅');
                    router.push('/cart');
                } else {
                    alert('Este juego ya está en tu carrito 🛒');
                }
            } else {
                const localCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
                const already = localCart.find((g: CartItem) => g.id === game.id);
                if (!already) {
                    const updated = [...localCart, item];
                    localStorage.setItem('cart', JSON.stringify(updated));
                    alert('Juego añadido al carrito (guardado en LocalStorage) ✅');
                    router.push('/cart');
                } else {
                    alert('Este juego ya está en tu carrito 🛒');
                }
            }
        });
    };

    if (!game) return <p className="p-4">Cargando ficha técnica...</p>;

    return (
        <main className="p-6 text-gray-800 max-w-6xl mx-auto">
            {/* Game title */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">{game.name}</h1>

            {/* Main container for image and description */}
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                {/* Featured image */}
                <div className="relative w-full md:w-1/2 max-h-[900px] overflow-hidden rounded-lg">
                    <img
                        src={game.background_image}
                        alt={game.name}
                        className="w-full h-full object-cover"
                    />

                    {/* Price and button container */}
                    <div className="bg-white p-6 rounded-lg shadow-md mt-6 text-center">
                        <p className="text-2xl font-semibold text-gray-900 mb-4">
                            Precio: <span className="text-green-600">{price} €</span>
                        </p>
                        <button
                            onClick={handleAddToCart}
                            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-700 transition"
                        >
                            Añadir al carrito
                        </button>
                    </div>

                    {/* Reviews container */}
                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Opiniones de usuarios</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>🎮 Muy divertido y con excelentes gráficos. — Usuario1</li>
                            <li>🔥 Una joya para los fans del género. — Usuario2</li>
                            <li>🕹️ Vale cada euro. Recomendadísimo. — Usuario3</li>
                        </ul>
                    </div>
                </div>

                {/* Game description */}
                <div className="text-gray-700 prose max-w-none md:w-1/2 text-justify">
                    <div dangerouslySetInnerHTML={{ __html: game.description }} />
                </div>
            </div>
        </main>
    );
}