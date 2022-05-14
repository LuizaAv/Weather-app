import {useEffect, useState}  from 'react'
import axios from "axios"
import './App.css';




function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({})
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=aaef2b6a0a2d660eb00ea58538cda684`

  const search = (event) => {
    if(event.key === "Enter"){
        axios.get(url)
          .then(response => {
            setData(response.data)
            console.log(response.data.name)
            setLocation("")
          })
    }
  } 

  
  let seconds, minutes, hours;

  function date(){
    seconds = Math.floor(data.sys.sunrise/1000);
    minutes = Math.floor(seconds/60);
    hours = Math.floor(minutes/60)
  }

  return (
    <div className="App">
      <div className='cityName'>
        {data.name ? <h2>{data.name}</h2> : <h2>City name</h2>}
      </div>
      <div>
        <input 
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={search}
        className="searchInput"
        />
      </div>
      <div>
        <div className='tempInfo'>
            <div className='temp'>
                <p className='tempNum1'>Current temp: </p>
              <br/>
                <p className='tempNum2'>{data.main ? (`${Math.floor(data.main.temp)} ° F`) : null }</p>
              <br/>
            </div>
            {data.weather && data.weather[0].main === "Clouds" ? <div className='WeatherDiv'><p>{data.weather[0].main}</p><img className='weatherImage1' /></div> : null}
            {data.weather && data.weather[0].main === "Clear" ? <div className='WeatherDiv'><p>{data.weather[0].main}</p><img className='weatherImage2' /></div> : null}
            {data.weather && data.weather[0].main === "Snow" ? <div className='WeatherDiv'><p>{data.weather[0].main}</p><img className='weatherImage3' /></div> : null}
            {data.weather && data.weather[0].main === "Sunny" ? <div className='WeatherDiv'><p>{data.weather[0].main}</p><img className='weatherImage4' /></div> : null}
        </div>
        <div className='weatherInfo'>
          <div className='infoItem1'>
              Humidity: <br/>{data.main ? <p>{data.main.humidity}</p> : "low"}
          </div> 
          <div className='infoItem'>
              Wind speed: <br/>{data.wind ? <p>{data.wind.speed}</p> : "low"}
          </div>      
          <div className='infoItem'>
              Feels like: <br/>{data.main ? <p>{Math.floor(data.main.feels_like)} °F</p> : "25°F"} 
          </div> 
        </div> 
      </div>
    </div>
  );
}

export default App;
