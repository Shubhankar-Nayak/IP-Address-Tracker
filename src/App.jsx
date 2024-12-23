import React,{ useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchIpData } from './api'
import './App.css'
import arrow from './assets/images/icon-arrow.svg'
import location from './assets/images/icon-location.svg'
import background from './assets/images/pattern-bg-desktop.png'

const defaultLocation = [40.7128, -74.0060];

const customIcon = L.icon({
  iconUrl: location,
  iconSize: [40, 50], 
  iconAnchor: [20, 40], 
});

function App() {
  const [ip, setIp] = useState('');
  const [ipData, setIpData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!ip.trim()) {
      setError('Please enter a valid IP address or domain.');
      return;
    }
    try {
      const data = await fetchIpData(ip);
      setIpData(data);
      setError(null);
      console.log(data);
    } catch (err) {
      setError('Unable to fetch IP data. Please check the IP address and try again.');
      setIpData(null);
    }
  };
  
  const mapCenter = ipData?.location
    ? [ipData.location.lat, ipData.location.lng]
    : defaultLocation; 

  return (
    <div className='w-full h-full flex flex-col justify-center items-center font-Rubik'>
      <div className='w-full hidden absolute top-0 mobile-l:block -z-10'>
        <img className='w-full h-60' src={background} alt="Background" />
      </div>

      <div className='w-full flex flex-col justify-center items-center mb-20 tablet:mb-0'>
        <h1 className='text-[25px] text-white my-5 laptop:my-7 font-medium'>IP Address Tracker</h1>
        <div className='w-[90%] tablet:w-[500px] h-[7vh] flex rounded-xl overflow-hidden'>
          <input
            className='w-[83%] px-4' 
            type="text" 
            placeholder='Search for any IP address or domain'
            value={ip}
            onChange={(e) => setIp(e.target.value)} 
          />
          <button className='w-[17%] h-full py-3 flex justify-center items-center bg-[black]' onClick={handleSearch}><img src={arrow} alt="" /></button>
        </div>
      </div>

      <div className='w-[90%] h-fit laptop:w-[77%] laptop:h-[160px] absolute top-[20%] laptop:top-[25%] z-10 py-3 bg-white flex flex-col laptop:flex-row justify-center items-center laptop:justify-around rounded-xl'>
        <div className='laptop:w-[25%] flex flex-col justify-center items-center my-2'>
          <p className='text-[12px] text-DarkGray font-semibold'>IP ADDRESS</p>
          <p className='text-[20px] font-semibold'>{ipData?.ip || '---'}</p>
        </div>
        <div className='w-[1px] h-[80px] border-r-[1px] border-DarkGray hidden laptop:block'></div>
        <div className='laptop:w-[25%] flex flex-col justify-center items-center my-2'>
          <p className='text-[12px] text-DarkGray font-semibold'>LOCATION</p>
          <p className='text-[20px] font-semibold'>{ipData?.location?.city}, {ipData?.location?.country} {ipData?.location?.postalCode || ''}</p>
        </div>
        <div className='w-[1px] h-[80px] border-r-[1px] border-DarkGray hidden laptop:block'></div>
        <div className='laptop:w-[25%] flex flex-col justify-center items-center my-2'>
          <p className='text-[12px] text-DarkGray font-semibold'>TIMEZONE</p>
          <p className='text-[20px] font-semibold'>{ipData?.location?.timezone || '---'}</p>
        </div>
        <div className='w-[1px] h-[80px] border-r-[1px] border-DarkGray hidden laptop:block'></div>
        <div className='laptop:w-[25%] flex flex-col justify-center items-center my-2'>
          <p className='text-[12px] text-DarkGray font-semibold'>ISP</p>
          <p className='text-[20px] font-semibold text-center'>{ipData?.isp || '---'}</p>
        </div>
      </div>

        <div className="w-full h-[500px] z-0 mt-20">
          <MapContainer
            center={mapCenter}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={mapCenter} icon={customIcon}>
              <Popup>
              {ipData?.location
                ? `${ipData.location.city}, ${ipData.location.country}`
                : 'Default Location'}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
  
    </div>
  )
}

export default App
