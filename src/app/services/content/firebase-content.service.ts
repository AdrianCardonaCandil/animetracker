import { Injectable } from '@angular/core';
import { Firestore, QueryConstraint, QueryFilterConstraint, WhereFilterOp, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore/lite';
import { FirebaseService } from '../firebase.service';
import { Content, contentAtributeNames, contentProps, parseContent } from '../../schemas/Content.scheme';

interface filterOptions {
  limit?:number,
  orderBy?:{'field':contentAtributeNames, 'order':'asc'|'desc'},
  startAt?:number,
  endAt?:number,
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
  findById = (id:string, coll:string) => getDoc(doc(this.db, coll, String(id))).then(res => res.data()).then(data => data ? data : null);

  // Inserts an anime in the database collection of contents.
  create = async (content:Content, coll:string) => {
    try {
      if (await this.findById(content.id, coll)) return null;
      else {
        console.log(content);
        await setDoc(doc(this.db, coll, String(content.id)), JSON.parse(JSON.stringify(content)));
        return this.findById(content.id, coll).then(content => content ? content : null);
      }
    } catch (error) {
      console.log(`Error al crear el contenido con id ${content.id} en la base de datos.`, error);
      return null;
    }
  }

  // Filters in the database collection of contents based in some parameters
  find = (props:[[contentAtributeNames, WhereFilterOp, string]], opts:filterOptions) => { 
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
        case 'limit': case 'startAt': case 'endAt':
          options.push(this.opts[key](value));
          break;
      }
    }

    return getDocs(query(collection(this.db, this.coll), this.opts.join[opts.join](...constraints), ...options)).then(data => data.docs ? data.docs.map(elem => elem.data()) : null);
  }
}