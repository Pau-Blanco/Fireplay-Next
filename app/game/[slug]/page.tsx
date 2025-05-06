// app/game/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import FavoriteButton from '@/components/FavoriteButton';

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export default function GameDetailPage() {
    const { slug } = useParams();
    const [game, setGame] = useState<any>(null);
    const [screenshots, setScreenshots] = useState<any[]>([]);

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            const resGame = await fetch(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`);
            const dataGame = await resGame.json();
            setGame(dataGame);

            const resScreens = await fetch(`https://api.rawg.io/api/games/${slug}/screenshots?key=${API_KEY}`);
            const dataScreens = await resScreens.json();
            setScreenshots(dataScreens.results || []);
        };

        fetchData();
    }, [slug]);

    if (!game) return <p className="p-4">Cargando...</p>;

    return (
        <main className="p-6 text-gray-800 mx-[10%]">
            {/* Título del juego */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
                {game.name}
                <FavoriteButton game={{ id: game.id, name: game.name, image: game.background_image }} />
            </h1>

            {/* Contenedor principal para imagen y descripción */}
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                {/* Imagen destacada */}
                <div className="relative w-full md:w-1/2 max-h-[600px] overflow-hidden rounded-lg shadow-lg">
                    <img
                        src={game.background_image}
                        alt={game.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {/* Información debajo de la imagen */}
                    <div className="mt-4 text-gray-900 mx-[10%] my-5">
                        <p className="text-lg font-semibold">Rating: {game.rating} / 5</p>
                        <p className="text-lg mt-2">
                            <strong>Plataformas:</strong> {game.platforms?.map((p: any) => p.platform.name).join(', ')}
                        </p>
                        <p className="text-lg mt-1">
                            <strong>Géneros:</strong> {game.genres?.map((g: any) => g.name).join(', ')}
                        </p>
                    </div>

                </div>

                {/* Descripción del juego */}
                <div className="text-gray-700 prose max-w-none md:w-1/2 text-justify">
                    <div dangerouslySetInnerHTML={{ __html: game.description }} />
                </div>
            </div>

            {/* Botón para ir a la ficha de compra */}
            <div className="mb-8">
                <Link
                    href={`/product-sheety/${slug}`}
                    className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-700 transition tracking-widest"
                >
                    FICHA DE COMPRA
                </Link>
            </div>

            {/* Requisitos mínimos */}
            {game?.requirements && game.requirements.minimum && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Requisitos Mínimos</h2>
                    <p className="text-gray-700">{game.requirements.minimum}</p>
                </div>
            )}

            {/* Capturas de pantalla */}
            {screenshots.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Capturas de pantalla</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {screenshots.map((img) => (
                            <div key={img.id} className="overflow-hidden rounded-lg shadow-md">
                                <img
                                    src={img.image}
                                    alt="Screenshot"
                                    className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}