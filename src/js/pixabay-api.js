import axios from "axios";



const SEARCH_URL = `https://pixabay.com/api/`;
const KEY_API = `50890358-614794b793de10968b1ca8154`

export default async function getImagesByQuery(query, page = 1, per_page = 15) {
    try{   const options = await axios.get(SEARCH_URL, {
        params: {
            key: KEY_API,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: page,
            per_page: per_page,
        },
    })

        return options.data
        
        
    }
    catch (error) {
        console.log(error)
    }
}