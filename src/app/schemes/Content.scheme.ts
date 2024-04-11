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

export function parseContent ({id, malid, title, synopsis, score, status, episodesNumber,
     type, source, duration, cover, background, images, trailer, year, season, genres,
      studios}:{id:string, malid:string, title:string, synopsis:string, score:number,
         status:string, episodesNumber:number, type:string, source:string, duration:string,
          cover:string, background:string, images:{jpg:{large_image_url:string}},
           trailer:{images:{maximum_image_url:string}}, year:number, season:string,
            selfgenres:string[], genres:[{name:string}]|string[], studios:string[]}):Content|null {
    try {
        return {
            id: id || malid,
            title,
            synopsis,
            score,
            status,
            episodesNumber,
            type,
            source,
            duration,
            cover: cover || images?.jpg.large_image_url || trailer.images?.maximum_image_url,
            background: background || trailer.images?.maximum_image_url || images?.jpg.large_image_url,
            year,
            season,
            genres:<string[]>(typeof genres[0] == 'string' ? genres : genres.map(elem => (<{name:string}>elem).name.toLowerCase())),
            studios
        }
    } catch(error){
        console.log('Error parsing content', error);
        return null;
    }
}