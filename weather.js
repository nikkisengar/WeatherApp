// jshint esversion:6
// jscs:disable maximumLineLength

const express = require('express');
const bodyParser = require('body-parser');
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const $ = require('jquery')(window);
const https = require('https');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.listen(port, () => console.log('weatherApp stated on http://localhost:' + port));

app.get('/', (req, res) => {

  // fetch('https://restcountries.eu/rest/v2/all')
  // .then(res => res.json())
  // .then(data => {
  //   data.forEach(country => console.log(country.name + ' (+' + country.callingCodes + ')'));
  // });

  res.sendFile(__dirname + '/index.html');
});
app.get('/favicon/sun.png', (req, res) => res.sendFile(__dirname + '/favicon/sun.png'));
app.get('/css/style.css', (req, res) => res.sendFile(__dirname + '/css/style.css'));
app.get('/js/index.js', (req, res) => res.sendFile(__dirname + '/js/index.js'));
