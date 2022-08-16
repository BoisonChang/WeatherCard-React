import { useState, useEffect, useCallback } from 'react'

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

const useWeatherApi = () => {
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

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return [weatherElement, fetchData]
}
  
export default useWeatherApi