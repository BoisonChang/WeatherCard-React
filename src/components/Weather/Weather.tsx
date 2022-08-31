import React, {useEffect, useMemo} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import WeatherCard from '@/components/Weather/WeatherCard'
import WeatherSetting from '@/components/Weather/WeatherSetting'
import useWeatherApi from '@/composable/useWeatherApi'
import useMoment from '@/composable/useMoment'
import { WeatherElementType } from '@/type/type'
import { useSelector, useDispatch } from 'react-redux'
import { switchTheme } from '@/action/weather'

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
  currentPage: string,
  currentTheme: string
  currentLocation: {
    cityName: string,
    locationName: string,
    sunriseCityName: string
  }
}

const WeatherApp = () => {
  const dispatch = useDispatch()
  // 從 useMoment 取得輸入所在城市，即可判斷現在時間白天還是黑夜的函式 
  const {getMoment} = useMoment()
  const currentPage = useSelector((state:RootState) => state.currentPage)
  const currentTheme = useSelector((state:RootState) => state.currentTheme)
  const currentLocation = useSelector((state:RootState) => state.currentLocation)
  const [weatherElement, fetchData] = useWeatherApi(currentLocation)
  const moment = useMemo(() => getMoment(currentLocation.sunriseCityName) || 'day', [currentLocation, getMoment])
  // 輸入白天黑夜決定現在的主題
  useEffect(() => {dispatch(switchTheme(moment === 'night' ? 'dark' : 'light'))}, [])

  return (
    <ThemeProvider theme={theme[currentTheme as keyof typeof theme]}>
      <Container>
        {currentPage === 'WeatherCard' && (
          <WeatherCard 
            weatherElement={weatherElement as WeatherElementType} 
            moment={moment}
            fetchData={fetchData as Function}
          />
        )}
        {currentPage === 'WeatherSetting' && (
          <WeatherSetting 
        />)}
      </Container>
    </ ThemeProvider>
  )
}

export default WeatherApp