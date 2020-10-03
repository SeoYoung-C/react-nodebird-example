import React from 'react'
import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'

import { useSelector } from 'react-redux'
import Router from 'next/router'


const Profile = () => {
    // const FollowersList = [{ nickname: 'sera' }, { nickname: 'jaden' }, { nickname: 'mickle' }]
    // const FollowingsList = [{ nickname: 'sera' }, { nickname: 'jaden' }, { nickname: 'mickle' }]
    const { me } = useSelector((state) => state.user)

    if (!(me && me.id)) {
        Router.push('/')
    }
    if (!me) {
        return null
    }
    return (
        <>
            <Head>
                <title>
                    My Profile|NodeBird
                </title>
            </Head>
            <AppLayout>
                <NicknameEditForm>

                </NicknameEditForm>
                <FollowList header="Followings List" data={me.Followings}>

                </FollowList>
                <FollowList header="Followers List" data={me.Followers}>

                </FollowList>
            </AppLayout>
        </>
    )
}

export default Profile