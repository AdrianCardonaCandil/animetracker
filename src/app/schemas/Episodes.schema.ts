export interface Episodes {
    episodes:{
        number:number,
        title:string,
        romanji:string
        aired:string
    }[],
    id:number
}

export type episodesProps = [{
    number:number,
    title:string,
    romanji:string,
    aired:string,
    mal_id:number
    title_romanji:string
}]

export function parseEpisodes(props:episodesProps, content_id:number):Episodes|null{
    try {
        return {
            episodes: props.map(elem => {
                return {
                    number:elem.number || elem.mal_id,
                    title:elem.title,
                    romanji:elem.romanji || elem.title_romanji,
                    aired:elem.aired
                }
            }),
            id: content_id
        }
    } catch (error) {
        console.log('Error parsing episodes', error);
        return null;
    }
}