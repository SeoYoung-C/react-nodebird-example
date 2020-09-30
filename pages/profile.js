import React from 'react'
import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'

const Profile = () => {
    const FollowersList = [{ nickname: 'sera' }, { nickname: 'jaden' }, { nickname: 'mickle' }]
    const FollowingsList = [{ nickname: 'sera' }, { nickname: 'jaden' }, { nickname: 'mickle' }]

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
                <FollowList header="Followings List" data={FollowingsList}>

                </FollowList>
                <FollowList header="Followers List" data={FollowersList}>

                </FollowList>
            </AppLayout>
        </>
    )
}

export default Profile