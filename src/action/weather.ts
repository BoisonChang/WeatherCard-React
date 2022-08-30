export const EDIT_CITY = 'EDIT_CITY'

export const editCity = (city:string) => ({
    type: EDIT_CITY,
    payload: {
      city,
    },
});