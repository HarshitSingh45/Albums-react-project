const customFetch = async(url, {body, ...customConfig}) => {
    const headers = {
        'Content-type': 'application/json; charset=UTF-8',
    }
    const config = {
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers
        },
    };

    config.body = body

    try{
        const response = await fetch(url, config);
        const data = await response.json();

        if(data){
            return {
                data,
                success: true 
            }
        }
        throw new Error("Error occured");
    }catch(error){
        console.error('ERROR');
        return {
            success: false
        };
    }
};
export const getAlbums = () => {
    return customFetch('https://jsonplaceholder.typicode.com/albums', {
        method: 'GET'
    });
}
export const addAlbum = (userid, title) => {
    return customFetch('https://jsonplaceholder.typicode.com/albums', {
        method: 'POST',
        body: JSON.stringify({
            userid,
            title
            })
})
}
export const updateAlbum = (id, userid, title) => {
    return customFetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id,
            title,
            userid,
            })
})
}
export const deleteAlbum = (id) => {
    return customFetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
        method: 'DELETE'
})
}
