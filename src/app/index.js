import { refs } from './refs';
import { renderGallery } from './render';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import PhotoApiService from './PixabayAPI';

let gallery = new SimpleLightbox('.gallery a');

function lightbox() {
   gallery.refresh('show.simplelightbox', function () {});
}

refs.form.addEventListener('submit', onSearchForm);
refs.btnLoadMore.addEventListener('click', onLoadMore);

const photoApiService = new PhotoApiService();

function onSearchForm(e) {
  e.preventDefault();
  refs.btnLoadMore.classList.remove("is-hidden");
  
  photoApiService.query = e.currentTarget.searchQuery.value.trim();
  if (photoApiService.query === '') {
      return  emptySearch()   
      }
  photoApiService.resetPage();
  photoApiService.fetchPhotos()
    .then((data) => {
      if (data.total === 0) {
      return  noImagesFound()   
      }
      clearPhotosGallery();
      imagesFound(data)
      renderGallery(data.hits)
      lightbox();
    })   
}

function onLoadMore() {
  photoApiService.fetchPhotos()
    .then((data) => {
      if (refs.gallery.children.length === data.totalHits) {
        endOfSearch()
        refs.btnLoadMore.classList.add("is-hidden");
      }
      renderGallery(data.hits)
      lightbox()
    });
}

function clearPhotosGallery() {
  refs.gallery.innerHTML = '';
}

function imagesFound(data) {
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function emptySearch() {
  Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');
}

function noImagesFound() {
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function endOfSearch() {
  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
}