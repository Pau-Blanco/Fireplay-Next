'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export default function ProductSheetPage() {
    const { slug } = useParams();
    const router = useRouter();

    const [game, setGame] = useState<any>(null);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if (!slug) return;

        const fetchGame = async () => {
            const res = await fetch(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`);
            const data = await res.json();
            setGame(data);

            // Generar precio ficticio aleatorio entre 20 y 70 €
            const randomPrice = (Math.random() * 50 + 20).toFixed(2);
            setPrice(Number(randomPrice));
        };

        fetchGame();
    }, [slug]);

    const handleAddToCart = () => {
        const item = {
            id: game.id,
            name: game.name,
            price,
            image: game.background_image,
        };

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const ref = doc(db, 'carritos', user.uid);
                const snap = await getDoc(ref);
                const cart = snap.exists() ? snap.data().items : [];

                const already = cart.find((g: any) => g.id === game.id);
                if (!already) {
                    const updated = [...cart, item];
                    await setDoc(ref, { items: updated });
                    alert('Juego añadido al carrito (guardado en Firestore) ✅');
                    router.push('/cart');
                } else {
                    alert('Este juego ya está en tu carrito 🛒');
                }
            } else {
                const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
                const already = localCart.find((g: any) => g.id === game.id);
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
            {/* Título del juego */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">{game.name}</h1>

            {/* Contenedor principal para imagen y descripción */}
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                {/* Imagen destacada */}
                <div className="relative w-full md:w-1/2 max-h-[900px] overflow-hidden rounded-lg ">
                    <img
                        src={game.background_image}
                        alt={game.name}
                        className="w-full h-full object-cover"
                    />

                    {/* Contenedor para precio y botón */}
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

                    {/* Contenedor para reseñas */}
                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Opiniones de usuarios</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li>🎮 Muy divertido y con excelentes gráficos. — Usuario1</li>
                            <li>🔥 Una joya para los fans del género. — Usuario2</li>
                            <li>🕹️ Vale cada euro. Recomendadísimo. — Usuario3</li>
                        </ul>
                    </div>
                </div>

                {/* Descripción del juego */}
                <div className="text-gray-700 prose max-w-none md:w-1/2 text-justify">
                    <div dangerouslySetInnerHTML={{ __html: game.description }} />
                </div>
            </div>
        </main>
    );
}