import React, { useState, useEffect } from 'react'
import '@/components/Weather/WeatherThemeSwitch.css'

type Props = {
    moment: string,
    setCurrentTheme: Function,
}

const WeatherThemeSwitch = ({setCurrentTheme, moment}: Props) => {
    const storageMode = localStorage.getItem('modeType')
    const [mode, setMode] = useState(storageMode || moment)  
    const handleTheme = () => {
        setCurrentTheme(mode === 'day' ? 'dark' : 'light')
        setMode(mode === 'day' ? 'night' : 'day')
    }
    useEffect(() => {localStorage.setItem('modeType', mode)} , [mode])
    useEffect(() => {
        let domToggleCheckbox = (document.getElementById('toggle-checkbox') as HTMLInputElement)
        domToggleCheckbox.checked = mode === 'night' ? true : false
    }, [])

    return (
        <label className="container" >
            <input className='toggle-checkbox' type='checkbox' id="toggle-checkbox"></input>
            <div className='toggle-slot' onClick={handleTheme}>
                <div className='toggle-button'></div>
            </div>
        </label>
    )
  }
  
  export default WeatherThemeSwitch