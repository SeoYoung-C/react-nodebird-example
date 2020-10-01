import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Popover, Avatar } from 'antd'
import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined, HeartTwoTone } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import PostImages from './PostImages'

const PostCard = ({ post }) => {
    const id = useSelector((state) => { state.user.me?.id })
    const [liked, setLiked] = useState(false)
    const [commentFormOpend, setCommentFormOpend] = useState(false)
    // const { me } = useSelector((state) => { state.user })
    // const id = me && me.id
    //const id = me?.id

    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev);
    }, [])

    const onToggleComment = useCallback(() => {
        setCommentFormOpend((prev) => !prev)
    }, [])
    return (
        <div style={{ marginBottom: '20px' }}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    liked
                        ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
                        : <HeartOutlined key="heart" onClick={onToggleLike} />,
                    <MessageOutlined key="comment" onClick={onToggleComment} />,
                    <Popover key="more" content={(
                        <Button.Group>
                            {
                                id && post.User.id === id ? (
                                    <>
                                        <Button>Modify</Button>
                                        <Button>Delete</Button>
                                    </>
                                ) : <Button>Report</Button>
                            }
                        </Button.Group>
                    )}>
                        <EllipsisOutlined />
                    </Popover>
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={post.content}
                />

                {/* <Image />
                <Contents />
                <Buttons /> */}
            </Card>
            {
                commentFormOpend && (
                    <div>
                        comment
                    </div>
                )
            }
            {/* <CommentForm />
            <Comments /> */}
        </div >
    )
}

export default PostCard

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object)

    }).isRequired
}