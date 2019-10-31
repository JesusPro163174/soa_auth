import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,DocumentChangeAction } from '@angular/fire/firestore';
import { IUser,UStatus } from '../interfaces/iuser';
import { Observable, } from 'rxjs';
import * as firebase from 'firebase/app';
@Injectable({
    providedIn: 'root'
})
export class UserService {

    public user:Observable<IUser[]>;
    public userColletion:AngularFirestoreCollection<IUser>;
    public recoverPassword:Observable<any>;
    public recoverCollection:AngularFirestoreCollection<any>;
    constructor(private afs:AngularFirestore) {
       
    }

    setCollection(){
        this.userColletion = this.afs.collection<IUser>('users');
    }
    setCollectionRecover(){
        this.recoverCollection = this.afs.collection('recoveracount');
    }
    //collections users
    setCollectionLogin(user){
        this.userColletion = this.afs.collection<IUser>('users',(ref)=>{
            return ref.where('email','==',user.email).where('password','==',user.password)
            .where('status','==',0);
        })
    }
    setCollectionOnlyEmail(email:string){
        this.userColletion = this.afs.collection<IUser>('users',(ref)=>{
            return ref.where('email','==',email)
        })
    }
    setCollectionByToken(token:string){
        this.userColletion = this.afs.collection<IUser>('users',(ref)=>{
            return ref.where('token','==',token);
        });
    }
    activateAccount(user:any,id:string){
        this.afs.collection<IUser>('users').doc(id).set(user);
    }
    getUserCollectionByToken(token:string){
        this.setCollectionByToken(token);
        return this.userColletion.snapshotChanges();
    }
    getuserByEmail(user:any){
        this.setCollectionOnlyEmail(user.email);
        return this.userColletion.snapshotChanges();
    }
    add(user){
        if(!this.userColletion) this.setCollection();
        const createdAt = firebase.firestore.FieldValue.serverTimestamp();
        user.createdAt = createdAt;
        user.status = UStatus.inactivo;
        return this.userColletion.add(user);
    }
    login(user:any){
        this.setCollectionLogin(user);
        return this.userColletion.snapshotChanges();
    }

    //collections recoveraccount
    addRecover(user:any,token:string){
        //settear coleccion de recordar contraseña
        if(!this.recoverCollection) this.setCollectionRecover();
        return this.recoverCollection.add({
            token:token,
            email:user.email
        });
        //buscar si hay un email registrado con el email dado
        /*this.setCollectionOnlyEmail(user.email);

        //obtener el usuario

        return this.userColletion.snapshotChanges().subscribe(actions =>{
            actions.map(items => {
                //;
                return items.payload.doc.data();
            })
        })

        //;*/
    }
}
