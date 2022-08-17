import {React, useState , useEffect, useMemo} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import WeatherCard from '@/components/Weather/WeatherCard'
import WeatherSetting from '@/components/Weather/WeatherSetting'
import useWeatherApi from '@/composable/useWeatherApi'
import useMoment from '@/composable/useMoment'
import { findLocation } from '@/utils/utils.js'

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
    boxShadow: '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc',
  },
}

const WeatherApp = () => {
  const storageCity = localStorage.getItem('cityName')
  // 從 useMoment 取得輸入所在城市，即可判斷現在時間白天還是黑夜的函式 
  const {getMoment} = useMoment()
  // 若是 storageCity 沒儲存東西就預設臺北市
  const [currentCity, setCurrentCity] = useState(storageCity || '臺北市')
  // 從 currentCity 去找出對應的其他名稱
  const currentLocation = findLocation(currentCity) || {}
  const [currentTheme, setCurrentTheme] = useState('light')
  const [currentPage, setCurrentPage] = useState('WeatherCard')
  const [weatherElement, fetchData] = useWeatherApi(currentLocation)
  const moment = useMemo(() => getMoment(currentLocation.sunriseCityName), [currentLocation.sunriseCityName, getMoment])
  // 輸入白天黑夜決定現在的主題
  useEffect(() => {  setCurrentTheme(moment === 'dark' ? 'dark' : 'light')}, [])
  // 儲存選擇的現在所在的城市
  useEffect(() => { localStorage.setItem('cityName', currentCity)}, [currentCity])
  

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        {currentPage === 'WeatherCard' && (
          <WeatherCard 
              cityName={currentLocation.cityName}
              weatherElement={weatherElement}
              moment={moment}
              fetchData={fetchData}
              setCurrentTheme={setCurrentTheme}
              setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'WeatherSetting' && (
          <WeatherSetting 
            cityName={currentLocation.cityName} 
            setCurrentCity={setCurrentCity}
            setCurrentPage={setCurrentPage} 
          />)}
      </Container>
    </ ThemeProvider>
  )
}

export default WeatherApp