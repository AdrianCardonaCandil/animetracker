import { Injectable } from '@angular/core';
import { DocumentData, FieldValue, Firestore, QueryConstraint, QueryFilterConstraint, WhereFilterOp, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, increment, query, setDoc, updateDoc, where } from 'firebase/firestore/lite';
import { FirebaseService } from '../firebase.service';
import { Content, contentAtributeNames, contentProps, parseContent } from '../../schemas/Content.scheme';
import { Characters } from '../../schemas/Characters.scheme';
import { Episodes, episodesAttributesNames, parseEpisodes } from '../../schemas/Episodes.schema';
import { Character } from '../../schemas/Character.scheme';

export default interface filterOptions {
  limit?:number,
  orderBy?:{'field':contentAtributeNames, 'order':'asc'|'desc'},
  join?:'or'|'and';
}

@Injectable({
  providedIn: 'root'
})

export class FirebaseContentService {

  // Content collection in our firebase database.
  private _coll;

  constructor(private firebase: FirebaseService) {
    this._coll = "Contents";
  }

  public get db():Firestore {return this.firebase.db};
  public get coll() {return this._coll};
  public get opts() {return this.firebase.optParser};

  // Gets an anime from the database collection of contents based on contentid.
  findById = (id:number, coll:string) => getDoc(doc(this.db, coll, String(id))).then(res => res.data()).then(data => data ? data : null);

  // Inserts an anime in the database collection of contents.
  create = async (data:Content|Characters|Episodes|Character, coll:string) => {
    try {
      if (await this.findById(data.id, coll)) return null;
      else {
        await setDoc(doc(this.db, coll, String(data.id)), JSON.parse(JSON.stringify(data)));
        return this.findById(data.id, coll).then(content => content ? content : null);
      }
    } catch (error) {
      console.log(`Error al crear el dato con id ${data.id} en la coleccion con nombre ${coll}.`, error);
      return null;
    }
  }

  // Filters in the database collection of contents based in some parameters
  find = (props:[contentAtributeNames, WhereFilterOp, string][], opts:filterOptions) => {
    let constraints:QueryFilterConstraint[] = [];
    props.forEach(elem => {
      constraints.push(where(elem[0], elem[1], elem[2])); // Operators avaliable = <, <=, ==, >=, >. array-contains
    });

    let options = [];

    // Handling orderBy if requested by user.
    opts.orderBy && (opts.orderBy.order = opts.orderBy.order ? opts.orderBy.order : 'asc');
    opts.orderBy && options.push(this.opts.orderBy(opts.orderBy.field, opts.orderBy.order));
    delete opts.orderBy;

    // Selecting join option for filters if not selected by user (default = 'or')
    if (!opts.join) opts.join = 'or';

    for (let [key, value] of Object.entries(opts)){
      switch(key){
        case 'limit':
          options.push(this.opts[key](value));
          break;
      }
    }

    return getDocs(query(collection(this.db, this.coll), this.opts.join[opts.join](...constraints), ...options)).then(data => data.docs ? data.docs.map(elem => parseContent(elem.data() as contentProps)) : null);
  }

  /* Prueba de función de actualización para coleccion determinada.*/
  updateContent = async (props:{[key in contentAtributeNames]?:string|number|FieldValue}, id:string):Promise<Content|null> => {
    try {
      await updateDoc(doc(this.db, this.coll, id), props);
      return this.findById(Number(id), this.coll).then(content => content ? parseContent(content as contentProps) : null);
    } catch (error) {
      console.log(`Fallo al actualizar la coleccion contents`, error);
      return null
    }
  }

  updateEpisodes = async (props:{[key in episodesAttributesNames]?:string|number|FieldValue}, id:string):Promise<DocumentData|null> => {
    try {
      await updateDoc(doc(this.db, "Episodes", id), props);
      return this.findById(Number(id), "Episodes").then(episodes => episodes ? episodes : null);
    } catch (error) {
      console.log(`Fallo al actualizar la coleccion episodes`, error);
      return null
    }
  }

  like = async (userId:string, contentId:string) => {
    try {
      const userDocRef = doc(this.db, "Users", userId);
      const contentDocRef = doc(this.db, this.coll, contentId);

      // Check if the content is already in favorites
      const userDocSnapshot = await getDoc(userDocRef);
      const contentDocSnapshot = await getDoc(contentDocRef);
      if (!userDocSnapshot.exists()) {
        return false;
      }

      const userData = userDocSnapshot.data();
      const contentData = contentDocSnapshot.data();
      const favorites = userData["favorites"] || [];
      if (favorites.includes(contentId)) {
        await updateDoc(contentDocRef, {
          likes: increment(-1)
        });
        await updateDoc(userDocRef, {
          favorites: arrayRemove(contentId)
        });
        return contentData ? contentData["likes"] - 1 : 0
      }

      await updateDoc(contentDocRef, {
        likes: increment(1)
      });

      await updateDoc(userDocRef, {
        favorites: arrayUnion(contentId)
      });
      return contentData ? contentData["likes"] + 1 : 0

    } catch (error) {
      return false;
    }
  }
}
