export const BASE_URL = 'https://api.ptica8.mesto.nomoredomains.sbs';

const checkResponse = (response) => {
    return response.ok ? response.json() : Promise.reject(`Error ${response.status}`);
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'email': email, 'password': password})
    })
        .then(checkResponse);
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'email': email, 'password': password})
    })
        .then(checkResponse)
};