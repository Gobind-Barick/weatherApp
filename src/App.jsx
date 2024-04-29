import React from 'react'



import "./assets/App.css"
import { useState ,useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [data, setData] = useState({
    celsius :10,
    name: 'London',
    humidity : 10,
    speed: 2,
    image :"/cloud.png"
  })
  const [location, setLocation] = useState('')

  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`
useEffect(() => {
  
  
  

}, [])

const search =()=>{
  
  axios.get(url).then((response) => {
   let imagePath = "" ;
    if(response.data.weather[0].main=="Clouds"){
      imagePath="/cloud.png"
    }
    else if(response.data.weather[0].main=="Clear"){
      imagePath="../public/clear.png"
    }
   else if(response.data.weather[0].main=="Rain"){
      imagePath="/rain.png"
    }
   else if(response.data.weather[0].main=="Drizzle"){
      imagePath="/drizzle.png"
    }
   else if(response.data.weather[0].main=="Snow"){
      imagePath="/snow.png"
    }
    else{
      imagePath="/cloud.png"
    }
    setData({...data,celsius: response.data.main.temp , name:response.data.name, humidity: response.data.main.humidity
    ,speed:response.data.wind.speed,
     image:imagePath})
    console.log(response.data)
  })
  


}


  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityinput" placeholder='enter the city'
                onChange={e=>setLocation(e.target.value)}
                />
        <div className="search-icon" onClick={search}>
          <img src="/search.png" alt=""  />
        </div>
      </div>
      <div className="weather-image">
        <img src={data.image} alt="" />
      </div>
      <div className="weather-temp">{Math.floor(data.celsius)}°c</div>
      <div className="weather-location">{data.name}</div>
      <div className="data-container">
        <div className="element">
          <img src="/humidity.png" alt=""  className='icon'/>
          <div className="data">
            <div className="humidiy-percent">{data.humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src="/wind.png"alt=""  className='icon'/>
          <div className="data">
            <div className="humidiy-percent">{Math.round(data.speed)}  km/hr</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default App