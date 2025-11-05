const BASE_URL = import.meta.env.VITE_API_URL || 'https://example.com/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options,
    });
    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status}: ${text}`);
    }
    return (await res.json()) as T;
}

export const http = {
    get: <T>(path: string) => request<T>(path, { method: 'GET' as HttpMethod }),
    post: <T>(path: string, body?: unknown) => request<T>(path, { method: 'POST' as HttpMethod, body: JSON.stringify(body) }),
    put: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PUT' as HttpMethod, body: JSON.stringify(body) }),
    patch: <T>(path: string, body?: unknown) => request<T>(path, { method: 'PATCH' as HttpMethod, body: JSON.stringify(body) }),
    delete: <T>(path: string) => request<T>(path, { method: 'DELETE' as HttpMethod }),
};




