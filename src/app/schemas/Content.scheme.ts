export type contentAtributeNames = 'id'|'title'|'synopsis'|'score'|'status'|'episodesNumber'|'type'|'source'|
'duration'|'cover'|'background'|'year'|'season'|'genres'|'studios';

export interface Content {
    readonly id:number;
    title:string;
    synopsis:string;
    score:number;
    status:string;
    episodes:number;
    type:string;
    source:string;
    duration:string;
    coverimage:string;
    backgroundimage:string;
    year:number;
    season:string;
    rating:string;
    genres:string[],
    studios:string[]
}

export type contentProps = {id:number, mal_id:number, title:string, synopsis:string, score:number; status:string; episodes:number; rating:string, type:string; source:string; duration:string; coverimage:string; backgroundimage:string; images:{jpg:{large_image_url:string}}, trailer:{images:{maximum_image_url:string}}, year:number; season:string; genres:string[]|[{name:string}], studios:string[]|[{name:string}]};

export function parseContent (props:contentProps):Content|null {
    try {
        return {
            id: props.id || props.mal_id,
            title: props.title,
            synopsis: props.synopsis,
            score:props.score,
            status:props.status,
            episodes:props.episodes,
            type:props.type,
            source:props.source,
            rating:props.rating,
            duration:props.duration,
            coverimage: props.coverimage || props.images?.jpg.large_image_url || props.trailer?.images.maximum_image_url,
            backgroundimage: props.backgroundimage || props.trailer.images.maximum_image_url || props.images.jpg.large_image_url,
            year:props.year,
            season:props.season,
            genres:<string[]>(typeof props.genres[0] == 'string' ? props.genres : props.genres.map(elem => (<{name:string}>elem).name.toLowerCase())),
            studios:<string[]>(typeof props.studios[0] == 'string' ? props.studios : props.studios.map(elem => (<{name:string}>elem).name.toLowerCase())),
        }
    } catch(error){
        console.log('Error parsing content', error);
        return null;
    }
}