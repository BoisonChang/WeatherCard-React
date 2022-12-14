import React from 'react'
import styled from 'styled-components'
import { availableLocations } from '@/utils/utils'
import { useSelector, useDispatch } from 'react-redux'
import { editPage, editLocation } from '@/action/weather'

const WeatherSettingWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 20px;
`

const Title = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 30px;
`

const StyledLabel = styled.label`
  display: block;
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 15px;
`

const StyledInputList = styled.input`
  display: block;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.textColor};
  outline: none;
  width: 100%;
  max-width: 100%;
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;
  padding: 7px 10px;
  margin-bottom: 40px;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    user-select: none;
    margin: 0;
    letter-spacing: 0.3px;
    line-height: 1;
    cursor: pointer;
    overflow: visible;
    text-transform: none;
    border: 1px solid transparent;
    background-color: transparent;
    height: 35px;
    width: 80px;
    border-radius: 5px;

    &:focus,
    &.focus {
      outline: 0;
      box-shadow: none;
    }

    &::-moz-focus-inner {
      padding: 0;
      border-style: none;
    }
  }
`

const Back = styled.button`
  && {
    color: ${({ theme }) => theme.textColor};
    border-color: ${({ theme }) => theme.textColor};
  }
`

const Save = styled.button`
  && {
    color: white;
    background-color: #40a9f3;
  }
`
interface RootState {
  currentLocation: {
    cityName: string,
    locationName: string,
    sunriseCityName: string
  }
}

const locations = availableLocations.map((location) => location.cityName)
const newLocation = (cityName:string) => availableLocations.filter((location) => location.cityName === cityName)[0]

const WeatherSetting = () => {
  const dispatch = useDispatch()
  const currentLocation = useSelector((state:RootState) => state.currentLocation)
  let newCityName = currentLocation.cityName
  // const [locationName, setLocationName] = useState<string>(cityName)
  const handleChange = (e: any) => {
    console.log(e.target.value)
    newCityName = e.target.value
  }

  const handleSave = () => {
    if (locations.includes(currentLocation.cityName)) {
      console.log(`???????????????????????????${currentLocation.cityName}`)
      dispatch(editPage('WeatherCard'))
      dispatch(editLocation({...newLocation(newCityName)}))
      localStorage.setItem('city', newCityName)
    } else {
      alert(`??????????????????????????? ${currentLocation.cityName} ?????????????????????`)
      return
    }
  }

  return (
    <WeatherSettingWrapper>
      <Title>??????</Title>
      <StyledLabel htmlFor="location">??????</StyledLabel>
      <StyledInputList list="location-list" id="location" name="location" onChange={handleChange} />
        <datalist id="location-list">
          { locations.map(cityName => (<option value={cityName} key={cityName} />)) }
        </datalist>
      <ButtonGroup>
        <Back onClick={() => dispatch(editPage('WeatherCard'))}>??????</Back>
        <Save onClick={handleSave}>??????</Save>
      </ButtonGroup>
    </WeatherSettingWrapper>
  )
}

export default WeatherSetting