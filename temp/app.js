// Get request function
function ajaxGet(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", callback);
  xhr.open('GET', url);
  xhr.send(null);
}

// Gets location of client and calls updateView
function getLocation() {
  var responseObj = JSON.parse(this.response);
    var lat = responseObj.location.latitude;
  var lng = responseObj.location.longitude;

  ajaxGet('http://weathersync.herokuapp.com/weather/' + lat + ',' + lng, updateView);
}

// Updates the html elements with data returned from API call
function updateView() {
  var weatherObj = JSON.parse(this.response);
  var city = weatherObj.name;
  var temp = Math.round((weatherObj.main.temp - 273.15)*1.8 + 32);
  var condition = weatherObj.weather[0].description;
  var icon = weatherObj.weather[0].icon;

  document.querySelector('#city-name').innerHTML = city;
  document.querySelector('#temp').innerHTML = temp + '&#8457';
  document.querySelector('#condition').innerHTML = condition;
  document.querySelector('#icon').src = 'http://openweathermap.org/img/w/' + icon + '.png';
}

// Initiate initial get request
ajaxGet('http://weathersync.herokuapp.com/ip', getLocation);
