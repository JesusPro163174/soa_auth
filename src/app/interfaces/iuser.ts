export enum UStatus{
    activo,
    inactivo
}
export interface IUser {
    id?:string;
    name?:string;
    email?:string;
    password?:string;
    phone?:string;
    createdAt?:string;
    token?:string;
}
