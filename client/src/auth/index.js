export const logIn = user => {
    // send login request to server
    return fetch(`/users/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err.json()
        })
};

export const authenticate = (data, next) => {
    if (typeof window !== undefined) {

        // set token
        localStorage.setItem('jwt', JSON.stringify(data))
    }
    next()
}

export const isAuthenticated = () => {
    if (typeof window === undefined) {
        return false
    }
    if (localStorage.getItem('jwt')) {

        // get token
        return JSON.parse(localStorage.getItem('jwt'))
    }else {
        return false
    }
}


export const register = (user) => {

    // send register request to server
    return fetch(`/users`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}


export const logout = (user,next) => {
    if (typeof window !== undefined) {

        // remove token
        localStorage.removeItem('jwt')
        next()

        // send logout request to server
        return fetch(`/users/logout`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        .then(response => {
            console.log('logout')
        })
        .catch(err => {
            console.log(err)
        })
    }
}
