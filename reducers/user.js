import produce from 'immer'

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
    followLoading: false,
    followDone: false,
    followError: false,
    unfollowLoading: false,
    unfollowDone: false,
    unfollowError: false,
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

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME'
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME'

const dummyUser = (data) => ({
    ...data,
    nickname: 'seoyoung',
    id: 1,
    Posts: [{ id: 1 }],
    Followings: [{ nickname: 'hero' }, { nickname: 'nero' }, { nickname: 'zero' }],
    Followers: [{ nickname: 'hero' }, { nickname: 'nero' }, { nickname: 'zero' }],
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

// reducer : 이전 상태를 액션을 통해 다음 상태로 만들어 내는 함수(단, 불변성은 지키면서...)

// const reducer = (state=initialState, action) => {
//     return produce(state,(draft) =>{
//         switch (key) {
//             case value:

//                 break;

//             default:
//                 break;
//         }
//     })
// }

const reducer = (state = initialState, action) => produce(state, (draft) => {

    switch (action.type) {

        case FOLLOW_REQUEST:
            draft.followLoading = true
            draft.followDone = false
            draft.followError = null
            break
        case FOLLOW_SUCESS:
            draft.followLoading = false
            draft.me.Followings.push({ id: action.data })
            draft.followDone = true
            break
        case FOLLOW_FAILURE:
            draft.followLoading = false
            draft.followError = action.error
            break

        case UNFOLLOW_REQUEST:
            draft.unfollowLoading = true
            draft.unfollowDone = false
            draft.unfollowError = null
            break
        case UNFOLLOW_SUCESS:
            draft.unfollowLoading = false
            draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data)
            draft.unfollowDone = true
            break
        case UNFOLLOW_FAILURE:
            draft.unfollowLoading = false
            draft.unfollowError = action.error
            break

        case LOG_IN_REQUEST:
            draft.logInLoading = true
            draft.logInDone = false
            draft.logInError = null
            break
        case LOG_IN_SUCESS:
            draft.logInLoading = false
            draft.me = dummyUser(action.data)
            draft.logInDone = true
            break
        case LOG_IN_FAILURE:
            draft.logInLoading = false
            draft.logInError = action.error
            break

        case LOG_OUT_REQUEST:
            draft.logOutLoading = true
            draft.logOutDone = false
            draft.logOutError = null
            break
        case LOG_OUT_SUCESS:
            draft.logOutLoading = false
            draft.logOutDone = true
            draft.me = null
            break
        case LOG_OUT_FAILURE:
            draft.logOutLoading = false
            draft.logOutError = action.error
            break

        case SIGN_UP_REQUEST:
            draft.signUpLoading = true
            draft.signUpDone = false
            draft.signUpError = null
            break
        case SIGN_UP_SUCESS:
            draft.signUpLoading = false
            draft.signUpDone = true
            break
        case SIGN_UP_FAILURE:
            draft.signUpLoading = false
            draft.signUpError = action.error
            break

        case CHANGE_NICKNAME_REQUEST:
            draft.changeNicknameLoading = true
            draft.changeNicknameDone = false
            draft.changeNicknameError = null
            break
        case CHANGE_NICKNAME_SUCESS:
            draft.changeNicknameLoading = false
            draft.changeNicknameDone = true
            break
        case CHANGE_NICKNAME_FAILURE:
            draft.changeNicknameLoading = false
            draft.changeNicknameError = action.error
            break

        case ADD_POST_TO_ME:
            draft.me.Posts.unshift({ id: action.data })
            break
        case REMOVE_POST_OF_ME:
            let deleteItem = draft.me.Posts.filter((v) => {
                // console.log('v', v.id.data)
                // console.log('action.data.data', action.data.data)
                return v.id.data !== action.data.data
            })
            draft.me.Posts = deleteItem
            break
        default:
            break
    }
})



export default reducer