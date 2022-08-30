import * as actions from '@/action/weather'

const initState = {
    currentCity: localStorage.getItem('city') || '臺北市',
    currentPage: 'WeatherCard',
    currentTheme: localStorage.getItem('theme') || 'light'
}

const weatherReducer = (state:any = initState, action:any) => {
    switch (action.type) {
        case actions.EDIT_CITY:
            return {
                ...state,
                currentCity: action.payload.city,
            }
        case actions.EDIT_PAGE:
            return {
                ...state,
                currentPage: action.payload.page,
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