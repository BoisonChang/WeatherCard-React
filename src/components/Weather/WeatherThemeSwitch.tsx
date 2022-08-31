import React, { useEffect } from 'react'
import '@/components/Weather/WeatherThemeSwitch.css'
import { switchTheme } from '@/action/weather'
import { useSelector, useDispatch } from 'react-redux'
interface RootState {
    currentTheme: string
}

const WeatherThemeSwitch = () => {
    const dispatch = useDispatch()
    const currentTheme = useSelector((state:RootState) => state.currentTheme)
    const handleTheme = () => {
        dispatch(switchTheme(currentTheme === 'light' ? 'dark' : 'light'))
    }
    useEffect(() => {
        let domToggleCheckbox = (document.getElementById('toggle-checkbox') as HTMLInputElement)
        domToggleCheckbox.checked = currentTheme === 'dark' ? true : false
    }, [currentTheme])

    return (
        <label className="container" >
            <input className='toggle-checkbox' type='checkbox' id="toggle-checkbox" onClick={handleTheme}></input>
            <div className='toggle-slot' >
                <div className='toggle-button'></div>
            </div>
        </label>
    )
}
  
  export default WeatherThemeSwitch