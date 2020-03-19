import {push} from "connected-react-router";
import axiosApi from "../../axios-api";

export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';

export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';



const fetchCommentsRequest = () => ({type: FETCH_COMMENTS_REQUEST});
const fetchCommentsSuccess = (data) => ({type: FETCH_COMMENTS_SUCCESS, data});
const fetchCommentsFailure = (error) => ({type: FETCH_COMMENTS_FAILURE, error});



export const createComment = data => {
    return async (dispatch, getState) => {
        const user = getState().users.user;
        if (!user) return dispatch(push('/login'));
        try {
            dispatch(fetchCommentsRequest());
            await axiosApi.post('/comments', data, {headers: {'Authorization': 'Token ' + user.token}});
            dispatch(getComments(data.post))
        } catch (error) {
            dispatch(fetchCommentsFailure(error.response.data))
        }

    }
};

export const getComments = id => {
    return async (dispatch) => {
        try {
            dispatch(fetchCommentsRequest());
            const response = await axiosApi.get('/comments?postId=' + id);
            dispatch(fetchCommentsSuccess(response.data))
        } catch (e) {
            dispatch(fetchCommentsFailure(e))
        }
    }
};