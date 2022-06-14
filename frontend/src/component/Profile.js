import React from 'react'
import { useSelector } from 'react-redux';


const Profile = () => {
    const loading = useSelector((state) => state.userReducer.loading);
    const isAuthenticated = useSelector((state) => state.userReducer.isAuthenticated);
    const user = useSelector((state) => state.userReducer.user);
  return (
    <div>
    {loading ? (<p>Loading</p>) : isAuthenticated ? (<h1>{user.name}</h1>) : (alert("Failed"))}
    </div>
  )
}

export default Profile