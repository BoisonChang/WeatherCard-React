import {React, useState , useEffect, useCallback, useMemo} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import { ReactComponent as AirFlowIcon } from '@/images/airFlow.svg'
import { ReactComponent as RainIcon } from '@/images/rain.svg'
import { ReactComponent as RefreshIcon } from '@/images/refresh.svg'
import { ReactComponent as LoadingIcon } from '@/images/loading.svg';   
import WeatherIcon from '@/components/Weather/WeatherIcon'
import sunriseAndSunsetData from '@/sunrise-sunset-tapei.json'

const getMoment = (locationName) => {
  const location = sunriseAndSunsetData.find(
    (data) => data.locationName === locationName
  )

  if (!location) return null;

  const now = new Date();

  const nowDate = Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(now)
    .replace(/\//g, '-');

  const locationDate =
    location.time && location.time.find((time) => time.dataTime === nowDate);

  const sunriseTimestamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunrise}`
  ).getTime();
  const sunsetTimestamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunset}`
  ).getTime();
  const nowTimeStamp = now.getTime();

  return sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimestamp
    ? 'day'
    : 'night';
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const WeatherCard = styled.div`
  position: relative;
  min-width: 400px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 30px 15px;
`

const Location = styled.div`
  color: ${({ theme }) => theme.titleColor};
  font-size: 28px;
  color: #212121;
  margin-bottom: 20px;
`

const Description = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

const Temperature = styled.div`
  color: ${({ theme }) => theme.temperatureColor};
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
  color: ${({ theme }) => theme.textColor};
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
  color: ${({ theme }) => theme.textColor};

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`

const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.textColor};

  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: ${({ isLoading }) => (isLoading ? '1.5s' : '0s')}
  }

  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`
const theme = {
  light: {
    backgroundColor: '#ededed',
    foregroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor: '#212121',
    temperatureColor: '#757575',
    textColor: '#828282',
  },
  dark: {
    backgroundColor: '#1F2022',
    foregroundColor: '#121416',
    boxShadow:
      '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc',
  },
}

const WeatherApp = () => {
  const [weatherElement, setWeatherElement] = useState({
      observationTime: new Date(),
      locationName: '臺北市',
      humid: 0,
      temperature: 0,
      windSpeed: 0,
      description: '目前無資料',
      weatherCode: 0,
      rainPossibility: 0,
      comfortability: '目前無資料',
      isLoading: true
  })
  const [currentTheme, setCurrentTheme] = useState('light')
  const {
    observationTime,
    locationName,
    temperature,
    windSpeed,
    description,
    weatherCode,
    rainPossibility,
    comfortability,
    isLoading,
  } = weatherElement;

  const moment = useMemo(() => getMoment(locationName), [locationName,])
  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const [currentWeather, weatherForecast] = await Promise.all([
        fetchCurrentWeather(),
        fetchWeatherForecast(),
      ])
  
      setWeatherElement({
        ...weatherElement,
        ...currentWeather,
        ...weatherForecast,
        isLoading: false
      })
    }
    setWeatherElement((prevState) => ({
      ...prevState,
      isLoading: true,
    }))
    fetchingData()
  }, [weatherElement])

  useEffect(()=>{
      fetchData();
  } ,[fetchData])

  useEffect(() => {
    setCurrentTheme(moment === 'day' ? 'light' : 'dark')
  }, [moment])

  const fetchWeatherForecast = () => {
    return fetch(
      'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-FA90FD61-C9A1-4C1D-AF00-F2E16E4EBB75&locationName=%E8%87%BA%E5%8C%97%E5%B8%82'
    )
    .then((response) => response.json())
    .then((data) => {
      const locationData = data.records.location[0];
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
            neededElements[item.elementName] = item.time[0].parameter;
          }
          return neededElements;
        },
        {}
      );

      return  {
        description: weatherElements.Wx.parameterName,
        weatherCode: weatherElements.Wx.parameterValue,
        rainPossibility: weatherElements.PoP.parameterName,
        comfortability: weatherElements.CI.parameterName,
      }
    });
  }

    
  const fetchCurrentWeather = () => {
    return fetch(
      'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWB-FA90FD61-C9A1-4C1D-AF00-F2E16E4EBB75&locationName=%E5%A4%A9%E6%AF%8D'
    )
    .then((response) => response.json())
    .then((data) => {
      const locationData = data.records.location[0]
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
            neededElements[item.elementName] = item.elementValue
          }
          return neededElements;
        },
        {}
      )
      return  {
        observationTime: locationData.time.obsTime,
        temperature: weatherElements.TEMP,
        windSpeed: weatherElements.WDSD,
        humid: weatherElements.HUMD,
      }
    })
  }

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container  theme={theme.dark}>
        <WeatherCard>
          <Location theme="dark">{locationName}</Location>
          <Description>
            {description} /  {comfortability} 
          </Description>
          <CurrentWeather>
            <Temperature>
            {Math.round(temperature)}<Celsius>°C</Celsius>
            </Temperature>
            <WeatherIcon 
              currentWeatherCode={weatherCode}
              moment={moment || 'day'}
            />
          </CurrentWeather>
          <AirFlow>
                <AirFlowIcon />
                {windSpeed} m/h 
            </AirFlow>
          <Rain>
                <RainIcon />
                {rainPossibility * 100 >= 0 ? rainPossibility :  'N/A' } %
          </Rain>
          <Refresh onClick={fetchData} isLoading={isLoading}>
            最後觀測時間：
            {new Intl.DateTimeFormat('zh-TW', {
              hour: 'numeric',
              minute: 'numeric',
            }).format(new Date(observationTime))}{' '}
            {isLoading ? <LoadingIcon /> : <RefreshIcon />}
          </Refresh>
        </WeatherCard>
      </Container>
    </ ThemeProvider>
  )
}

export default WeatherApp