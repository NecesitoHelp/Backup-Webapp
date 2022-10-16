
export type User = 
{
    id: string,
    name: string,
    lastname: string,
    phone: string,
    

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