export const EDIT_CITY = 'EDIT_CITY'
export const EDIT_PAGE = 'EDIT_PAGE'
export const SWITCH_THEME = 'SWITCH_THEME'

export const editCity = (city:string) => ({
  type: EDIT_CITY,
  payload: {
    city,
  },
})

export const editPage = (page:string) => ({
  type: EDIT_PAGE,
  payload: {
    page,
  },
})

export const switchTheme = (theme:string) => ({
  type: SWITCH_THEME,
  payload: {
    theme,
  },
})