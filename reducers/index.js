import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
    // name: 'seoyoung',
    // age: 32,
    // password: 'asdf'
    user: {
        isLoggedIn: false,
        user: null,
        signUpData: {},
        logginData: {}
    },
    post: {
        mainPosts: []
    }
}
//async action creater


//action creater
// const changeNickname = (data) => {
//     return {
//         type: 'CHANGE_NICKNAME',
//         data: data
//     }
// }

// changeNickname('seoyoung-choi')
export const loginAction = (data) => {
    return {
        type: 'LOG_IN',
        data
    }
}

export const logoutAction = (data) => {
    return {
        type: 'LOG_OUT',

    }
}

// (이전상태, 액션) ==> 다음 상태
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            console.log(HYDRATE)
            return {
                ...state, ...action.payload
            }
        case 'LOG_IN':
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoggedIn: true,
                    user: action.data
                }
            }
        case 'LOG_OUT':
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoggedIn: false,
                    user: null
                }
            }
        default:
            return state;
    }
}

export default reducer