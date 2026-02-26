export interface PokemonProps {
  id: number;
  name: string;
  height: number;
  weight: number;

  sprites: {
    front_default: string;
  };

  types: {
    type: {
      name: string;
    };
  }[];

  abilities: {
    ability: {
      name: string;
    };
  }[];
};

export interface PokemonListItemProps {
  name: string;
  url: string;
};

interface PokemonListResponseProps {
  results: PokemonListItemProps[];
  next: string | null;
  previous: string | null;
};

export const getAllPokemon = async (url: string): Promise<PokemonListResponseProps> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch pokemon list");
  }

  return response.json();
};

export const getPokemon = async (url: string): Promise<PokemonProps> => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
