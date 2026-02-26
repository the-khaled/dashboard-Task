const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = () => {
    return fetch(`${BASE_URL}/users`)
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch users: " + res.status);
            return res.json();
        });
};

export const getPostsByUser = (userId) => {
    return fetch(`${BASE_URL}/posts?userId=${userId}`)
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch posts: " + res.status);
            return res.json();
        });
};