
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import getImagesByQuery from './pixabay-api';

const lightbox = new SimpleLightbox(`.gallery a`, {
    captionsData: 'alt',
    captionDelay: 250,
} )

export function refreshLightBox() {
    lightbox.refresh()
}

export function createGallery(image) {
    const markup = image.map(image => ` <li class="gallery-item">
            <a href="${image.largeImageURL}">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            </a>
            <div class="info">
            <p><span class="span-info">Views</span> <br> ${image.views}</p>
            <p><span class="span-info">Comments</span> <br> ${image.comments}</p>
            <p><span class="span-info">Downloads </span> <br> ${image.downloads}</p>
            <p> <span class="span-info"> Likes </span> <br> ${image.likes}</p>
            </div>
        </li>`).join('');
    const galleryContainer = document.querySelector(`.gallery`)
    
    galleryContainer.insertAdjacentHTML(`beforeend`, markup)
    refreshLightBox()
    

}

export function clearGallery() {
    const galleryContainer = document.querySelector(`.gallery`)

    galleryContainer.innerHTML = ''
}

export function showLoader() {
    const loader = document.querySelector(`.loader`)
    loader.classList.remove(`is-hidden`)
}

export function hideLoader() {
    const loader = document.querySelector(`.loader`)
    loader.classList.add(`is-hidden`)
}
export function showLoadMoreButton() {
    const buttonLoader = document.querySelector(`.load-more`)
    buttonLoader.classList.remove(`is-hidden`)
}
export function hideLoadMoreButton() {
    const buttonLoader = document.querySelector(`.load-more`)
    buttonLoader.classList.add(`is-hidden`)
    
}