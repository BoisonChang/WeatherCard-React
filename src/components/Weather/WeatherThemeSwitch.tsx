import React, { useState, useEffect } from 'react'
import '@/components/Weather/WeatherThemeSwitch.css'

type Props = {
    moment: string,
    setCurrentTheme: Function,
}

const WeatherThemeSwitch = ({setCurrentTheme, moment}: Props) => {
    const storageMode = localStorage.getItem('modeType')
    const [mode, setMode] = useState<string>(storageMode || moment)  
    const handleTheme = (e:any) => {
        setCurrentTheme(mode === 'day' ? 'dark' : 'light')
        setMode(mode === 'day' ? 'night' : 'day')
        localStorage.setItem('modeType', mode === 'day' ? 'night' : 'day')
    }
    useEffect(() => {
        let domToggleCheckbox = (document.getElementById('toggle-checkbox') as HTMLInputElement)
        domToggleCheckbox.checked = mode === 'night' ? true : false
    }, [])

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