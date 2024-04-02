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

    #buildGenres = ():Array<String> => {
        return ["Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Horror", "Mahou Shoujo", "Mecha", "Musical",
                "Mystery", "Psychological", "Romance", "SciFi", "Slice Of Life", "Sports", "Supernatural", "Thriller"];
    }

    #buildSeason = ():Array<String> => {
        return ["Winter", "Spring", "Summer", "Fall"];
    }

    #buildFormat = ():Array<String> => {
        return ["TvShow", "Movie", "TvShort", "Special", "Ova", "Ona", "Music"]
    }

    #buildYear = ():Array<String> => {
        const years:Array<String> = [];
        for (let i = 2025; i >= 1940; i--){
            years.push(String(i));
        }
        return years;
    }
      
}