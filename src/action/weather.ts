export const EDIT_PAGE = 'EDIT_PAGE'
export const SWITCH_THEME = 'SWITCH_THEME'
export const EDIT_LOCATION  = 'EDIT_LOCATION'

export const editPage = (page:string) => ({
  type: EDIT_PAGE,
  payload: {
    page,
  },
})

export const editLocation = (location:Object) => ({
  type: EDIT_LOCATION,
  payload: {
    location,
  },
})

export const switchTheme = (theme:string) => ({
  type: SWITCH_THEME,
  payload: {
    theme,
  },
})