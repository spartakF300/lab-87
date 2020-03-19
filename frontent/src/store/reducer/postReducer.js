import {
    FETCH_GET_ONE_POST_SUCCESS,
    FETCH_GET_POST_SUCCESS,
    FETCH_POST_FAILURE,
    FETCH_POST_REQUEST
} from "../action/actionPost";


const initialState = {
    posts:[],
    post:null,
    loading:false,
    error:null
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POST_REQUEST:
            return {...state, loading: true};
        case FETCH_GET_ONE_POST_SUCCESS:
            return {...state,post:action.data,loading: false};
        case FETCH_POST_FAILURE:
            return {...state, error: action.error, loading: false};
        case FETCH_GET_POST_SUCCESS:
            return {...state, loading: false, error: null, posts: action.data};
            default:
            return state;
    }
};

export default postReducer;