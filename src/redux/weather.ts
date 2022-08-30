import * as actions from '@/action/weather'

const initState = {
    currentCity: '臺北市',
}

const weatherReducer = (state:any = initState, action:any) => {
    switch (action.type) {
        case actions.EDIT_CITY:
            return {
                ...state,
                currentCity: action.payload.city,
            }
        default:
            return state
    }
}

export default weatherReducer