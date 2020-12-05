// getWeather.js

import fetch from 'node-fetch';
export async function handler(event, context) {

	const apiKey = process.env.REACT_APP_OPENWEATHERMAP_KEY;


	const { city } = event.queryStringParameters;

  const res = await fetch(
  	`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );
  const weatherData = await res.json();


	return {
		statusCode: 200,
		body: JSON.stringify({
			weatherData,
		})
	}
}