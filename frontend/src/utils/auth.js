export const BASE_URL = 'http://api.ptica8.mesto.nomoredomains.sbs';

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

export const getContent = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
    })
        .then(checkResponse)
};