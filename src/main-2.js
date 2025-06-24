import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import getImagesByQuery from './js/pixabay-api';
import {refreshLightBox, createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton} from './js/render-functions'


const galleryContainer = document.querySelector(`.gallery`)
const form = document.querySelector(`.form`)
const button = document.querySelector(`button`)
const loadMore = document.querySelector(`.load-more`)
const inputText = document.querySelector(`[name="search-text"]`)


let currentQuery = '';
let currentPage = 1;
let limit = 15;

async function onSearch(event) {
    event.preventDefault()

    const userInfo = event.currentTarget.elements[`search-text`].value;
    currentQuery = userInfo;
    currentPage = 1;
    clearGallery()
    showLoader()

    try {
        const data = await getImagesByQuery(userInfo);
        
        if (data.hits.length === 0) {
  
            return iziToast.error({
                message: `Sorry, there are no images matching your search query. Please try again!`,
                position: "topLeft"
            })
            
        }
        hideLoadMoreButton()
        createGallery(data.hits)
        showLoadMoreButton()
        form.reset()
    }
    catch (error) {
        iziToast.error({
            message: `${error}`,
            position: "topLeft",
        })
    }
    
    finally {  
        hideLoader()
    }
    


    

} 

async function loadImage(event) {
    event.preventDefault()

    const card = document.querySelector(`.gallery-item`)
    currentPage += 1
    const clientRect = card.getBoundingClientRect()
    const rectHeight = clientRect.height;

    try {
        const data = await getImagesByQuery(currentQuery, currentPage, limit)
             
            const totalHits = Math.ceil(data.totalHits / limit);
            if (currentPage > totalHits) {
                hideLoadMoreButton()
                return iziToast.error({
                    message: `We're sorry, but you've reached the end of search results.`,
                    position: "topLeft"
                })
            }
         
            createGallery(data.hits)
            window.scrollBy({
                top: rectHeight * 2,
                behavior: `smooth`,
            })
        
        
    }

    catch (error) {
        iziToast.error({
            message: `${error}`,
            position: "topLeft",
        })
    }
}
form.addEventListener(`submit`, onSearch)
loadMore.addEventListener(`click`, loadImage)