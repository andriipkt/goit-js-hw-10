import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_qlNuvjmVdcVq67vjZ7pEeMBMhYk0fPgtUkSLnMoZtBOAzkADTFUgzGh10G2mQsM6';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data);
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0]);
}
