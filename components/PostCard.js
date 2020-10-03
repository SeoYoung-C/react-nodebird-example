import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Avatar, List, Comment, Popover } from 'antd'
import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined, HeartTwoTone } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import PostImages from './PostImages'
import PostCardContent from './PostCardContent'
import CommentForm from './CommentForm'
import FollowButton from './FollowButton'
import Link from 'next/link'
import { REMOVE_POST_REQUEST } from '../reducers/post'

const PostCard = ({ post }) => {
    const dispatch = useDispatch()
    const { me } = useSelector((state) => state.user)
    const { removePostLoading } = useSelector((state) => state.post)
    const id = me?.id
    const [liked, setLiked] = useState(false)
    const [commentFormOpend, setCommentFormOpend] = useState(false)
    // const { me } = useSelector((state) => { state.user })
    // const id = me && me.id
    //const id = me?.id --> optioner chaining 

    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev)
    }, [])

    const onToggleComment = useCallback(() => {
        setCommentFormOpend((prev) => !prev)
    }, [])

    const onRemovePost = useCallback(() => {
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id
        })
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
                                        <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>Delete</Button>
                                    </>
                                ) : <Button>Report</Button>
                            }
                        </Button.Group>
                    )}>
                        <EllipsisOutlined />
                    </Popover>
                ]}
                extra={id && <FollowButton post={post} />}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content} />}
                />

            </Card>
            {commentFormOpend && (
                <>
                    <CommentForm post={post} />
                    <List
                        header={`${post.Comments.length} 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={(
                                        <Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}>
                                            <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                                        </Link>
                                    )}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </>
            )}
        </div >
    )
}

export default PostCard

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        UserId: PropTypes.number,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.any),
        Images: PropTypes.arrayOf(PropTypes.any),

    }).isRequired
}