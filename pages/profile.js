import React from 'react'
import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'

import { useSelector } from 'react-redux'


const Profile = () => {
    // const FollowersList = [{ nickname: 'sera' }, { nickname: 'jaden' }, { nickname: 'mickle' }]
    // const FollowingsList = [{ nickname: 'sera' }, { nickname: 'jaden' }, { nickname: 'mickle' }]
    const { me } = useSelector((state) => state.user)

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