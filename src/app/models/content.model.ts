import { Character } from "../schemas/Character.scheme";
import { Characters } from "../schemas/Characters.scheme";
import { Content } from "../schemas/Content.scheme";
import { Episodes } from "../schemas/Episodes.schema";

export default interface Contents {
    findById(id:number):Promise<Content|null>
    create(content:Content):Promise<Content|null>
    search(params:Object):Promise<Object|[]>
    findCharacters(id:number):Promise<Characters|null>
    findEpisodes(id:number, page:number):Promise<Episodes|null>
    findCharacter(id:number):Promise<Character|null>
}