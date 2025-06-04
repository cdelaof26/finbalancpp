export const pyHost = "http://127.0.0.1:5000/api/"

export const fetchData = async (route, userId) => {
    const response = await fetch(pyHost + route, {
        method: 'POST',
        mode: 'cors',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "userId": userId })
    });

    return await response.json();
}

export const fetchDataGET = async (route) => {
    const response = await fetch(pyHost + route, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-Type": "application/json" }
    });

    return await response.json();
}

export const callAPI = async (route, userId, bodySon, method) => {
    bodySon["userId"] = userId;

    const response = await fetch(pyHost + route, {
        method: method,
        mode: 'cors',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodySon)
    });

    return await response.json();
}
