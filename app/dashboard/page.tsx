"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore"
import ProtectedRoute from "@/components/ProtectedRoute"
import Link from "next/link"

interface Game {
    id: number
    name: string
    image: string
    price?: number
}

interface Message {
    id: string
    name: string
    email: string
    message: string
    createdAt?: any
}

export default function DashboardPage() {
    const [userData, setUserData] = useState<{ name: string | null; email: string | null }>({
        name: null,
        email: null,
    })
    const [favorites, setFavorites] = useState<Game[]>([])
    const [cart, setCart] = useState<Game[]>([])
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserData({
                    name: user.displayName,
                    email: user.email,
                })

                // Cargar favoritos
                const favRef = doc(db, "favoritos", user.uid)
                const favSnap = await getDoc(favRef)
                if (favSnap.exists()) {
                    setFavorites(favSnap.data().items || [])
                }

                // Cargar carrito
                const cartRef = doc(db, "carritos", user.uid)
                const cartSnap = await getDoc(cartRef)
                if (cartSnap.exists()) {
                    setCart(cartSnap.data().items || [])
                }

                // Cargar mensajes enviados
                const mensajesRef = collection(db, "mensajes")
                const q = query(mensajesRef, where("email", "==", user.email))
                const snap = await getDocs(q)
                const msgList = snap.docs.map((doc) => {
                    const data = doc.data()
                    return {
                        id: doc.id,
                        name: data.name || "Desconocido",
                        email: data.email || "Desconocido",
                        message: data.message || "Sin mensaje",
                        createdAt: data.createdAt || null,
                    }
                })
                setMessages(msgList)
            }
        })
        return () => unsubscribe()
    }, [])

    return (
        <ProtectedRoute>
            <main className="p-6 md:p-8 text-gray-800 max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center relative">
                    <span className="relative inline-block">
                        Panel de Usuario
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-300 to-gray-100"></span>
                    </span>
                </h1>

                {/* Información personal */}
                <section className="bg-white p-6 md:p-8 rounded-2xl shadow-lg mb-10 border border-gray-100 transition-all hover:shadow-xl">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                        <span className="w-1.5 h-6 bg-gray-800 rounded-full mr-3"></span>
                        Información personal
                    </h2>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-4xl font-bold text-gray-700 shadow-inner">
                            👤
                        </div>
                        <div className="bg-gray-50 p-5 rounded-xl flex-1">
                            <p className="text-lg mb-2 flex items-center">
                                <span className="font-semibold w-24">Nombre:</span>
                                <span className="bg-white px-4 py-2 rounded-lg border border-gray-100 flex-1">
                                    {userData.name || "No disponible"}
                                </span>
                            </p>
                            <p className="text-lg flex items-center">
                                <span className="font-semibold w-24">Email:</span>
                                <span className="bg-white px-4 py-2 rounded-lg border border-gray-100 flex-1">{userData.email}</span>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Juegos favoritos */}
                <section className="mb-10 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                        <img src="images/me-gusta.png" alt="icono-corazón" className="w-6 h-6 mr-3" />
                        Juegos favoritos
                    </h2>
                    {favorites.length === 0 ? (
                        <div className="bg-gray-50 p-8 rounded-xl text-center">
                            <p className="text-gray-600 text-lg">No tienes juegos marcados como favoritos.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {favorites.map((game) => (
                                <Link href={`/game/${game.id}`} key={game.id}>
                                    <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={game.image || "/placeholder.svg"}
                                                alt={game.name}
                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-900 text-center group-hover:text-gray-700 transition-colors">
                                                {game.name}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                {/* Carrito actual */}
                <section className="mb-10 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                        <img src="images/carro-de-la-compra.png" alt="icono-carrito" className="w-6 h-6 mr-3" />
                        Carrito actual
                    </h2>
                    {cart.length === 0 ? (
                        <div className="bg-gray-50 p-8 rounded-xl text-center">
                            <p className="text-gray-600 text-lg">No hay juegos en el carrito.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {cart.map((game) => (
                                <Link href={`/game/${game.id}`} key={game.id}>
                                    <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={game.image || "/placeholder.svg"}
                                                alt={game.name}
                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-900 text-center group-hover:text-gray-700 transition-colors">
                                                {game.name}
                                            </h3>
                                            <p className="text-center text-green-600 font-medium text-lg mt-2 bg-green-50 py-1 rounded-lg">
                                                {game.price?.toFixed(2)} €
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                {/* Mensajes enviados */}
                <section className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                        <img src="images/buzon.png" alt="icono-corazón" className="w-6 h-6 mr-3" />
                        Mensajes enviados
                    </h2>
                    {messages.length === 0 ? (
                        <div className="bg-gray-50 p-8 rounded-xl text-center">
                            <p className="text-gray-600 text-lg">No has enviado ningún mensaje aún.</p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {messages.map((msg) => (
                                <li key={msg.id} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex flex-wrap justify-between items-center mb-3 pb-2 border-b border-gray-200">
                                        <p className="text-sm text-gray-500">
                                            <span className="font-medium">Fecha:</span>{" "}
                                            {msg.createdAt?.toDate().toLocaleString() || "Desconocida"}
                                        </p>
                                        <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                                            Mensaje #{msg.id.slice(0, 4)}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <p className="bg-white p-3 rounded-lg border border-gray-100">
                                            <span className="font-medium text-gray-700">Nombre:</span> {msg.name}
                                        </p>
                                        <p className="bg-white p-3 rounded-lg border border-gray-100">
                                            <span className="font-medium text-gray-700">Email:</span> {msg.email}
                                        </p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                                        <p className="font-medium text-gray-700 mb-2">Mensaje:</p>
                                        <p className="text-gray-600 italic">{msg.message}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </main>
        </ProtectedRoute>
    )
}
