export interface IHospital {
    id: number,
    name: string,
    address: string,
    longitude: string,
    latitude: string,
    createdAt: string,
    updatedAt: string
}

export interface INewHospital {
    name: string,
    address: string,
    latitude: string,
    longitude: string
}