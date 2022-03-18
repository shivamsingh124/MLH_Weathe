import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png'
/*global google*/
function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [results, setResults] = useState(null);
  const [lat, SetLatitude] = useState(0);
  const [lon, SetLongitude] = useState(0);

useEffect(() => {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
    else{
      window.alert("Geolocation is not supported by this browser.");
    }

function showPosition(position){
  var lat1=position.coords.latitude;
  var lon1=position.coords.longitude;
  console.log(lat,lon)
    SetLatitude(lat1);
    SetLongitude(lon1);
    console.log(lat,lon)
    // displayLocation(lat,lon);
}

function showError(error){
    switch(error.code){
      case error.PERMISSION_DENIED:
                window.alert("User denied the request for Geolocation.")
              break;
              case error.POSITION_UNAVAILABLE:
                window.alert("Location information is unavailable.")
              break;
              case error.TIMEOUT:
                window.alert(" The request to get user location timed out.")
              break;
              case error.UNKNOWN_ERROR:
                window.alert("An unknown error occurred.")
              break;
        
    }
}

// function displayLocation(latitude,longitude){
//     var geocoder;
//     // console.log(google);
//     geocoder = new google.maps.Geocoder();
//     var latlng = new google.maps.LatLng(latitude, longitude);
//     console.log(latlng);
//     geocoder.geocode(
//         {'latLng': latlng}, 
//         function(results, status) {
//             if (status == google.maps.GeocoderStatus.OK) {
//                 if (results[0]) {
//                     var add= results[0].formatted_address ;
//                     var  value=add.split(",");
//                     setCity(value[value.length-3]);
//                 }
//                 else  {
//                   window.alert ("address not found");
//                 }
//             }
//             else {
//               window.alert ("Geocoder failed due to: " + status);
//             }
//         }
//     );
// }

// "
// http://api.openweathermap.org/data/2.5/weather?lat={51.5098}&lon={-0.1180}&appid=536df96687605e03adf15c60cfdcfdf3&units=metric'.format(latitude, longitude"
},[])
  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== 200) {
            setIsLoaded(false)
          } else {
            setIsLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [city])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>
        <h2>Enter a city below 👇</h2>
        <input
          type="text"
          value={city}
          onChange={event => setCity(event.target.value)} />
        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {console.log(results)}
          {isLoaded && results && <>
            <h3>{results.weather[0].main}</h3>
            <p>Feels like {results.main.feels_like}°C</p>
            <i><p>{results.name}, {results.sys.country}</p></i>
          </>}
        </div>
      </div>
    </>
  }
}

export default App;
