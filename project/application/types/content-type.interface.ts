import { EContentTypes } from '~/constants/content-types';

export interface IContentType {
    code: EContentTypes;
    properties?: IContentTypeProperty;
    items?: IContentBlockItem[] | IContentJobOffer[] | IContentDepartment[] | IContentLocations | string[];
    content?: string;
}

export interface IContentTypeProperty {
    title: string;
    title_tag: string;
    img: string;
    image_alt: string;
    text: string;
    reverse: boolean;
    full_width: boolean;
}

export interface IContentTypeImageBlock {
    img: string;
    image_alt: string;
}

export interface IContentTypeTextBlock extends IContentType {
    text: {
        value: string;
    }
}

export interface IContentTypePageContactData extends IContentType {
    address?: string,
    phone?: string,
    email?: string
}

export interface IContentBlockItem {
    block_title: string;
    content: string;
    icon: string;
}

export interface IContentJobOffer {
    title: string;
    city: string;
    address: string;
    work_hours: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
}

export interface IContentDepartment {
    block_title: string;
    workweek: string;
    weekend: string;
    phone: string;
    store: boolean;
    consultant: boolean;
}

export interface IContentLocations {
    title?: string;
    coordinates?: IContentLocationsCoordinates[];
}

export interface IContentLocationsCoordinates {
    location: string;
    type: string;
}

export interface IContentMarkers {
    position: IContentMarkersPositions;
    url: string;
}

export interface IContentMarkersPositions {
    lat: number;
    lng: number;
}

export interface IClusterStyles {
    textColor: string;
    url: string;
    height: number;
    width: number;
    textSize: number;
    anchorText: number[];
}