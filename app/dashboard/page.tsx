'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

interface Game {
    id: number;
    name: string;
    image: string;
    price?: number;
}

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt?: any;
}

export default function DashboardPage() {
    const [userData, setUserData] = useState<{ name: string | null; email: string | null }>({
        name: null,
        email: null,
    });
    const [favorites, setFavorites] = useState<Game[]>([]);
    const [cart, setCart] = useState<Game[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserData({
                    name: user.displayName,
                    email: user.email,
                });

                // Cargar favoritos
                const favRef = doc(db, 'favoritos', user.uid);
                const favSnap = await getDoc(favRef);
                if (favSnap.exists()) {
                    setFavorites(favSnap.data().items || []);
                }

                // Cargar carrito
                const cartRef = doc(db, 'carritos', user.uid);
                const cartSnap = await getDoc(cartRef);
                if (cartSnap.exists()) {
                    setCart(cartSnap.data().items || []);
                }

                // Cargar mensajes enviados
                const mensajesRef = collection(db, 'mensajes');
                const q = query(mensajesRef, where('email', '==', user.email));
                const snap = await getDocs(q);
                const msgList = snap.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name || 'Desconocido',
                        email: data.email || 'Desconocido',
                        message: data.message || 'Sin mensaje',
                        createdAt: data.createdAt || null,
                    };
                });
                setMessages(msgList);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <ProtectedRoute>
            <main className="p-6 text-gray-800 max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Panel de Usuario</h1>

                {/* Información personal */}
                <section className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Información personal</h2>
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-3xl font-bold text-gray-700">
                            👤
                        </div>
                        <div>
                            <p className="text-lg">
                                <strong>Nombre:</strong> {userData.name || 'No disponible'}
                            </p>
                            <p className="text-lg">
                                <strong>Email:</strong> {userData.email}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Juegos favoritos */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <img src="images/me-gusta.png" alt="icono-corazón" className="w-6 h-6" />
                        Juegos favoritos
                    </h2>
                    {favorites.length === 0 ? (
                        <p className="text-gray-600 text-lg">No tienes juegos marcados como favoritos.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {favorites.map((game) => (
                                <Link href={`/game/${game.id}`} key={game.id}>
                                    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
                                        <img
                                            src={game.image}
                                            alt={game.name}
                                            className="w-full h-40 object-cover rounded-lg"
                                        />
                                        <h3 className="mt-4 text-lg font-semibold text-gray-900 text-center">
                                            {game.name}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                {/* Carrito actual */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <img src="images/carro-de-la-compra.png" alt="icono-carrito" className="w-6 h-6" />
                        Carrito actual
                    </h2>
                    {cart.length === 0 ? (
                        <p className="text-gray-600 text-lg">No hay juegos en el carrito.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {cart.map((game) => (
                                <Link href={`/game/${game.id}`} key={game.id}>
                                    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
                                        <img
                                            src={game.image}
                                            alt={game.name}
                                            className="w-full h-40 object-cover rounded-lg"
                                        />
                                        <h3 className="mt-4 text-lg font-semibold text-gray-900 text-center">
                                            {game.name}
                                        </h3>
                                        <p className="text-center text-green-600 text-lg mt-2">
                                            {game.price?.toFixed(2)} €
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                {/* Mensajes enviados */}
                <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <img src="images/buzon.png" alt="icono-corazón" className="w-6 h-6" />
                        Mensajes enviados
                    </h2>
                    {messages.length === 0 ? (
                        <p className="text-gray-600 text-lg">No has enviado ningún mensaje aún.</p>
                    ) : (
                        <ul className="space-y-4">
                            {messages.map((msg) => (
                                <li key={msg.id} className="bg-white p-4 rounded-lg shadow-md">
                                    <p className="text-sm text-gray-500 mb-2">
                                        <strong>Fecha:</strong>{' '}
                                        {msg.createdAt?.toDate().toLocaleString() || 'Desconocida'}
                                    </p>
                                    <p><strong>Nombre:</strong> {msg.name}</p>
                                    <p><strong>Email:</strong> {msg.email}</p>
                                    <p><strong>Mensaje:</strong> {msg.message}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </main>
        </ProtectedRoute>
    );
}