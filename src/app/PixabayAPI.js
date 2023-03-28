import axios from 'axios';
const API_KEY = '34583981-c2300f19bc8f0e923af9dca8a';
axios.defaults.baseURL = 'https://pixabay.com/api/';
export default class PhotoApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.pages = 40;
     }
    
    async fetchPhotos() {
        try {
            return await axios.get(`?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.pages}`)
            .then((data) => {
            this.incrementPage();
            return data.data;
        })
        }
        catch (error) {
            console.log(error);
        }
    }
    
    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}