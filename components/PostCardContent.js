import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const PostCardContent = ({ postData }) => {

    return (
        <div>
            {postData.split(/(#[^\s#]+)/g).map((v, i) => {
                if (v.match(/(#[^\s#]+)/g)) {
                    return <Link href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }} key={i}><a>{v}</a></Link>
                }
                return v
            })}
        </div>
    )
}

export default PostCardContent

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired
}