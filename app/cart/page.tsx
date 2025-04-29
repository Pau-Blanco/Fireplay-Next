// app/cart/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Game {
    id: number;
    name: string;
    price: number;
    image: string;
}

export default function CartPage() {
    const [cart, setCart] = useState<Game[]>([]);
    const [userId, setUserId] = useState<string | null>(null);

    // Cargar carrito desde Firestore o LocalStorage
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
                const ref = doc(db, 'carritos', user.uid);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    setCart(snap.data().items || []);
                } else {
                    setCart([]);
                }
            } else {
                const stored = localStorage.getItem('cart');
                if (stored) setCart(JSON.parse(stored));
            }
        });
        return () => unsubscribe();
    }, []);

    // Guardar en Firestore o LocalStorage al modificar
    const updateCart = (newCart: Game[]) => {
        setCart(newCart);
        if (userId) {
            setDoc(doc(db, 'carritos', userId), { items: newCart });
        } else {
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    };

    const removeFromCart = (id: number) => {
        const updated = cart.filter((game) => game.id !== id);
        updateCart(updated);
    };

    const total = cart.reduce((sum, game) => sum + game.price, 0).toFixed(2);

    return (
        <ProtectedRoute>
            <main className="p-6 text-gray-800 max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Tu carrito</h1>

                {cart.length === 0 ? (
                    <p className="text-center text-lg text-gray-600">No hay juegos en tu carrito.</p>
                ) : (
                    <>
                        <ul className="space-y-4">
                            {cart.map((game) => (
                                <li
                                    key={game.id}
                                    className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={game.image}
                                            alt={game.name}
                                            className="w-24 h-16 object-cover rounded-lg"
                                        />
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900">{game.name}</h2>
                                            <p className="text-green-600 font-medium">{game.price.toFixed(2)} €</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(game.id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 p-6 text-right">
                            <p className="text-2xl font-semibold text-gray-900 mb-4">
                                Total: <span className="text-green-600">{total} €</span>
                            </p>
                            <button
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                                onClick={() => alert('Compra finalizada (simulada) 🛍️')}
                            >
                                Finalizar compra
                            </button>
                        </div>
                    </>
                )}
            </main>
        </ProtectedRoute>
    );
}