export const AppBaseUrl = import.meta.env.REACT_APP_API ?? 'http://localhost:8000/api';
export const OPEN_VIEW_POPUP = 'OPEN_VIEW_POPUP';
export const CLOSE_VIEW_POPUP = 'CLOSE_VIEW_POPUP';
export const OPEN_EDIT_POPUP = 'OPEN_EDIT_POPUP';
export const CLOSE_EDIT_POPUP = 'CLOSE_EDIT_POPUP';
export const FETCH_ADS_SUCCESS = 'FETCH_ADS_SUCCESS';
export const ROLE = {
    admin: 0,
    user: 1,
    seller: 2,
    trader: 3
}
export const SORT = {
    asc: 'Thấp đến cao',
    desc: 'Cao đến thấp'
};
