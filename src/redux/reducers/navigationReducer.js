import { NAVIGATE, NAVIGATE_SUCCESS } from "../actionTypes";

const initialState = {
    redirectTo: null,
};

const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case NAVIGATE:
            return {
                ...state,
                redirectTo: action.payload.redirectTo,
            };
        case NAVIGATE_SUCCESS:
            return {
                ...state,
                redirectTo: null,
            };
        default:
            return state;
    }
};

export { navigationReducer };

export const selectRedirectTo = state => state.navigation.redirectTo;
