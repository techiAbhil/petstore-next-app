import axios from 'axios';

axios.interceptors.request.use((req: any) => {
    req.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    req.headers = {
        'content-type': 'application/json',
    };

    if (!req.url.startsWith('/auth/')) {
        const token = localStorage.getItem('token');
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

axios.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (error) => {
        if (error?.response?.status === 401) {
            localStorage.clear();
            return Promise.reject('Session timeout!');
        }
        return Promise.reject(error);
    }
);
