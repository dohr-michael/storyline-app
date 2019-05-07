export interface Paged<T> {
    limit: number;
    offset: number;
    total: number;
    items: Array<T>;
}