'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialPokemons = async () => {
      setLoading(true);
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');

      if (!res.ok) {
        console.error('Failed to fetch initial Pokémon list:', res.statusText);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setPokemons(data.results);
      setOffset(20);
      setLoading(false);
    };

    fetchInitialPokemons();
  }, []);

  const loadMorePokemons = async () => {
    setLoading(true);
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`);

    if (!res.ok) {
      console.error('Failed to fetch more Pokémon:', res.statusText);
      setLoading(false);
      return;
    }

    const data = await res.json();
    setPokemons((prev) => [...prev, ...data.results]);
    setOffset((prev) => prev + 10);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Pokemon List</h1>
      {pokemons.length > 0 ? (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
            {pokemons.map((pokemon, index) => (
              <li
                key={index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <Link href={`/pokemon/${index + 1}`} className="text-blue-500 hover:underline">
                  {pokemon.name}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={loadMorePokemons}
            disabled={loading}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </>
      ) : (
        <p className="text-red-500">{loading ? 'Loading...' : 'Failed to load Pokémon list. Please try again later.'}</p>
      )}
    </div>
  );
}
