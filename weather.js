// jshint esversion:6
// jscs:disable maximumLineLength

const express = require('express');
const bodyParser = require('body-parser');
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const $ = require('jquery')(window);
const https = require('https');
const fetch = require('node-fetch');
const unirest = require('unirest');
const app = express();
const port = 3000;

// $('#cityID').on('change', () => {
//   console.log('Selected City is: ' + $('#cityId').val());
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.listen(port, () => console.log('weatherApp stated on http://localhost:' + port));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  console.log('Selected City: ' + req.body.cityName);
  const cityName = req.body.cityName;
  const units = 'metric';
  const apiKey = '674819cacceb4f12c82080229caa79fc';

  const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=' + units + '&appid=' + apiKey;
  console.log('Weather URL: ' + weatherUrl);
  https.get(weatherUrl, (response) => {

    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon = 'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png';

      res.write('<h1>Temperature in ' + cityName + ' is: ' + temperature + ' degrees celcius.</h1>');
      res.write('<br><br><img src="' + weatherIcon + '">');
      res.write('<p>' + weatherDescription + '</p>');
      res.send();
    });
  });
});

app.get('/favicon/sun.png', (req, res) => res.sendFile(__dirname + '/favicon/sun.png'));
app.get('/css/style.css', (req, res) => res.sendFile(__dirname + '/css/style.css'));
app.get('/js/index.js', (req, res) => res.sendFile(__dirname + '/js/index.js'));

// let generateTokenRequest = unirest('GET', 'https://www.universal-tutorial.com/api/getaccesstoken');
//
// generateTokenRequest.header({
//   Accept: 'application/json',
//   'api-token': 'UfOEA3GzdkZfhfNt12cqGUAq1F1fXeZcqVMF8xfHIf2wHikmxeICZ_wsMcBAoBZ28fQ',
//   'user-email': 'memavo4352@mailsecv.com',
// })
// .then(authTokenResponse => {
//   console.log(authTokenResponse.body);
//
//   let allCountryRequest =  unirest('GET', 'https://www.universal-tutorial.com/api/countries/');
//
//   allCountryRequest.header({
//     // Authentication: 'Bearer ' + authTokenResponse.auth_token + '',
//     Authentication: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJtZW1hdm80MzUyQG1haWxzZWN2LmNvbSIsImFwaV90b2tlbiI6IlVmT0VBM0d6ZGtaZmhmTnQxMmNxR1VBcTFGMWZYZVpjcVZNRjh4ZkhJZjJ3SGlrbXhlSUNaX3dzTWNCQW9CWjI4ZlEifSwiZXhwIjoxNTk0ODY5OTQ1fQ.xNjaKtrxjTK-2X0T1Da9D4_Nxajj0dVRD6Tx_JedZzU',
//     Accept: 'application/json',
//   })
//   .then(allCountryResponse => console.log(authTokenResponse.body));
// });
