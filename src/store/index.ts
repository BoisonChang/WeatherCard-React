import { createStore } from 'redux'
import weatherReducer from '@/redux/weather'

const store = createStore(weatherReducer)

export default store