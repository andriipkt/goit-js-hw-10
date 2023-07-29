import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import Notiflix from 'notiflix';

// const selectBreed = new SlimSelect({
//   select: '.breed-select',
//   events: {
//     afterOpen: () => {
//       fetchBreeds();
//     },
//   },
// });
// я не розібрався як використовувати slimSelect

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('change', handleBreedChange);

fetchBreeds()
  .then(breeds => {
    populateBreedsSelect(breeds);
    hideLoader();
  })
  .catch(error => {
    console.error('Error fetching breeds:', error);
    showError();
    hideLoader();
    Notiflix.Notify.failure('Error fetching breeds');
  });

let isLoading = false;

showLoader();

// functions
function showLoader() {
  loader.style.display = 'block';
  breedSelect.style.display = 'none';
  catInfo.style.display = 'none';
  error.style.display = 'none';
  isLoading = true;
}

function hideLoader() {
  loader.style.display = 'none';
  breedSelect.style.display = 'block';
  isLoading = false;
}

function showError() {
  error.style.display = 'block';
}

function populateBreedsSelect(breeds) {
  const elements = breeds.map(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;

    return option;
  });

  breedSelect.append(...elements);
}

function createImageElement(src) {
  const image = document.createElement('img');
  image.src = src;
  image.alt = 'Cat';
  image.classList.add('cat-image');

  return image;
}

function createParagraphElement(text) {
  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  return paragraph;
}

function updateCatInfo(catData) {
  catInfo.innerHTML = '';

  const catImage = createImageElement(catData.url);
  const catName = createParagraphElement(catData.breeds[0].name);
  catName.classList.add('breed-name');

  const catDescription = createParagraphElement(catData.breeds[0].description);
  catDescription.classList.add('description');

  const catTemperament = createParagraphElement(
    'Temperament: ' + catData.breeds[0].temperament
  );
  catTemperament.classList.add('temperament');

  const infoContainer = document.createElement('div');
  infoContainer.append(catName, catDescription, catTemperament);
  infoContainer.classList.add('info-container');

  catInfo.appendChild(catImage);
  catInfo.appendChild(infoContainer);

  catInfo.style.display = 'flex';
}

function handleBreedChange() {
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    showLoader();

    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        updateCatInfo(catData);
        hideLoader();
      })
      .catch(error => {
        console.error('Error fetching cat:', error);
        showError();
        hideLoader();
        Notiflix.Notify.failure('Error fetching breeds');
      });
  }
}
