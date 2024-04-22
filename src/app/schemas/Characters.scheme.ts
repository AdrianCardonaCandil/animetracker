export interface Characters {
    characters: {
        id: number,
        name: string,
        role: string,
        image: string
    }[],
    id:number
}

export type charactersProps = [{
    id:number;
    name:string;
    image:string;
    character:{
        mal_id:number, 
        images:{
            jpg:{
                image_url:string
            }
        },
        name:string
    },
    role:string
}]

export function parseCharacters(props:charactersProps, content_id:number):Characters|null {
   
    try {
        return {
            characters: props.map(elem => {
                return {
                    id:elem.id || elem.character.mal_id,
                    name:elem.name || elem.character.name,
                    role:elem.role,
                    image:elem.image || elem.character.images.jpg.image_url
                }
            }),
            id: content_id
        }
    } catch(error) {
        console.log('Error parsing characters', error);
        return null;
    }
}