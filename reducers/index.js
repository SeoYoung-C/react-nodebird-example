import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from 'redux'
import user from './user'
import post from './post'

//async action creater


//action creater
// const changeNickname = (data) => {
//     return {
//         type: 'CHANGE_NICKNAME',
//         data: data
//     }
// }

// changeNickname('seoyoung-choi')



// (이전상태, 액션) ==> 다음 상태
const reducer = combineReducers({
    index: (state = {}, action) => {
        switch (action.type) {
            case HYDRATE:
                console.log(HYDRATE)
                return {
                    ...state, ...action.payload
                }

            default:
                return state;
        }
    },
    user,
    post
})

export default reducer