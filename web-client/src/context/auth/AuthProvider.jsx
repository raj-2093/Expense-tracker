import React, { createContext, useContext, useEffect, useState } from 'react'
import { checkTokenValidity, login, logout, registerUser } from '../../apis/auth/auth.api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider(props) {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(()=>{
        console.log(`rj_ AuthProvider > useEffect[] - ran`)
        // Check token validity and setIsUserLoggedIn
        checkTokenValidity().then((res)=>{
            if(res.status == 200) {
                setIsUserLoggedIn(true)
                setIsLoading(false)
                setUser(res.data.data)
            } else {
                setIsUserLoggedIn(false)
                setIsLoading(false)
                navigate("/login")
            }
        }).catch((err)=>{
            console.log(`rj_ AuthProvider>checkTokenValidity>catch - err -- ${err}`)
        })
    }, [])

    const loginUserWithEmailAndPassword = async (email, password) => {
        await login(email, password).then((res)=>{
            if(res.status == 200) {
                setIsUserLoggedIn(true)
                setUser(res.data.data)
            } else {
                setIsUserLoggedIn(false)
            }
        }).catch((err)=>{
            console.log(`rj_ AuthProvider>loginUserWithEmailAndPassword>catch - err -- ${err}`)
            throw new Error("Error in AuthProvider>loginUserWithEmailAndPassword")
        })
    }

    const registerUserWithEmailAndPassword = async (fullName, email, userName, password) => {
        registerUser(fullName, email, userName, password).then((res)=>{
            if(res.status == 201) {
                // setIsUserLoggedIn(true)
            } else {
                // setIsUserLoggedIn(false)
            }
        }).catch((err) => {
            console.log(`rj_ AuthProvider>registerUserWithEmailAndPassword>catch - err -- ${err}`)
            throw new Error("Error in AuthProvider>registerUserWithEmailAndPassword")
        })
    }

    const logoutUser = async () => {
        logout().then((res)=>{
            if(res.status == 200) {
                setIsUserLoggedIn(false)
                setUser(null)
                navigate("/login")
            } else {
                console.log(`rj_ AuthProvider>logoutUser failed to logout`)
            }
        }).catch((err) => {
            console.log(`rj_ AuthProvider>logoutUser>catch - err - ${err}`)
            throw new Error("AuthProvider>logoutUser - err")
        })
    }

  return (
    <AuthContext.Provider value={{
        loginUserWithEmailAndPassword,
        registerUserWithEmailAndPassword,
        logoutUser,
        isUserLoggedIn,
        isLoading,
        user,
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}
