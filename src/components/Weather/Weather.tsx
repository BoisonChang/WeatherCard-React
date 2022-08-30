import React, {useState , useEffect, useMemo} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import WeatherCard from '@/components/Weather/WeatherCard'
import WeatherSetting from '@/components/Weather/WeatherSetting'
import useWeatherApi from '@/composable/useWeatherApi'
import useMoment from '@/composable/useMoment'
import { findLocation } from '@/utils/utils'
import { WeatherElementType } from '@/type/type'
import { useSelector } from 'react-redux'

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

interface RootState {
  currentCity: string
}

const WeatherApp = () => {
  const storageTheme = localStorage.getItem('modeType')
  // 從 useMoment 取得輸入所在城市，即可判斷現在時間白天還是黑夜的函式 
  const {getMoment} = useMoment()
  // 若是 storageCity 沒儲存東西就預設臺北市
  const currentCity = useSelector((state:RootState) => state.currentCity)
  // const [currentCity, setCurrentCity] = useState<string>(storageCity || '臺北市')
  // 從 currentCity 去找出對應的其他名稱
  const currentLocation = findLocation(currentCity) || {cityName: '臺北市',locationName: '天母',sunriseCityName: '臺北市'}
  const [currentTheme, setCurrentTheme] = useState<string>('light')
  const [currentPage, setCurrentPage] = useState<string>('WeatherCard')
  const [weatherElement, fetchData] = useWeatherApi(currentLocation)
  const moment = useMemo(() => getMoment(currentLocation.sunriseCityName) || 'day', [currentLocation, getMoment])
  // 輸入白天黑夜決定現在的主題
  useEffect(() => {setCurrentTheme(moment === 'night' || storageTheme === 'night' ? 'dark' : 'light')}, [])

  return (
    <ThemeProvider theme={theme[currentTheme as keyof typeof theme]}>
      <Container>
        {currentPage === 'WeatherCard' && (
          <WeatherCard 
              cityName={currentLocation?.cityName}
              weatherElement={weatherElement as WeatherElementType} 
              moment={moment}
              fetchData={fetchData as Function}
              setCurrentTheme={setCurrentTheme}
              setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'WeatherSetting' && (
          <WeatherSetting 
            cityName={currentLocation.cityName} 
            setCurrentPage={setCurrentPage} 
          />)}
      </Container>
    </ ThemeProvider>
  )
}

export default WeatherApp