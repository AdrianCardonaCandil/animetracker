import { Content } from "../schemas/Content.scheme";

export default interface Contents {
    search(params:Object):Promise<Object|[]>
}