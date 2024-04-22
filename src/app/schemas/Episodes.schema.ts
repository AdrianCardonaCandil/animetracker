export interface Episodes {
    episodes:{data:{
        number:number,
        title:string,
        romanji:string
        aired:string
    }[], page:number}[],
    id:number
}

export type episodesProps = [[{
    number:number,
    title:string,
    romanji:string,
    aired:string,
    mal_id:number
    title_romanji:string
}], number]

export function parseEpisodes(props:episodesProps, content_id:number, pages?:number[]):Episodes|null{
    try {
        return {
            episodes: [{data:props[0].map(elem => {
                return {
                    number:elem.number || elem.mal_id,
                    title:elem.title,
                    romanji:elem.romanji || elem.title_romanji,
                    aired:elem.aired
                }
            }), page:props[1]}],
            id: content_id
        }
    } catch (error) {
        console.log('Error parsing episodes', error);
        return null;
    }
}