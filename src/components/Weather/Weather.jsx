import {React, useState} from 'react'
import styled from 'styled-components';
import { ReactComponent as CloudyIcon } from '@/images/day-cloudy.svg';
import { ReactComponent as AirFlowIcon } from '@/images/airFlow.svg';
import { ReactComponent as RainIcon } from '@/images/rain.svg';
import { ReactComponent as RedoIcon } from '@/images/refresh.svg'   

const Container = styled.div`
  background-color: #ededed;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const WeatherCard = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: 0 1px 3px 0 #999999;
  background-color: #f9f9f9;
  box-sizing: border-box;
  padding: 30px 15px;
`

const Location = styled.div`
  color: ${props => props.theme === 'dark' ? '#dadada' : '#212121'};
  font-size: 28px;
  color: #212121;
  margin-bottom: 20px;
`

const Description = styled.div`
  font-size: 16px;
  color: #828282;
  margin-bottom: 30px;
`

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

const Temperature = styled.div`
  color: #757575;
  font-size: 96px;
  font-weight: 300;
  display: flex;
`

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: #828282;
  margin-bottom: 20px;
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: #828282;
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`

const Cloudy = styled(CloudyIcon)`
  flex-basis: 30%;
`

const Redo = styled(RedoIcon)`
  width: 15px;
  height: 15px;
  position: absolute;
  right: 15px;
  bottom: 15px;
  cursor: pointer;
`
// const rejectButton = styled.button`

//   display: block;
//   width: 120px;
//   height: 30px;
//   font-size: 14px;
//   background-color: transparent;
//   color: ${props.theme === 'dark' ? '#dadada' : '#212121'};
//   background-color: red;
// `
// const acceptButton = styled.button`
//     display: block;
//     width: 120px;
//     height: 30px;
//     font-size: 14px;
//     background-color: transparent;
//     color: ${props.theme === 'dark' ? '#dadada' : '#212121'};
//   background-color: green;
// `

const WeatherApp = () => {
    const [currentWeather, setCurrentWeather] = useState({
        observationTime: '2019-10-02 22:10:00',
        locationName: '臺北市',
        description: '多雲時晴',
        temperature: 27.5,
        windSpeed: 0.3,
        humid: 0.88,
      })
    
    const handleClick = () => {
      fetch(
        'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWB-B9F0956E-A02F-4CB6-B532-650BD4D594D3&stationId=C0A9C0'
      )
      .then((response) => response.json())
      .then((data) => {
        const locationData = data.records.location[0]
        const weatherElements = locationData.weatherElement.reduce(
          (neededElements, item) => {
            if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
              neededElements[item.elementName] = item.elementValue > 0 ? item.elementValue : 'N/A'
            }
            return neededElements;
          },
          {}
        )
        setCurrentWeather({
          observationTime: locationData.time.obsTime,
          locationName: '臺北市',
          description: '多雲時晴',
          temperature: weatherElements.TEMP,
          windSpeed: weatherElements.WDSD,
          humid: weatherElements.HUMD,
        });
      })
    }

    


    return (
      <Container>
        <WeatherCard>
          <Location theme="dark">{currentWeather.locationName}</Location>
          <Description>
            {
                new Intl.DateTimeFormat('zh-TW', {
                    hour: 'numeric',
                    minute: 'numeric'
                }).format(new Date(currentWeather.observationTime))
            }
            {' '}
            {currentWeather.description}
          </Description>
          <CurrentWeather>
            <Temperature>
            {Math.round(currentWeather.temperature) ? Math.round(currentWeather.temperature) :  'N/A'}<Celsius>°C</Celsius>
            </Temperature>
            <Cloudy />
          </CurrentWeather>
          <AirFlow>
                <AirFlowIcon />
                {currentWeather.windSpeed} m/h 
            </AirFlow>
          <Rain>
                <RainIcon />
                {currentWeather.humid * 100 ? currentWeather.humid :  'N/A' } %
          </Rain>
          <Redo onClick={handleClick} />
        </WeatherCard>
      </Container>
    );
  };

export default WeatherApp;