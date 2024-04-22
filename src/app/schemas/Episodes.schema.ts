export type episodesAttributesNames = 'episodes'|'id'|'pages';

export interface Episodes {
    episodes:{data:{
        number:number,
        title:string,
        romanji:string
        aired:string
    }[], page:number}[],
    id:number,
    pages:number[]
}

export type episodesProps = {
    episodes:{data:{
        number:number,
        title:string,
        romanji:string,
        aired:string,
        mal_id:number
        title_romanji:string
    }[], page:number}[],
    id:number,
    pages:number[]
}

export function parseEpisodes(props:episodesProps):Episodes|null{
    try {
        return {
            episodes: props.episodes.map((elem) => {
                return {
                    data:elem.data.map((elem) => {
                        return {
                            number: elem.number || elem.mal_id,
                            title: elem.title,
                            romanji: elem.romanji || elem.title_romanji,
                            aired: elem.aired
                        }
                    }),
                    page:elem.page
                }
            }),
            id: props.id,
            pages: props.pages
        }
    } catch (error) {
        console.log('Error parsing episodes', error);
        return null;
    }
}