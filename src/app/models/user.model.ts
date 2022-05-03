import {IHospital} from "./hospitals.model";

export interface IUser {
    id: number;
    first_name: string,
    last_name: string,
    image_url: string,
    email: string,
    phone: string,
    type: string,
    profession: string,
    experience: number,
    createdAt: string,
    updatedAt: string,
    roleId: number,
    hospital?: IHospital[];
}