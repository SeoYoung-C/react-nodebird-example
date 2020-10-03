export const initialState = {
    logInLoading: false,
    logInDone: false,
    logInError: false,
    logOutLoading: false,
    logOutDone: false,
    logOutError: false,
    signUpLoading: false,
    signUpDone: false,
    signUpError: false,
    changeNicknameLoading: false,
    changeNicknameDone: false,
    changeNicknameError: false,
    me: null,
    signUpData: {},
    logginData: {}

}

// Thunk...
// export const loginRequestAction = (data) => {
//     return (dispatch, getState) => {
//         const state = getState()
//         dispatch(loginRequestAction())
//         axios.post('/api/login')
//             .then((res) => {
//                 dispatch(loginSucessAction(res.data))
//             })
//             .catch((err) => {
//                 dispatch(loginFailureAction(err))
//             })
//     }
// }

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCESS = 'LOG_IN_SUCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCESS = 'LOG_OUT_SUCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCESS = 'SIGN_UP_SUCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST'
export const CHANGE_NICKNAME_SUCESS = 'CHANGE_NICKNAME_SUCESS'
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE'

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_SUCESS = 'FOLLOW_SUCESS'
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE'

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST'
export const UNFOLLOW_SUCESS = 'UNFOLLOW_SUCESS'
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE'

const dummyUser = (data) => ({
    ...data,
    nickname: 'seoyoung',
    id: 1,
    Post: [],
    Followings: [],
    Followers: [],
})

export const loginRequestAction = (data) => {
    return {
        type: LOG_IN_REQUEST,
        data
    }
}



export const logoutRequestAction = (data) => {
    return {
        type: 'LOG_OUT_REQUEST',

    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_REQUEST:
            console.log('reducer-login')
            return {
                ...state,
                logInLoading: true,
                logInError: null,
                logInDone: false,
            }

        case LOG_IN_SUCESS:
            console.log(dummyUser(action.data))
            return {
                ...state,
                logInLoading: false,
                logInDone: true,
                me: dummyUser(action.data)
            }

        case LOG_IN_FAILURE:
            return {
                ...state,
                logInLoading: false,
                logInError: action.error
            }

        case LOG_OUT_REQUEST:
            return {
                ...state,
                logOutLoading: true,
                logOutDone: false,
                logOutError: false,
            }

        case LOG_OUT_SUCESS:
            return {
                ...state,
                logOutLoading: false,
                logOutDone: true,
                me: null
            }

        case LOG_OUT_FAILURE:
            return {
                ...state,
                logOutLoading: false,
                logOutError: action.error
            }

        case SIGN_UP_REQUEST:
            return {
                ...state,
                signUpLoading: true,
                signUpDone: false,
                signUpError: false,
            }

        case SIGN_UP_SUCESS:
            return {
                ...state,
                signUpLoading: false,
                signUpDone: true,
            }

        case SIGN_UP_FAILURE:
            return {
                ...state,
                signUpLoading: false,
                signUpError: action.error
            }

        case CHANGE_NICKNAME_REQUEST:
            return {
                ...state,
                changeNicknameLoading: true,
                changeNicknameDone: false,
                changeNicknameError: false,
            }

        case CHANGE_NICKNAME_SUCESS:
            return {
                ...state,
                changeNicknameLoading: false,
                changeNicknameDone: true,
            }

        case CHANGE_NICKNAME_FAILURE:
            return {
                ...state,
                changeNicknameLoading: false,
                changeNicknameError: action.error
            }
        default:
            return state;
    }
}

export default reducer