import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,DocumentChangeAction } from '@angular/fire/firestore';
import { IUser,UStatus } from '../interfaces/iuser';
import { Observable, } from 'rxjs';
import * as firebase from 'firebase/app';
import { importExpr } from '@angular/compiler/src/output/output_ast';
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
    }

    activateTwoStep(twoStep,user,user_id){
        const activate = this.afs.collection('twoSteps');
        activate.add(twoStep);
        user['two_step'] = true;
        this.activateAccount(user,user_id);
        localStorage.setItem('auth',JSON.stringify(user));
    }

    verify(code,user_id){
        console.log(code);
        console.log(user_id)
        return this.afs.collection('twoSteps',(ref)=>{
            return ref.where('user_id','==',107950).where('code','==','UFYDAFuTaTwRDxTIjCKX');
        }).snapshotChanges();
    }
}
