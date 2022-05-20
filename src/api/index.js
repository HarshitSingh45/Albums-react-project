// common function to make api requests
const customFetch = async(url, {body, ...customConfig}) => {
    // defining header
    const headers = {
        'Content-type': 'application/json; charset=UTF-8',
    }
    // setting config
    const config = {
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers
        },
    };
    // adding body to the config
    config.body = body

    try{
        // sending request to the api
        const response = await fetch(url, config);
        const data = await response.json();

        // if we receive data from the api then we pass otherwise we throw error
        if(data){
            return {
                data,
                success: true 
            }
        }
        // throwing error if req is unsuccessful
        throw new Error("Error occured");
    }catch(error){
        console.error('ERROR');
        return {
            success: false
        };
    }
};
// to fetch all albums from api
export const getAlbums = () => {
    return customFetch('https://jsonplaceholder.typicode.com/albums', {
        method: 'GET'
    });
}
// to add album into albums list
export const addAlbum = (userid, title) => {
    return customFetch('https://jsonplaceholder.typicode.com/albums', {
        method: 'POST',
        body: JSON.stringify({
            userid,
            title
            })
})
}
// to update any album data
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
// to delete any album from the list
export const deleteAlbum = (id) => {
    return customFetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
        method: 'DELETE'
})
}
