import {
    LOGIN_USER, REGISTER_USER
} from '../_actions/types'

//reducer는 (previousState,action) => nextState로 만드니까
// function에 state초기화 해서 넣고, action(user_action에서 보냄) 넣음
// switch 문을 통해서 action.type을 가져오고 LOGIN_USER와 일치하면
// 초기화 된 state값과 loginSuccess에 user_action에서 보낸 payload를 넣음
export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload }
            break;

        default:
            return state;
    }
}