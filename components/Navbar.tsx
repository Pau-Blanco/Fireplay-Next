'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        router.push('/');
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/games?q=${encodeURIComponent(search.trim())}`);
            setSearch('');
        }
    };

    return (
        <header className="py-4 px-6 bg-white text-black">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Logo */}
                <h1 className="text-2xl font-bold tracking-widest">
                    <Link href="/" className="hover:text-blue-300 transition">
                        FIREPLAY
                    </Link>
                </h1>

                {/* Navegación centrada */}
                <nav className="flex gap-6 items-center text-sm font-medium tracking-widest">
                    <Link href="/games" className="hover:text-blue-300 transition">
                        JUEGOS
                    </Link>
                    {user && (
                        <Link href="/favorites" className="hover:text-blue-300 transition">
                            FAVORITOS
                        </Link>
                    )}
                    {user && (
                        <Link href="/dashboard" className="hover:text-blue-300 transition">
                            DASHBOARD
                        </Link>
                    )}
                    <Link href="/contact" className="hover:text-blue-300 transition">
                        CONTACTO
                    </Link>
                    <Link href="/cart" className="hover:opacity-80 transition">
                        <img
                            src="/images/carro-de-la-compra.png"
                            alt="Carrito de la compra"
                            className="w-6 h-6"
                        />
                    </Link>
                </nav>

                {/* Barra de búsqueda */}
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar juegos..."
                        className="px-3 py-2 rounded-lg text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button
                        type="submit"
                        className="bg-gray-900 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm transition"
                    >
                        Buscar
                    </button>
                </form>

                {/* Inicio/Cierre de sesión */}
                <div className="flex items-center gap-4">
                    {!user && (
                        <>
                            <Link href="/login" className="hover:text-blue-300 transition">
                                Login
                            </Link>
                            <Link href="/register" className="hover:text-blue-300 transition">
                                Registro
                            </Link>
                        </>
                    )}
                    {user && (
                        <>
                            <span className="text-sm font-medium">
                                Hola, {user.displayName || user.email}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition"
                            >
                                Cerrar sesión
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}