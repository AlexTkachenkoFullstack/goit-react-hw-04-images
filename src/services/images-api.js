const KEY = '&key=35387506-5af8e0fa3bfbe7696023fb8a4';
const URL='https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12'
const fetchImages = function (name, page) {
  return  fetch(URL+KEY+`&q=${name}&page=${page}`)
}

const api = {
    fetchImages
}
export default api