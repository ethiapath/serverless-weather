// [city].js
import useSWR from 'swr';
import { useRouter } from 'next/router'
import deepEqual from 'deep-equal';

const fetcher = (url) => fetch(url).then((res) => res.json());

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const apiKey = process.env.REACT_APP_OPENWEATHERMAP_KEY;

function convertKelvinToFahrenheit(kelvin) {
	return kelvin * 1.8 - 459.67
}

export default function City(props) {
	console.log({props})
  const { city } = props;

  let weatherData = props.weatherData;

	const { data, error} = useSWR(
		`/.netlify/functions/getWeather/portland?city=${city}`,
		fetcher,
		{
			initalData: {...props.weatherData}
		}
	);

	if (!!data) {
		console.log('data is defined')
		const didChange = !deepEqual(data.weatherData, props.weatherData);
		console.log(didChange ? "data changed" : "no change")
		if (didChange) {
			weatherData = data.weatherData;
		}
	} else {

		console.log('data is undefined')
	}

	console.log({weatherData})

	// debugger;

  // console.log(weatherData);

  if (props.status === '404') {

	  return (
	  	<div className="error">
	  		<h2>Sorry could get that cities data :(</h2>
	  	</div>
	  )

  }

  // return <div>it loaded!</div>

   if (props.status !== '404') {
	   return (
	   	<div className="container">
		     <h1>{weatherData.name}</h1>
		     <div className="weather_current">
		     	<span>Current weather: </span>
		     	<span>{weatherData.weather[0].main}</span>
		     </div>
		     <ul>
		       {
		         Object.entries(weatherData.main).map((d, i) => {
		           return (
		             <li key={uid()}>
		               <span>{d[0]}: {d[1]}</span>
		             </li>
		           )
		         }) 
		       }
		     </ul>
	     </div>
	   )
   }
}



export async function getServerSideProps (context) {
	const { city } = context.params;
  console.log(city)



  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
  const weatherData = await res.json();

  console.log(weatherData)
  // if (weatherData.cod !== '404') {

	return {
    props: {
      weatherData,
      city
    }
  }
}

