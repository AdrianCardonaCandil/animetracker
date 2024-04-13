export class optionsBuilder {

    getOptions = () => {
        return [
            this.#buildGenres(),
            this.#buildYear(),
            this.#buildSeason(),
            this.#buildFormat(),
        ]
    }

    getKeys = () => {
        return ["Genres", "Year", "Season", "Format"];
    }

    #buildGenres = ():string[] => {
        return ['Action', 'Adventure', 'Avant Garde', 'Award Winning', 'Boys Love', 'Comedy', 'Drama', 'Fantasy',
        'Girls Love', 'Gourmet', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Suspense',
        'Ecchi', 'Erotica', 'Hentai', 'Adult Cast', 'Anthropomorphic', 'CGDCT', 'Childcare', 'Combat Sports', 'Crossdressing',
        'Delinquents', 'Detective', 'Educational', 'Gag Humor', 'Gore', 'Harem', 'High Stakes Game', 'Historical', 'Idols (Female)',
        'Idols (Male)', 'Isekai', 'Iyashikei', 'Love Polygon', 'Magical Sex Shift', 'Mahou Shoujo', 'Martial Arts', 'Mecha',
        'Medical', 'Military', 'Music', 'Mythology', 'Organized Crime', 'Otaku Culture', 'Parody', 'Performing Arts', 'Pets',
        'Psychological', 'Racing', 'Reincarnation', 'Reverse Harem', 'Romantic Subtext', 'Samurai', 'School', 'Showbiz', 'Space',
        'Strategy Game', 'Super Power', 'Survival', 'Team Sports', 'Time Travel', 'Vampire', 'Video Game', 'Visual Arts', 'Workplace',
        'Josei', 'Kids', 'Seinen', 'Shoujo', 'Shounen'];
    }

    #buildSeason = ():string[] => {
        return ["Winter", "Spring", "Summer", "Fall"];
    }

    #buildFormat = ():string[]=> {
        return ["TvShow", "Movie", "TvShort", "Special", "Ova", "Ona", "Music"]
    }

    #buildYear = ():number[] => {
        const years:number[]= [];
        for (let i = 2025; i >= 1940; i--){
            years.push(i);
        }
        return years;
    }
      
}