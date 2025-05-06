'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('');

        if (!form.name || !form.email || !form.message) {
            setStatus('Por favor, completa todos los campos.');
            return;
        }

        try {
            await addDoc(collection(db, 'mensajes'), {
                ...form,
                createdAt: Timestamp.now(),
            });

            setForm({ name: '', email: '', message: '' });
            setStatus('Mensaje enviado con éxito ✅');
        } catch {
            setStatus('Ocurrió un error al enviar el mensaje ❌');
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-blue-200">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
            >
                <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Contáctanos</h1>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Tu nombre"
                        value={form.name}
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
                        placeholder="Tu correo electrónico"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Mensaje
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Escribe tu mensaje aquí"
                        value={form.message}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                {status && (
                    <p
                        className={`text-center text-sm mb-4 ${status.includes('✅') ? 'text-green-600' : 'text-red-500'
                            }`}
                    >
                        {status}
                    </p>
                )}
                <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
                >
                    Enviar mensaje
                </button>
            </form>
        </main>
    );
}
