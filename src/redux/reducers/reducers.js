import { combineReducers } from 'redux';
import { CLOSE_EDIT_POPUP, CLOSE_VIEW_POPUP, FETCH_ADS_SUCCESS, OPEN_EDIT_POPUP, OPEN_VIEW_POPUP } from '../../const/config';
import { decodeId } from '../../utility/utils';
const initialState = {
    isShowViewPopup: false,
    isShowEditPopup: false,
    decodedId: null
};

const adsReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_ADS_SUCCESS:
            return action.payload.ads;
        default:
            return state;
    }
};

const paginationReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_ADS_SUCCESS:
            return action.payload.pagination;
        default:
            return state;
    }
};

const popupReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_VIEW_POPUP:
            return {
                ...state,
                isShowViewPopup: true,
            };
        case CLOSE_VIEW_POPUP:
            return {
                ...state,
                isShowViewPopup: false,
            };
        case OPEN_EDIT_POPUP:
            return {
                ...state,
                isShowEditPopup: true,
            };
        case CLOSE_EDIT_POPUP:
            return {
                ...state,
                isShowEditPopup: false,
            };
        default:
            return state;
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DECODED_ID':
            return { ...state, decoded: decodeId(action.payload) };
        case 'CLEAR_DECODED_ID':
            return { ...state, decoded: null };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    ads: adsReducer,
    pagination: paginationReducer,
    popup: popupReducer,
    reducer: reducer,
});

export default rootReducer;
