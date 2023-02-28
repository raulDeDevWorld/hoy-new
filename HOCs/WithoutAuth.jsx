import Loader from '../components/Loader'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import { onAuth } from '../firebase/utils'

export function WithoutAuth(Component) {
    return () => {
        const { user, userDB, setUserProfile, setUserData, postsIMG, setUserPostsIMG, setUserDate, setUserMonthAndYear, setUserDayMonthYear, monthAndYear} = useUser()
        const router = useRouter()
        useEffect(() => {
            onAuth(userDB, setUserProfile, setUserData, postsIMG, setUserPostsIMG, setUserDate, setUserMonthAndYear, setUserDayMonthYear, monthAndYear)
        }, [user]);

        return (
            <>
                {user === undefined || userDB == '' && <Loader />}
                {userDB !== "" && postsIMG !== {} && <Component {...arguments} />}
            </>
        )
    }
}
