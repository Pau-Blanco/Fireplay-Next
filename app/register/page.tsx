// app/register/page.tsx
'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, AuthError } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface FormData {
    name: string;
    email: string;
    password: string;
}

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState<FormData>({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                form.email,
                form.password
            );
            await updateProfile(userCredential.user, { displayName: form.name });
            router.push('/login');
        } catch (err) {
            const error = err as AuthError;
            setError(error.message);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-blue-200">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
            >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Crear cuenta</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Ingresa tu nombre"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Ingresa tu correo"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Crea una contraseña"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                )}
                <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
                >
                    Registrarse
                </button>
                <p className="text-sm text-gray-600 mt-4 text-center">
                    ¿Ya tienes una cuenta?{' '}
                    <a
                        href="/login"
                        className="text-blue-600 hover:underline"
                    >
                        Inicia sesión aquí
                    </a>
                </p>
            </form>
        </main>
    );
}