import { IContentType } from "./content-type.interface";


export interface INews {
    image: string;
    date: string;
    title: string;
    id: number;
}

export interface INewsList {
    items?: INewsListItems[];
    meta: INewsListMeta;
}

export interface INewsListMeta {
    limit: number;
    current: number;
    totalCount: number;
    totalPages: number;
    nextPage?: number;
    prevPage?: number;
}

export interface INewsListItems {
    id: number;
    title: string;
    slug: string;
    shortDescription: string;
    createdAt: string;
    image?: string;
    products: any[];
    contentTypes: IContentType[];
}

export interface INewsListPayload {
    page?: number;
    limit?: number;
    paginate?: boolean;
}