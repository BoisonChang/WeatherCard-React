import {useState, useEffect, useCallback} from 'react'
import {LocationType} from '@/utils/utils'
import {WeatherElementType, WeatherType} from '@/type/type'

const fetchCurrentWeather = (locationName:string) => {
  return fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWB-FA90FD61-C9A1-4C1D-AF00-F2E16E4EBB75&locationName=${locationName}`,
  )
    .then(response => response.json())
    .then(data => {
      const locationData = data.records.location[0]
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements:any, item:{elementName:string,elementValue:string}) => {
          if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
            neededElements[item.elementName] = item.elementValue;
          }
          return neededElements
        },
        {},
      )
      return {
        observationTime: locationData.time.obsTime,
        locationName: locationData.locationName,
        temperature: weatherElements.TEMP,
        windSpeed: weatherElements.WDSD,
        humid: weatherElements.HUMD,
      }
    }).catch(function(error) {
        console.log('error : ', error);
    })
}

const fetchWeatherForecast = (cityName:string) => {
  return fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-FA90FD61-C9A1-4C1D-AF00-F2E16E4EBB75&locationName=${cityName}`,
  )
    .then(response => response.json())
    .then(data => {
      const locationData = data.records.location[0]
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements:any, item:WeatherType) => {
          if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
            neededElements[item.elementName] = item.time[0].parameter
          }
          return neededElements
        }, {},
      )
      return {
        description: weatherElements.Wx.parameterName,
        weatherCode: weatherElements.Wx.parameterValue,
        rainPossibility: weatherElements.PoP.parameterName,
        comfortability: weatherElements.CI.parameterName,
      }
    }).catch(function(error) {
        console.log('error : ', error)
    })
}

const useWeatherApi = (currentLocation:LocationType) => {
  const { locationName, cityName } = currentLocation
  const [weatherElement, setWeatherElement] = useState<WeatherElementType>({
    observationTime: new Date(),
    locationName: '',
    temperature: 0,
    windSpeed: 0,
    description: '',
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: '',
    isLoading: true,
  })

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const [currentWeather, weatherForecast] = await Promise.all([
        fetchCurrentWeather(locationName),
        fetchWeatherForecast(cityName),
      ])
      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
        isLoading: false,
      } as WeatherElementType)
    }
    setWeatherElement(prevState => ({
      ...prevState,
      isLoading: true,
    }))
    fetchingData()
  }, [locationName, cityName])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return [weatherElement, fetchData]
}

export default useWeatherApi
