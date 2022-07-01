export interface ISearchForm {
    q: string;
    type: string;
    page?: number;
    limit?: number;
    order_by?: string;
    sort?: string;
    [key: string]: number | number[] | string[] | string | undefined | null;
}