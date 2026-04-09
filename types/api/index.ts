export interface ApiResponse<T> {
    data: T;
    code: string;
    message: string;
    timestamp: string;
}

export interface ApiError {
    code: string;
    message: string;
    timestamp: string;
}

export interface PaginationResponse<T> {
    data: {
        items: T[];
        meta: {
            totalItems: number;
            itemCount: number;
            itemsPerPage: number;
            totalPages: number;
            currentPage: number;
        };
    };
    code: string;
    message: string;
    timestamp: string;
}

export interface PaginationQuery {
    page: number;
    limit: number;
    search?: string;
}