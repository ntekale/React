import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css';


const Forecast = () => {
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('metric');
	 let [error, setError] = useState(false);
   let [loading, setLoading] = useState(false);

	let [responseObj, setResponseObj] = useState({});
	
	const uriEncodedCity = encodeURIComponent(city);


   function GetForecast(e) {

   e.preventDefault();
   
     fetch(`https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
		"x-rapidapi-key": "3eeabff425msh1c14d9142699953p155a20jsn3c1c648079a1"
	}
})


/*.then(response => {
	console.log(response);
})
*/

       .then(response => response.json())
       .then(response => {
           setResponseObj(response)
       })

.catch(err => {
	console.error(err);
});
   }


   return (
              <div>
           <h2>Find Current Weather Conditions</h2>
                
			
            <form onSubmit={GetForecast}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    value={city}
					className={classes.textInput}
                    onChange={(e) => setCity(e.target.value)}
                    />
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Fahrenheit
                </label>
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Celcius
                </label>

                <button className={classes.Button} type="submit">Get Forecast</button>

            </form>

				
				 <Conditions
               responseObj={responseObj}
               />
			</div>
   )
}

export default Forecast;