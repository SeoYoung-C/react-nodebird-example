
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
                src: 'https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile21.uf.tistory.com%2Fimage%2F99A40B4B5C3ACB0101D472'
            },
            {
                src: 'https://previews.123rf.com/images/microone/microone1709/microone170900298/86634396-%EA%B2%A8%EC%9A%B8-%ED%81%AC%EB%A6%AC%EC%8A%A4%EB%A7%88%EC%8A%A4-%EB%8F%99%EB%AC%BC-%ED%96%89%EB%B3%B5-%EB%A7%8C%ED%99%94-%EB%AC%B8%EC%9E%90%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%8F%99%EB%AC%BC-%EB%A8%B8%EB%A6%AC-neckerchief%EC%99%80-%EB%AA%A8%EC%9E%90-%EB%B2%A1%ED%84%B0-%EC%84%A4%EC%A0%95%ED%95%A9%EB%8B%88%EB%8B%A4-%EA%B2%A8%EC%9A%B8-%EC%BA%90%EB%A6%AD%ED%84%B0-%EB%8F%99%EB%AC%BC-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.jpg'
            },
            {
                src: 'https://www.top1020.co.kr/wp-content/uploads/2020/02/111.png'
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
    postAdded: false
}

const ADD_POST = 'ADD_POST';
export const addPost = {
    type: ADD_POST
}

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
        case ADD_POST:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true
            }
        default:
            return state;
    }
}

export default reducer