import React, { useMemo } from 'react'
import { Button, List, Card } from 'antd'
import PropTypes from 'prop-types'

import { StopOutlined } from '@ant-design/icons'


const FollowList = ({ header, data }) => {
    const style = useMemo(() => ({ marginBottom: '2%' }), [])
    const listItemStyle = useMemo(() => ({ marginTop: '2%' }), [])
    const loadStyle = useMemo(() => ({ margin: '1% 0', textAlign: 'center' }), [])

    return (
        <List style={style}
            grid={{ gutter: 4, xs: 2, md: 3 }}
            size="small"
            header={<div>{header}</div>}
            loadMore={<div style={loadStyle}><Button>Load More ...</Button></div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item style={listItemStyle}>
                    <Card actions={[<StopOutlined key="stop" />]} >
                        <Card.Meta description={item.nickname} />
                    </Card>
                </List.Item>)} />
    )
}

export default FollowList

FollowList.propTypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
}