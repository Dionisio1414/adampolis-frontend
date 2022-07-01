import { IContentType } from '~/types/content-type.interface';
import { IJobOffer } from '~/types/job-offers.interface';
import { IDictionary } from './dictionary.interface';

export interface IPage {
    id: number;
    slug: string;
    slugs: IDictionary<string>;
    name: string;
    breadcrumb: string;
    metaKeywords: string;
    metaDescription: string;
    nameWhenLinked: string;
    descriptionWhenLinked: string;
    content: string;
    pageContactData?: IPageContactData;
    contentTypes?: IContentType[];
    jobOffers?: IJobOffer[] | [];
}

export interface IPageContactData {
    address?: string;
    phone?: string;
    email?: string;
}

