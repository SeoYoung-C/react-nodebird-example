import shortId from 'shortid'

export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'seoyoung',
        },
        content: 'first post, #hashtag #express',
        Images: [
            {
                id: shortId.generate(),
                src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
            },
            {
                id: shortId.generate(),
                src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
            },
            {
                id: shortId.generate(),
                src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
            }
        ],
        Comments: [
            {
                id: shortId.generate(),
                User: {
                    id: shortId.generate(),
                    nickname: 'nero'
                },
                content: 'this is first post!!'
            }, {
                id: shortId.generate(),
                User: {
                    id: shortId.generate(),
                    nickname: 'hero'
                },
                content: 'Woooooooooow!'
            }
        ],

    }],
    imagePaths: [],
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return {
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null,
            }
        case ADD_POST_SUCESS:
            return {
                ...state,
                addPostLoading: false,
                addPostDone: true,
                mainPosts: [dummyPost(action.data), ...state.mainPosts],
            }
        case ADD_POST_FAILURE:
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error,
            }

        case REMOVE_POST_REQUEST:
            return {
                ...state,
                removePostLoading: true,
                removePostDone: false,
                removePostError: null,
            }
        case REMOVE_POST_SUCESS:
            return {
                ...state,
                removePostLoading: false,
                removePostDone: true,
                mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
            }
        case REMOVE_POST_FAILURE:
            return {
                ...state,
                removePostLoading: false,
                removePostError: action.error,
            }

        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null,

            }
        case ADD_COMMENT_SUCESS:
            const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId)
            const post = { ...state.mainPosts[postIndex] }
            post.Comments = [dummyComment(action.data.content), ...post.Comments]
            const mainPosts = [...state.mainPosts]
            mainPosts[postIndex] = post

            return {
                ...state,
                mainPosts,
                addCommentLoading: false,
                addCommentDone: true,
            }
        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                addCommentLoading: false,
                addCommentError: action.error,
            }

        default:
            return state;
    }
}

export default reducer