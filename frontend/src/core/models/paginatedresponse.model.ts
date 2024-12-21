/**
 * @interface PaginatedResponse
 * @template T
 * @description Interface for paginated response
 * @param {T[]} data - Data
 * @param {PaginationObject} pagination - Pagination
 */
export interface PaginatedResponse<T> {
    data?: T[];
    pagination: PaginationObject;
}

/**
 * @interface PaginationObject
 * @description Interface for pagination object
 * @param {number} page - Page
 * @param {number} perPage - Per page
 * @param {number} currentResultCount - Current result count
 * @param {number} totalResultCount - Total result count
 * @param {number} totalPages   - Total pages
 */
export interface PaginationObject {
    page: number;
    perPage: number;
    currentResultCount?: number;
    totalResultCount?: number;
    totalPages?: number;
}