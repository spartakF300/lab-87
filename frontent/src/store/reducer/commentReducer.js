import {
    CREATE_COMMENT_SUCCESS,
    FETCH_COMMENTS_FAILURE,
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCESS
} from "../action/actionComents";


const initialState = {
    comments: [],
    error: null,
    loading:false
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMMENTS_REQUEST:
            return {...state,loading:true};
        case FETCH_COMMENTS_SUCCESS:
            return {...state, comments: action.data,loading:false};
        case FETCH_COMMENTS_FAILURE:
            return {...state, error: action.error, loading:false};
        case CREATE_COMMENT_SUCCESS:
            return {...state,loading:false};
            default:
            return state;
    }
};

export default commentsReducer;