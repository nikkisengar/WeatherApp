// jshint esversion:6
// jscs:disable maximumLineLength

// declaring global variables to be used inside other functions or fetch request
let allCountries;
let countryStates;
let countryCities;

// Fetching all countries using geo-battuta.net/api/country/all api
// fetch('https://cors-anywhere.herokuapp.com/' + 'https://geo-battuta.net/api/country/all/?key=4932ac87a608460ff646805e8ed26149')
// .then(resp => resp.json())
// .then(data => countries(data))
// .catch(err => console.log('Error: ' + err));

// Fetching all countries using restcountries api
fetch('https://restcountries.eu/rest/v2/all')
.then(resp => resp.json())
.then(data => countries(data))
.catch(err => console.log('Error: ' + err));

function countries(countriesData) {
  allCountries = countriesData;
  let countryOptions = '<option value="" class="text-secondary" disabled selected>Choose your Country *</option>';
  allCountries.forEach(country => countryOptions += '<option value="' + country.alpha2Code + '">' + country.name + ' (+' + country.callingCodes + '<lable><img src="' + country.flag + '" width="10" height="20"></lable>' + ')' + '</oprion>');

  // <img src="' + country.flag + '">
  // allCountries.forEach(country => countryOptions += '<option value="' + country.code + '">' + country.name + '</oprion>');

  $('#countryId').append(countryOptions);

  countryRegion();
}

// fetching all states based on the selected country and populating the states drop-down
function countryRegion() {
  $('#countryId').on('change', () => {

    let countryCode = $('#countryId').val();

    console.log('[Inside states()] => Selected Country Code is: ' + countryCode);

    // Fetching country specific all states using battuta api
    let stateUrl = 'https://cors-anywhere.herokuapp.com/' + 'https://geo-battuta.net/api/region/' + countryCode + '/all/?key=4932ac87a608460ff646805e8ed26149';
    console.log(stateUrl);
    fetch(stateUrl)
    .then(resp => resp.json())
    .then(data => states(data))
    .catch(err => console.log('[Inside states()] => Error: ' + err));

    function states(statesData) {
      countryStates = statesData;
      console.log(countryStates);
      let statesOption = '<option value="" class="text-secondary" disabled selected>Choose your State *</option>';
      countryStates.forEach(state => statesOption += '<option value="' + state.region + '">' + state.region + '</option>');

      $('#stateId').append(statesOption);

      $('.display-on-country-selected').fadeIn(500);

      // using prop() we can mark the select dropdown to reset to the element which is selected in Option
      $('#cityId option:first').prop('selected', true);
      stateCities(countryCode);

    }
  });
}

// fetching all cities based on the selected state and country and populating the city drop-down
function stateCities(countryCode) {
  $('#stateId').on('change', () => {

    $('.display-on-state-selected').fadeIn(500);

    let stateRegion = $('#stateId').val();

    console.log('[Inside cities()] => Selected CountryCode is: ' + countryCode + ', Selected State is: ' + stateRegion);

    // Fetching state specific all cities using battuta api
    let cityUrl = 'https://cors-anywhere.herokuapp.com/' + 'http://geo-battuta.net/api/city/' + countryCode + '/search/?region=' + stateRegion + '&key=4932ac87a608460ff646805e8ed26149';

    fetch(cityUrl)
    .then(resp => resp.json())
    .then(data => cities(data))
    .catch(err => console.log('[Inside cities()] => Error: ' + err));

    function cities(citiesData) {
      countryCities = citiesData;
      console.log(citiesData);
      let citiesOption = '<option value="" class="text-secondary" disabled selected>Choose your City *</option>';
      countryCities.forEach(city => citiesOption += '<option value="' + city.city + '">' + city.city + '</option>');

      $('#cityId').append(citiesOption);

      $('.btn').on('click', () => {
        $('.display-on-city-selected').fadeIn(200);
      });
    }
  });
}
