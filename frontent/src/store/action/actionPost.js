import axiosApi from "../../axios-api";
import {push} from "connected-react-router";

export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';
export const FETCH_GET_POST_SUCCESS = 'FETCH_GET_POST_SUCCESS';
export const FETCH_GET_ONE_POST_SUCCESS = 'FETCH_GET_ONE_POST_SUCCESS';

export const fetchPostRequest = () => {
    return {type: FETCH_POST_REQUEST}
};

export const fetchPostFailure = error => {
    return {type: FETCH_POST_FAILURE, error}
};
export const fetchGetPostSuccess = data=>{
  return{type:FETCH_GET_POST_SUCCESS,data}
};

export const fetchGetOnePostSuccess = data=>{
    return{type:FETCH_GET_ONE_POST_SUCCESS,data}
};

export const sendPost = data => {
    return async (dispatch, getState) => {
        const user = getState().users.user;
        if (!user) return dispatch(push('/login'));
        try {
            dispatch(fetchPostRequest());
            await axiosApi.post('/post', data, {headers: {'Authorization': 'Token ' + user.token}});
            dispatch(getPost());
            dispatch(push('/'))
        } catch (e) {
            dispatch(fetchPostFailure(e))
        }

    }

};

export const getPost = ()=>{
    return async (dispatch)=>{
        try{
            dispatch(fetchPostRequest());
            const response = await axiosApi.get('/post');
            dispatch(fetchGetPostSuccess(response.data))
        }catch (e) {
           dispatch(fetchPostFailure(e) )
        }
    }
};
export const getOnePost = (id)=>{
    return async (dispatch)=>{
        try{
            dispatch(fetchPostRequest());
            const response = await axiosApi.get('/post/'+id);
            dispatch(fetchGetOnePostSuccess(response.data))
        }catch (e) {
            dispatch(fetchPostFailure(e) )
        }
    }
};