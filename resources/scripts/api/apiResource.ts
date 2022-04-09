import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from '@scripts/axios';
import Model from '@scripts/models/Model';

type AnyObject = Record<string, unknown>;

interface ResourceResponse {
    data: AnyObject;
}

type CollectionResponse = {
    data: Array<AnyObject>;
};

type RouteId = number | string;
type ApiResource = {
    index(params?: AnyObject, config?: AxiosRequestConfig): Promise<CollectionResponse>;
    store(data?: AnyObject | Model, config?: AxiosRequestConfig): Promise<ResourceResponse>;
    (id: RouteId): {
        show(params?: AnyObject, config?: AxiosRequestConfig): Promise<ResourceResponse>;
        update(data?: AnyObject | Model, config?: AxiosRequestConfig): Promise<ResourceResponse>;
        destroy(params?: AnyObject, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    };
};
type AdditionalRoutes = {
    scoped?: (scopedUrl: string, id: RouteId) => AnyObject;
    global?: (baseUrl: string) => AnyObject;
};

/**
 * Create API Resource routes
 *
 * @example
 * // Basic usage
 * const resource = apiResource('api/some-resource');
 * resource.index();
 * resource.store();
 * resource(id).show();
 * resource(id).update();
 * resource(id).destroy();
 *
 * @example
 * // Adding custom endpoints
 * const resource = apiResource('api/some-resource', {
 *     global: baseUrl => ({
 *         // Add global endpoints
 *         deleteAll: () => axios.delete(baseUrl),
 *     }),
 *     scoped: scopedUrl => ({
 *         // Add scoped endpoints
 *         exists: () => axios.get(`${scopedUrl}/exists`),
 *         // Nested resources
 *         relation: apiResource(`${scopedUrl}/relation`),
 *     }),
 * });
 * resource.deleteAll();
 * resource(id).exists();
 * resource(id).relation.index();
 * resource(id).relation(relationId).show();
 */
export default function apiResource(
    baseUrl: string,
    additionalRoutes: AdditionalRoutes = {},
): ApiResource {
    return Object.assign(
        /** @param id The resource id */
        (id: RouteId) => {
            // An ID is required for scoped routes.
            if (!isRouteId(id)) {
                throw new TypeError(`Invalid ID specified (${id})`);
            }
            return {
                /**
                 * Display the specified resource.
                 */
                show: (params: AnyObject, config: AxiosRequestConfig) =>
                    axios.get(`${baseUrl}/${id}`, { ...config, params }).then(r => r.data),

                /**
                 * Update the specified resource in storage.
                 */
                update: (data: AnyObject, config: AxiosRequestConfig) =>
                    axios.put(`${baseUrl}/${id}`, data, config).then(r => r.data),

                /**
                 * Remove the specified resource from storage.
                 */
                destroy: (params: AnyObject, config: AxiosRequestConfig) =>
                    axios.delete(`${baseUrl}/${id}`, { ...config, params }),

                // Add any supplied scoped routes.
                ...additionalRoutes?.scoped?.(`${baseUrl}/${id}`, id),
            };
        },
        {
            /**
             * Display a listing of the resource.
             */
            index: (params: AnyObject, config: AxiosRequestConfig) =>
                axios.get(baseUrl, { ...config, params }).then(r => r.data),

            /**
             * Store a newly created resource in storage.
             */
            store: (data: AnyObject, config: AxiosRequestConfig) =>
                axios.post(baseUrl, data, config).then(r => r.data),

            // Add any supplied global routes.
            ...additionalRoutes?.global?.(baseUrl),
        },
    );
}

/** Whether a value is a valid route id */
function isRouteId(value: RouteId) {
    return Boolean(Number.isInteger(value) || (typeof value === 'string' && value));
}
