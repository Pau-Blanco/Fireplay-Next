'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

interface Game {
    id: number;
    name: string;
    image: string;
}

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<Game[]>([]);
    const [userId, setUserId] = useState<string | null>(null);

    // Cargar favoritos al iniciar
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
                const ref = doc(db, 'favoritos', user.uid);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    setFavorites(snap.data().items || []);
                }
            }
        });
        return () => unsubscribe();
    }, []);

    // Eliminar juego
    const removeFavorite = async (id: number) => {
        if (!userId) return;

        const updated = favorites.filter((game) => game.id !== id);
        setFavorites(updated);
        await setDoc(doc(db, 'favoritos', userId), { items: updated });
    };

    return (
        <ProtectedRoute>
            <main className="p-6 text-gray-800 max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
                    Tus juegos favoritos ❤️
                </h1>
                {favorites.length === 0 ? (
                    <p className="text-center text-lg text-gray-600">
                        No tienes juegos marcados como favoritos.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {favorites.map((game) => (
                            <div
                                key={game.id}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition relative overflow-hidden"
                            >
                                <Link href={`/game/${game.id}`}>
                                    <img
                                        src={game.image}
                                        alt={game.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold text-gray-900 text-center">
                                            {game.name}
                                        </h2>
                                    </div>
                                </Link>

                                {/* Botón eliminar */}
                                <button
                                    onClick={() => removeFavorite(game.id)}
                                    className="absolute top-2 right-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full hover:bg-red-700 transition"
                                    title="Eliminar de favoritos"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </ProtectedRoute>
    );
}
