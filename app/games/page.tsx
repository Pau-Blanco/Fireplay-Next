'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const PAGE_SIZE = 12;

export default function GamesPage() {
    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);

    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    useEffect(() => {
        const fetchGames = async () => {
            let url = `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=${PAGE_SIZE}`;

            // Si hay búsqueda, añadir el parámetro
            if (query) {
                url += `&search=${encodeURIComponent(query)}`;
            }

            const res = await fetch(url);
            const data = await res.json();
            setGames(data.results);
        };

        fetchGames();
    }, [page, query]); // añadir `query` para actualizar la búsqueda

    return (
        <main className="p-10 mx-[10%]">
            <h1 className="text-2xl font-bold mb-4">
                {query ? `Resultados para "${query}"` : 'Catálogo de Juegos'}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {games.map((game: any) => (
                    <Link href={`/game/${game.slug}`} key={game.id}>
                        <div className="bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 cursor-pointer border border-gray-200">
                            <img
                                src={game.background_image}
                                alt={game.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="font-semibold text-lg text-gray-800">{game.name}</h2>
                                <p className="text-sm text-gray-600 mt-2">Rating: {game.rating}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="flex justify-center mt-10 gap-4">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                    Anterior
                </button>
                <span className="self-center">Página {page}</span>
                <button
                    onClick={() => setPage((p) => p + 1)}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                    Siguiente
                </button>
            </div>
        </main>
    );
}