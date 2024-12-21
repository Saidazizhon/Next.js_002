export default async function PokemonDetail({ params }) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);

  if (!res.ok) {
    console.error('Failed to fetch Pokémon details:', res.statusText);
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Pokémon Not Found</h1>
        <p className="text-gray-600">The requested Pokémon could not be found. Please try another one.</p>
      </div>
    );
  }

  const pokemon = await res.json();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4 capitalize">{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-48 h-48 mb-4"
      />
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
        <p className="text-lg text-black font-medium">Height: <span className="font-normal">{pokemon.height}</span></p>
        <p className="text-lg text-black font-medium">Weight: <span className="font-normal">{pokemon.weight}</span></p>
        <p className="text-lg text-black font-medium">Base Experience: <span className="font-normal">{pokemon.base_experience}</span></p>
      </div>
    </div>
  );
}
