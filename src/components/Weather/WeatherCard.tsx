import React from 'react'
import styled from 'styled-components'
import { ReactComponent as AirFlowIcon } from '@/images/airFlow.svg'
import { ReactComponent as RainIcon } from '@/images/rain.svg'
import { ReactComponent as RefreshIcon } from '@/images/refresh.svg'
import { ReactComponent as LoadingIcon } from '@/images/loading.svg'
import { ReactComponent as CogIcon } from '@/images/cog.svg'
import WeatherIcon from '@/components/Weather/WeatherIcon'
import WeatherThemeSwitch from '@/components/Weather/WeatherThemeSwitch'
import { WeatherCardElement } from '@/type/type'
import { editPage } from '@/action/weather'
import { useDispatch, useSelector } from 'react-redux'

const WeatherCardWrapper = styled.div`
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

const Refresh = styled.div<{ isLoading: boolean }>`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.textColor};
  isLoading:string;

  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: ${({ isLoading}) => isLoading ? '1.5s' : '0s'}
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

const Cog = styled(CogIcon)`
  position: absolute;
  top: 30px;
  right: 15px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`
interface RootState {
  currentLocation: {
    cityName: string,
    locationName: string,
    sunriseCityName: string
  }
}


const WeatherCard = ({weatherElement, moment, fetchData} : WeatherCardElement) => {
    const dispatch = useDispatch()
    const currentLocationCity = useSelector((state:RootState) => state.currentLocation).cityName
    // 從 weatherElement 解構賦值方式取出以下變數，簡化後續程式碼
    const {
      observationTime,
      temperature,
      windSpeed,
      description,
      weatherCode,
      rainPossibility,
      comfortability,
      isLoading
    } = weatherElement

    return (
    <WeatherCardWrapper>
      <WeatherThemeSwitch />
      <Cog onClick={() => dispatch(editPage('WeatherSetting')) }/>
      <Location>{currentLocationCity ? currentLocationCity : '臺北市'}</Location>
      <Description> {description ? description : '目前無資料'} /  {comfortability ? comfortability : '目前無資料'} </Description>
      <CurrentWeather>
        <Temperature> {temperature ? Math.round(temperature) : 'N/A'}<Celsius>°C</Celsius></Temperature>
        <WeatherIcon 
          currentWeatherCode={weatherCode ? weatherCode : 1}
          moment={moment || 'day'}
        />
      </CurrentWeather>
      <AirFlow><AirFlowIcon /> {windSpeed ? windSpeed :  'N/A' } m/h </AirFlow>
      <Rain><RainIcon />{rainPossibility * 100 >= 0 ? rainPossibility :  'N/A' } %</Rain>  
      <Refresh 
        isLoading={isLoading}
        onClick={(event: any) => fetchData} 
        >
          最後觀測時間：
          {observationTime ? new Intl.DateTimeFormat('zh-TW', {
            hour: 'numeric',
            minute: 'numeric',
          }).format(new Date(observationTime)) : '00:00' }
          {' '}
          {isLoading ? <LoadingIcon /> : <RefreshIcon />}
      </Refresh>
    </WeatherCardWrapper>
    )
}

export default WeatherCard