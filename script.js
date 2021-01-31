const form = document.querySelector('form');
const weatherDiv = document.querySelector('.weather');

function getInputValues(){
	const searchBox = document.getElementById('search-term');
	let searchTerm = searchBox.value;
	getWeatherData(searchTerm);
	return false;
}

const celsius = document.getElementById('metric');//celsius
const fahrenheit = document.getElementById('imperial');//fahrenheit

celsius.addEventListener('click', () => {
	celsius.classList.add('active');
	fahrenheit.classList.remove('active');
	getInputValues();
});

fahrenheit.addEventListener('click',() => {
	fahrenheit.classList.add('active');
	celsius.classList.remove('active');
	getInputValues();
});

async function getWeatherData(searchTerm){
	let searchUnit = document.querySelector('.active').getAttribute('id');
	let degree;
	if (searchUnit === 'metric') {
		degree = '\u00B0 C';
	} else {
		degree = '\u00B0 F';
	}
	try{
		const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&APPID=a54d89dc35fa4c02c7f1325c50abd71c&units=${searchUnit}`,
		{
	    	mode: 'cors'
	    });
		const data = await response.json();

		let weatherData = {
			temp : data.main.temp,
			feelTemp : data.main.feels_like,
			humidity : data.main.humidity,
			description : data.weather[0].description,
			location : data.name,
			country : data.sys.country,
			degree,
		}
		displayWeatherData(weatherData);
	}
	catch(error){
		console.log(error);
		displayError();
	}
}

function displayWeatherData(weatherData){
	const tempDiv = document.createElement('p');
	tempDiv.textContent = 'Temperature: ' + weatherData.temp + weatherData.degree;
	const feelTempDiv = document.createElement('p');
	feelTempDiv.textContent = 'Feelss like: ' + weatherData.feelTemp + weatherData.degree;
	const humidityDiv = document.createElement('p');
	humidityDiv.textContent = 'Humidity: ' + weatherData.humidity + '%';
	const descriptionDiv = document.createElement('p');
	descriptionDiv.textContent = 'Weather: ' + weatherData.description;
	const locationDiv = document.createElement('p');
	locationDiv.textContent = weatherData.location + ', ' + weatherData.country;
	animateDisplayData();
	weatherDiv.appendChild(locationDiv);
	weatherDiv.appendChild(tempDiv);
	weatherDiv.appendChild(feelTempDiv);
	weatherDiv.appendChild(humidityDiv);
	weatherDiv.appendChild(descriptionDiv);	
}

function displayError(){
	const errorDiv = document.createElement('p');
	errorDiv.textContent = "Couldn't find the city.";
	animateDisplayData();
	weatherDiv.appendChild(errorDiv);
}

function animateDisplayData(){
	weatherDiv.textContent = '';
	weatherDiv.classList.remove('fadeIn');
 	weatherDiv.offsetWidth;
 	weatherDiv.classList.add('fadeIn');
}