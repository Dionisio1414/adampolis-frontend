export interface IJobOffer {
    id: number;
    email: string;
    name: string;
    city?: string;
    address?: string;
    workhours?: string;
    additional?: string;
    requirements?: string;
}

export interface IChangePayload {
    index: number;
    accordionActive: boolean;
}