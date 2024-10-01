import React, { createContext, useEffect, useState } from 'react'

export const authContext = createContext()

function AuthContext({ children }) {

    const [authStatus, setAuthStatus] = useState(false)

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (token) {
            setAuthStatus(true)
        }
    }, [])

    return (
        <>
            <authContext.Provider value={{ authStatus, setAuthStatus }}>
                {children}
            </authContext.Provider>
        </>
    )
}

export default AuthContext