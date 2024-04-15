export interface Character {
    id:number,
    image:string,
    name:string,
    about:string
}

export type characterProps = {id:number, mal_id:number, image:string, name:string, about:string, images:{jpg:{image_url:string}}};

export function parseCharacter (props:characterProps):Character|null {
    try {
        return {
            id: props.id || props.mal_id,
            name:props.name,
            image:props.image || props.images.jpg.image_url,
            about:props.about
        }
    } catch(error) {
        console.log('Error parsing character', error);
        return null;
    }
}