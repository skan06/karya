import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, register } from '../../redux/actions/UserActions';
import "./LoginSignup.css";

const LoginSignup = () => {
    //register
    const [NewUser, setNewUser] = useState({});
    const dispatch = useDispatch();
    const handlechange = (e) => {
      setNewUser({ ...NewUser, [e.target.name]: e.target.value });
    };
    //login
    const [user, setUser] = useState({});
    const changehandler = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  return (
<div className="main">
  <input type="checkbox" id="chk" aria-hidden="true" />
  <div className="signup">
    <form>
      <label htmlFor="chk" aria-hidden="true">
        Sign up
      </label>
      <input type="text" name="name" placeholder="User name" required="" onChange={handlechange}/>
      <input type="email" name="email" placeholder="Email" required="" onChange={handlechange}/>
      <input type="password" name="passowd" placeholder="Password" required="" onChange={handlechange}/>
      <Link to="/Profile"><button onClick={() => dispatch(register(NewUser))}>Sign up</button></Link>
    </form>
  </div>
  <div className="login">
    <form>
      <label htmlFor="chk" aria-hidden="true">
        Login
      </label>
      <input type="email" name="email" placeholder="Email" required=""  onChange={changehandler}/>
      <input type="password" name="password" placeholder="Password" required=""  onChange={changehandler}/>
      <button  onClick={() => dispatch(login(user))}>Login</button>
    </form>
  </div>
</div>
  )
}

export default LoginSignup