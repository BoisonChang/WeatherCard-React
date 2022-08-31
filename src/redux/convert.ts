import { createStore } from 'redux'

// reducer
const valReducer = (state:any, action:any) => {
    switch (action.type) {
        case 'CONVERT_TEMP':
            return {inputValue: Number(action.payload.inputValue),  
                newInputValue: Number(action.payload.inputValue)/8}
        default:
            return state
    }
}

// store
let store = createStore(valReducer, {
    inputValue: 0, 
    newInputValue:0
})

export default store