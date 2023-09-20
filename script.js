'use strict';

const countryContainer = document.querySelector('.container');
const countryWrapper = document.querySelector('.country__wrapper');

const form = document.querySelector('.country__form');
const input = document.querySelector('.country__input');
const searchBtn = document.querySelector('.country__btn');

function displayCountryCard(data) {
  const formattedPopulation = new Intl.NumberFormat('en-gb').format(data.population);

  const html = `
  <div class="country-card">
    <img src="${data.flags.svg}" alt="country flag" class="country__img">
    <div class="country__content">
      <h2 class="country__title">${data.name.common}</h2>
      <p class="country__capital">Capital<span class="country-card__emoji">🌆</span>: ${data.capital[0]}</p>
      <p class="country__population">Population<span class="country-card__emoji">👨🏻‍👩🏻‍👧🏻‍👦🏻</span>: ${formattedPopulation}${
    data.population < 1e6 ? 'k' : data.population < 1e9 ? 'm' : 'b'
  }</p>
      <p class="country__language">Language<span class="country-card__emoji">🗣️</span>: ${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__currency">Currency<span class="country-card__emoji">💸</span>: ${
        Object.values(data.currencies)[0].name
      } ${Object.values(data.currencies)[0].symbol}</p>
    </div>
  </div>
  `;

  countryWrapper.insertAdjacentHTML('afterbegin', html);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const inputValue = input.value;

  if (inputValue === '') {
    alert(`You did't write the country name`);
    return;
  }

  getCountryData(inputValue)
    .then(data => {
      displayCountryCard(data);
    })
    .catch(err => alert(err));
});

async function getCountryData(countryName) {
  try {
    const resp = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    const [data] = await resp.json();
    return data;
  } catch (err) {
    if (err instanceof URIError) throw new Error('Cannot find the country. Try enter proper name');
    throw err;
  }
}

console.dir(URIError);
