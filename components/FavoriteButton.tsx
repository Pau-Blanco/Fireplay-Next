'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface Game {
  id: number;
  name: string;
  image: string;
}

interface FavoriteButtonProps {
  game: Game;
}

export default function FavoriteButton({ game }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const ref = doc(db, 'favoritos', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const favoritos = snap.data().items as Game[] || [];
          const found = favoritos.find((f) => f.id === game.id);
          setIsFavorite(!!found);
        }
      }
    });
    return () => unsubscribe();
  }, [game.id]);

  const toggleFavorite = async () => {
    if (!userId) return alert('Debes iniciar sesión para guardar favoritos');

    const ref = doc(db, 'favoritos', userId);
    const snap = await getDoc(ref);
    const favoritos = snap.exists() ? (snap.data().items as Game[]) : [];

    let updated: Game[];
    if (isFavorite) {
      updated = favoritos.filter((f) => f.id !== game.id);
    } else {
      updated = [...favoritos, game];
    }

    await setDoc(ref, { items: updated });
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`text-xl ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:scale-110 transition`}
      title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
    >
      ❤️
    </button>
  );
}