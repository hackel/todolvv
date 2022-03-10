import axios from '@scripts/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

type RouteId = number | string;
type ApiResource = {
    index(params?: any, config?: AxiosRequestConfig): Promise<any>;
    store(data?: any, config?: AxiosRequestConfig): Promise<any>;
    (id: RouteId): {
        show(params?: any, config?: AxiosRequestConfig): Promise<any>;
        update(data?: any, config?: AxiosRequestConfig): Promise<any>;
        destroy(params?: any, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    };
};
type AdditionalRoutes = {
    scoped?: (scopedUrl: string, id: RouteId) => {};
    global?: (baseUrl: string) => {};
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
export default function apiResource<T>(
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
                show: (params: any, config: AxiosRequestConfig) =>
                    axios.get(`${baseUrl}/${id}`, { ...config, params }).then(r => r.data),

                /**
                 * Update the specified resource in storage.
                 */
                update: (data: any, config: AxiosRequestConfig) =>
                    axios.put(`${baseUrl}/${id}`, data, config).then(r => r.data),

                /**
                 * Remove the specified resource from storage.
                 */
                destroy: (params: any, config: AxiosRequestConfig) =>
                    axios.delete(`${baseUrl}/${id}`, { ...config, params }),

                // Add any supplied scoped routes.
                ...additionalRoutes?.scoped?.(`${baseUrl}/${id}`, id),
            };
        },
        {
            /**
             * Display a listing of the resource.
             */
            index: (params: any, config: AxiosRequestConfig) =>
                axios.get(baseUrl, { ...config, params }).then(r => r.data),

            /**
             * Store a newly created resource in storage.
             */
            store: (data: any, config: AxiosRequestConfig) =>
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
