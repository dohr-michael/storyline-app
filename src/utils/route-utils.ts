import Router, { Route } from 'vue-router';


export function asString(
    dictionary: { [key: string]: (string | Array<string | null>) },
    key: string,
    defaultValue: string = ''
): string {
    const val = dictionary[key] || [];
    let strVal: string;
    if (Array.isArray(val)) {
        strVal = val.length === 0 ? defaultValue : val[0] || defaultValue;
    } else {
        strVal = val;
    }
    return strVal;
}

export function asNumber(
    dictionary: { [key: string]: (string | Array<string | null>) },
    key: string,
    defaultValue: number = 0
): number {
    const strVal = asString(dictionary, key);
    try {
        const parsed = parseInt(strVal);
        if (isNaN(parsed)) {
            return defaultValue;
        }
        return parsed;
    } catch (e) {
        return defaultValue;
    }
}

function withQuery(route: Route, query: { [key: string]: (string | Array<string | null>) }): Route {
    return {
        ...route,
        query: {...route.query, ...query},
    };
}

function withoutQuery(route: Route, ...removed: string[]): Route {
    const query = {...route.query};
    removed.forEach(q => delete query[q]);
    return {
        ...route,
        query
    };
}

export class PagedRouteBuilder {
    private _currentPage: string = 'page';
    private _queryString: string = '_q';
    private _newRouteName?: string;
    private _detailsRouteName?: string;

    constructor() {}

    withCurrentPage(value: string): PagedRouteBuilder {
        this._currentPage = value;
        return this;
    }

    withQueryString(value: string): PagedRouteBuilder {
        this._queryString = value;
        return this;
    }

    withNewRouteName(value: string): PagedRouteBuilder {
        this._newRouteName = value;
        return this;
    }

    withDetailsRouteName(value: string): PagedRouteBuilder {
        this._detailsRouteName = value;
        return this;
    }

    build(router: () => Router) {
        return (route: Route) => ({
            currentPage: asNumber(route.query, this._currentPage, 1),
            queryString: asString(route.query, this._queryString, ''),
            ...(this._newRouteName ? {newRouteName: this._newRouteName} : {}),
            ...(this._detailsRouteName ? {detailsRouteName: this._detailsRouteName} : {}),
            changePage: (nextPage: number) => {
                router().push(withQuery(route, {[this._currentPage]: nextPage + ''}));
            }
        });
    }

}

export class QueryRouteBuilder {
    private _currentPage: string = 'page';
    private _queryString: string = '_q';

    constructor() {}

    withQueryString(value: string): QueryRouteBuilder {
        this._queryString = value;
        return this;
    }

    withCurrentPage(value: string): QueryRouteBuilder {
        this._currentPage = value;
        return this;
    }

    build(router: () => Router) {
        return (route: Route) => ({
            queryString: asString(route.query, this._queryString, ''),
            changeQuery: (nextQuery: string) => {
                router().push(withQuery(route, {[this._queryString]: nextQuery, [this._currentPage]: '1'}));
            }
        });
    }
}

export function pagedRoute() { return new PagedRouteBuilder(); }

export function queryRoute() { return new QueryRouteBuilder();}
