//jshint esversion:6
// jscs:disable maximumLineLength

// declaring global variables to be used inside other functions or fetch request
let allCountries;
let countryStates;
let countryCities;

// Fetching all countries using geo-battuta.net/api/country/all api
fetch('https://cors-anywhere.herokuapp.com/' + 'https://geo-battuta.net/api/country/all/?key=4932ac87a608460ff646805e8ed26149')
.then(resp => resp.json())
.then(data => countries(data))
.catch(err => console.log('Error: ' + err));

function countries(countriesData) {
  allCountries = countriesData;
  let countryOptions = '<option value="" disabled selected>Choose your Country *</option>';
  allCountries.forEach(country => countryOptions += '<option value="' + country.code + '">' + country.name + '</oprion>');

  // allCountries.forEach(country => countryOptions += '<option value="' + country.alpha2Code + '">' + country.name + ' (+' + country.callingCodes + ')' + '</oprion>');

  document.getElementById('countryId').innerHTML = countryOptions;

  countryRegion();
}

// fetching all states based on the selected country and populating the states drop-down
function countryRegion() {
  $('#countryId').on('change', () => {

    let countryCode = document.getElementById('countryId').value;

    console.log('[Inside states()] => Selected Country Code is: ' + countryCode);

    // Fetching country specific all states using geo-battuta.net/api/region/ api
    let stateUrl = 'https://cors-anywhere.herokuapp.com/' + 'https://geo-battuta.net/api/region/' + countryCode + '/all/?key=4932ac87a608460ff646805e8ed26149';
    console.log(stateUrl);
    fetch(stateUrl)
    .then(resp => resp.json())
    .then(data => states(data))
    .catch(err => console.log('[Inside states()] => Error: ' + err));

    function states(statesData) {
      countryStates = statesData;
      console.log(countryStates);
      let statesOption = '<option value="" disabled selected>Choose your State *</option>';
      countryStates.forEach(state => statesOption += '<option value="' + state.region + '">' + state.region + '</option>');

      document.getElementById('stateId').innerHTML = statesOption;

      $('.display-on-country-selected').fadeIn(500);

      stateCities(countryCode);
    }
  });
}

// fetching all cities based on the selected state and country and populating the city drop-down
function stateCities(countryCode) {
  $('#stateId').on('change', () => {

    $('.display-on-state-selected').fadeIn(500);

    let stateRegion = document.getElementById('stateId').value;

    console.log('[Inside cities()] => Selected CountryCode is: ' + countryCode + ', Selected State is: ' + stateRegion);

    // Fetching state specific all cities using geo-battuta.net/api/city api
    let cityUrl = 'https://cors-anywhere.herokuapp.com/' + 'http://geo-battuta.net/api/city/' + countryCode + '/search/?region=' + stateRegion + '&key=4932ac87a608460ff646805e8ed26149';

    fetch(cityUrl)
    .then(resp => resp.json())
    .then(data => cities(data))
    .catch(err => console.log('[Inside cities()] => Error: ' + err));

    function cities(citiesData) {
      countryCities = citiesData;
      console.log(citiesData);
      let citiesOption = '<option value="" disabled selected>Choose your City *</option>';
      countryCities.forEach(city => citiesOption += '<option value="' + city.city + '">' + city.city + '</option>');

      document.getElementById('cityId').innerHTML = citiesOption;

      $('#cityId').on('change', () => {
        $('.data-select-div').hide();
        $('.display-on-city-selected').fadeIn(200);
      });
    }
  });
}
