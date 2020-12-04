// [city].js

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};


export default function Index(props) {
  console.log(props);
  const { weatherData } = props;

  if (props.status === '404') {

	  return (
	  	<div className="error">
	  		<h2>Sorry could get that cities data :(</h2>
	  	</div>
	  )

  }


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
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_KEY;
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

  const weatherData = await res.json();
  console.log(weatherData)
  if (weatherData.cod !== '404') {
		return {
	    props: {
	      weatherData
	    }
	  }
  }

  return {
  	props: {
	  	status: 404,
  	}
  }
}
