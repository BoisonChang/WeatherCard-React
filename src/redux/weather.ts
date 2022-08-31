import * as actions from '@/action/weather'
import { findLocation } from '@/utils/utils'

const initState = {
    currentPage: 'WeatherCard',
    currentTheme: 'light',
    currentLocation: findLocation(localStorage.getItem('city') || '臺北市')
}

const weatherReducer = (state:any = initState, action:any) => {
    switch (action.type) {
        case actions.EDIT_PAGE:
            return {
                ...state,
                currentPage: action.payload.page,
            }
        case actions.EDIT_LOCATION:
            return {
                ...state,
                currentLocation: action.payload.location,
            }
        case actions.SWITCH_THEME:
            return {
                ...state,
                currentTheme: action.payload.theme,
            }
        default:
            return state
    }
}

export default weatherReducer