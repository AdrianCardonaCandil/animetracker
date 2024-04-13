export type contentAtributeNames = 'id'|'title'|'synopsis'|'score'|'status'|'episodesNumber'|'type'|'source'|
'duration'|'cover'|'background'|'year'|'season'|'genres'|'studios';

export interface Content {
    readonly id:string;
    title:string;
    synopsis:string;
    score:number;
    status:string;
    episodesNumber:number;
    type:string;
    source:string;
    duration:string;
    cover:string;
    background:string;
    year:number;
    season:string;
    genres:string[],
    studios:string[]
}

export type firebaseContentProps = {id:string, title:string, synopsis:string, score:number; status:string; episodesNumber:number; type:string; source:string; duration:string; cover:string; background:string; year:number; season:string; genres:string[], studios:string[]};
export type jikanContentProps = {mal_id:string, title:string, synopsis:string, score:number; status:string; episodesNumber:number; type:string; source:string; duration:string; images:{jpg:{large_image_url:string}}, trailer:{images:{maximum_image_url:string}}, year:number; season:string;  genres:[{name:string}], studios:[{name:string}]};

export function parseContent (firebase?:firebaseContentProps, jikan?:jikanContentProps):Content|null {
    try {
        if (jikan){
            return {
                ...jikan, 
                id: jikan.mal_id, 
                cover: jikan.images?.jpg.large_image_url || jikan.trailer.images?.maximum_image_url,
                background: jikan.trailer.images?.maximum_image_url || jikan.images?.jpg.large_image_url,
                genres: jikan.genres.map(elem => elem.name.toLowerCase()),
                studios: jikan.studios.map(elem => elem.name.toLowerCase())
            } 
        }
        if (firebase){
            return {...firebase};
        }
        return null;
    } catch(error){
        console.log('Error parsing content', error);
        return null;
    }
}