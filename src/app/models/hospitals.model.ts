export interface IHospital {
    id: number;
    name: string;
    address: string;
    image_url: string;
    longitude: string;
    latitude: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string
}

export interface INewHospital {
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    imageUrl: string;
}
