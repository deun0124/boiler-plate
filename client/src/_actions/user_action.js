import axios from "axios";
import {
    AUTH_USER,
    LOGIN_USER, REGISTER_USER
} from './types';

// LoginPage에서 body를 axios로 로그인 라우터로 보냄
export function loginUser(dataToSubmit) {
    const request = axios.post('/api/users/login',dataToSubmit)
        .then(response => response.data)

        // return을 통해 reducer에 보내기(user_reducer.js)
        return{
            type: LOGIN_USER,
            payload: request
        }
}

// RegisterPage에서 body를 axios로 회원가입 라우터로 보냄
export function registerUser(dataToSubmit) {
    const request = axios.post('/api/users/register',dataToSubmit)
        .then(response => response.data)

        // return을 통해 reducer에 보내기(user_reducer.js)
        return{
            type: REGISTER_USER,
            payload: request
        }
}


export function auth() {
    const request = axios.get('/api/users/auth')
        .then(response => response.data)

        return{
            type: AUTH_USER,
            payload: request
        }
}
