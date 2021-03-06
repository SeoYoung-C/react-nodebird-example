import shortId from 'shortid'
import produce from 'immer'
import faker from 'faker'


export const initialState = {

    // mainPosts: [{
    //     id: 1,
    //     User: {
    //         id: 1,
    //         nickname: 'seoyoung',
    //     },
    //     content: 'first post, #hashtag #express',
    //     Images: [
    //         {
    //             id: shortId.generate(),
    //             src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
    //         },
    //         {
    //             id: shortId.generate(),
    //             src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
    //         },
    //         {
    //             id: shortId.generate(),
    //             src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
    //         }
    //     ],
    //     Comments: [
    //         {
    //             id: shortId.generate(),
    //             User: {
    //                 id: shortId.generate(),
    //                 nickname: 'nero'
    //             },
    //             content: 'this is first post!!'
    //         }, {
    //             id: shortId.generate(),
    //             User: {
    //                 id: shortId.generate(),
    //                 nickname: 'hero'
    //             },
    //             content: 'Woooooooooow!'
    //         }
    //     ],

    // }],
    mainPosts: [],
    imagePaths: [],
    hasMorePost: true,
    loadPostLoading: false,
    loadPostDone: false,
    loadPostError: false,
    addPostLoading: false,
    addPostDone: false,
    addPostError: false,
    removePostLoading: false,
    removePostDone: false,
    removePostError: false,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: false,
    mainComment: []
}

export const generateDummyPost = (number) => Array(number).fill().map(() => ({
    id: shortId.generate(),
    User: {
        id: shortId.generate(),
        nickname: faker.name.findName()
    },
    content: faker.lorem.paragraph(),
    Images: [{
        src: faker.image.image()
    }],
    Comments: [{
        User: {
            id: shortId.generate(),
            nickname: faker.name.findName()
        },
        content: faker.lorem.sentence(),
    }],
}))


export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST'
export const LOAD_POST_SUCESS = 'LOAD_POST_SUCESS'
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE'

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCESS = 'ADD_POST_SUCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST'
export const REMOVE_POST_SUCESS = 'REMOVE_POST_SUCESS'
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCESS = 'ADD_COMMENT_SUCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'



export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data
})
export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data
})

const dummyPost = (data) => (
    {
        id: data.id,
        content: data.content,
        User: {
            id: 1,
            nickname: 'seoyoung'
        },
        Images: [],
        Comments: []
    }
)

const dummyComment = (data) => ({

    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: 'seoyoung'
    },
})

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
        case LOAD_POST_REQUEST:
            draft.loadPostLoading = true
            draft.loadPostDone = false
            draft.loadPostError = null
            break
        case LOAD_POST_SUCESS:
            draft.loadPostLoading = false
            draft.loadPostDone = true
            draft.mainPosts = action.data.concat(draft.mainPosts)
            draft.hasMorePost = draft.mainPosts.length < 50
            break
        case LOAD_POST_FAILURE:
            draft.loadPostLoading = false
            draft.loadPostError = action.error
            break


        case ADD_POST_REQUEST:
            draft.addPostLoading = true
            draft.addPostDone = false
            draft.addPostError = null
            break
        case ADD_POST_SUCESS:
            draft.addPostLoading = false
            draft.addPostDone = true
            draft.mainPosts.unshift(dummyPost(action.data))
            break
        case ADD_POST_FAILURE:
            draft.addPostLoading = false
            draft.addPostError = action.error
            break

        case REMOVE_POST_REQUEST:
            draft.removePostLoading = true;
            draft.removePostDone = false;
            draft.removePostError = null;
            break
        case REMOVE_POST_SUCESS:
            draft.removePostLoading = false
            draft.removePostDone = true
            draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data)
            break
        case REMOVE_POST_FAILURE:
            draft.removePostLoading = false
            draft.removePostError = action.error
            break

        case ADD_COMMENT_REQUEST:
            draft.addCommentLoading = true
            draft.addCommentDone = false
            draft.addCommentError = null
            break

        case ADD_COMMENT_SUCESS:
            const post = draft.mainPosts.find((v) => v.id === action.data.postId)
            post.Comments.unshift(dummyComment(action.data.content))
            draft.addCommentLoading = false
            draft.addCommentDone = true
            break
        // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId)
        // const post = { ...state.mainPosts[postIndex] }
        // post.Comments = [dummyComment(action.data.content), ...post.Comments]
        // const mainPosts = [...state.mainPosts]
        // mainPosts[postIndex] = post
        // return {
        //     ...state,
        //     mainPosts,
        //     addCommentLoading: false,
        //     addCommentDone: true,
        // }
        case ADD_COMMENT_FAILURE:
            draft.addCommentLoading = false
            draft.addCommentError = action.error
            break
        default:
            break
    }
})


export default reducer