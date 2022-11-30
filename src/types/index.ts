import { List } from "@mui/material"

export type User = 
{
    name: string,
    lastName: string,
    phone: string,
}

export type Helper = 
{
    name: string,
    lastname: string,
    phone: string,
    ID: string,
    photo: string,
    services: service [],
}

export type service ={
    name: string,
    price: number,

}

export type UserRequeriment = 
{
    id: string,
    user: User,
    category: string,
    description: string,
}

export type AppState = {
    step: number,
    userRequeriment: UserRequeriment,
}

export type HelperAppState = {
    step: number,
}

export const listservice = [
   'Servicios de cocinero', 'Limpieza a domicilio',
   'Traer mandando', 'Enseñar un instrumento'];