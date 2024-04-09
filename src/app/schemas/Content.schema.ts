// Content.schema.ts

export interface Content {
  readonly id: string;
  title: string;
  synopsis: string;
  score: number;
  status: string;
  episodesNumber: number;
  type: string;
  source: string;
  duration: number;
  coverImg: string;
  backgroundImg: string;
  year: Date;
  season: string;
  studio: string;
  episodes: number;
  characters: string[];
}

export function parseContent(data: any): Content | null {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const {
    id,
    title,
    synopsis,
    score,
    status,
    episodesNumber,
    type,
    source,
    duration,
    coverImg,
    backgroundImg,
    year,
    season,
    studio,
    episodes,
    characters
  } = data;


  if (!id || !title || !synopsis || !score || !status || !episodesNumber || !type || !source || !duration || !coverImg || !backgroundImg || !year || !season || !studio || !episodes || !characters) {
    return null;
  }

  return {
    id: String(id),
    title: String(title),
    synopsis: String(synopsis),
    score: Number(score),
    status: String(status),
    episodesNumber: Number(episodesNumber),
    type: String(type),
    source: String(source),
    duration: Number(duration),
    coverImg: String(coverImg),
    backgroundImg: String(backgroundImg),
    year: new Date(year), // Assuming year is provided as a string or number representing a valid date
    season: String(season),
    studio: String(studio),
    episodes: Number(episodes),
    characters: Array.isArray(characters) ? characters.map((character: any) => String(character)) : [] // Assuming characters is an array of strings
  };
}
