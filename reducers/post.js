
export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'Seoyoung',
        },
        content: 'first post, #hashtag #express',
        Images: [
            {
                src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
            },
            {
                src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
            },
            {
                src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
            }
        ],
        Comments: [
            {
                User: {
                    nickname: 'nero'
                },
                content: 'this is first post!!'
            }, {
                User: {
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
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: false,
    mainComment: []
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCESS = 'ADD_POST_SUCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

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

const dummyPost = {
    id: 2,
    content: 'dummy data',
    User: {
        id: 2,
        nickname: 'Seoyoung'
    },
    Images: [],
    Comments: []
}

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
                mainPosts: [dummyPost, ...state.mainPosts],
            }
        case ADD_POST_FAILURE:
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error,
            }

        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null,

            }
        case ADD_COMMENT_SUCESS:
            return {
                ...state,
                addCommentLoading: false,
                addCommentDone: true,
                mainPosts: [dummyPost, ...state.mainComment],
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