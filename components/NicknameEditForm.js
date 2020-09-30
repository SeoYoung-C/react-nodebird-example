import React, { useMemo } from 'react'
import { Form, Input } from 'antd'

const NicknameEditForm = () => {
    const style = useMemo(() => ({ marginBottom: '2%', border: '1px solid #d9d9d9', padding: '1%' }), [])
    return (
        <Form >
            <Input.Search style={style} addonBefore="Nickname" enterButton="Edit" />
        </Form>
    )
}

export default NicknameEditForm