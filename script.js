window.onload = function() {

    function errorHandler(error) {
        console.log(error.message);    
    }

    function success(response) {
        fetch('https://fcc-weather-api.glitch.me/api/current?lat=' + response.coords.latitude + '&lon=' + response.coords.longitude)
        .then(data => data.json())
        .then(jsonObject => {
            document.getElementById('cityName').innerText = jsonObject.name + ', ' + jsonObject.sys.country;
            document.getElementById('icon').setAttribute('src', jsonObject.weather[0].icon);
            document.getElementsByClassName('wind')[0].insertAdjacentHTML('afterbegin', '<h2 id=\'wind\'>' + windDirection(jsonObject.wind) + ', ' + jsonObject.wind.speed + ' knots ' + '</h2>');
            document.getElementById('wind').insertAdjacentHTML('beforeend', '<i class=\'wi wi-wind from-' + jsonObject.wind.deg.toFixed() + '-deg\'></i>');
            document.getElementById('degree').innerText = (jsonObject.main.temp * 1.8 + 32).toFixed() + ' F';
            document.getElementById('description').innerText = jsonObject.weather[0].main;
            console.log(jsonObject);
        })
    }
    navigator.geolocation.getCurrentPosition(success, errorHandler)
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