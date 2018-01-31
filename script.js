window.onload = function() {
    function success(response) {
        fetch('https://fcc-weather-api.glitch.me/api/current?lat=' + response.coords.latitude + '&lon=' + response.coords.longitude)
        .then(data => data.json())
        .then(jsonObject => {
            document.getElementById('cityName').innerText = jsonObject.name + ', ' + jsonObject.sys.country;
            document.getElementById('icon').setAttribute('src', jsonObject.weather[0].icon);
            document.getElementsByTagName('i')[0].setAttribute('class', 'wi wi-wind from-' + jsonObject.wind.deg.toFixed() + '-deg');
            document.getElementById('wind').innerText = windDirection(jsonObject.wind) + ', ' + jsonObject.wind.speed + ' knots';
            document.getElementById('degree').innerText = jsonObject.main.temp.toFixed() + ' F';
            console.log(jsonObject);
        })
    }
    navigator.geolocation.getCurrentPosition(success)
    function windDirection(input) {
        const direction = input.deg.toFixed();
        if (direction === 0 || direction === 360) {
            return 'East';
        } else if (direction > 0 && direction < 90) {
            return 'North East';
        } else if (direction == 90) {
            return 'North';
        } else if (direction > 90 && direction < 180) {
            return 'North West';
        } else if (direction === 180) {
            return 'West';
        } else if (direction > 180 && direction < 270) {
            return 'South West';
        } else if (direction === 270) {
            return 'South';
        } else if (direction > 270 && direction < 360) {
            return 'South East';
        }
    }
};