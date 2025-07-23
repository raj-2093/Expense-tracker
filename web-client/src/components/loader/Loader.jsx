import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth/AuthProvider';

export default function Loader({children}) {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        isLoading
    } = useAuth()

    if(isLoading) {
      return (
        <div>loading ...</div>
      )
    }

  return (
  <>
  {children}
  </>
  )
}
