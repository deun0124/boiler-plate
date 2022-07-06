// import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {loginUser} from '../../../_actions/user_action'

function LoginPage() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  // email, password State만들기
  const [Email, setEmail]=useState("");
  const [Password, setPassword]=useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) =>{
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) =>{
    event.preventDefault(); // pageRefresh를 막음
    
    let body = {
      email : Email,
      password : Password,
    }

    //action 넣어주기 = loginUser(body) -> user_action.js
    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess){
          navigate('/')
        }else{
          alert('error')
        }
      })

    // axios.post('/api/users/login', body)
    // .then(response => {

    // })

  }

  return (
    <div style={{
      display:'flex', justifyContent:'center',alignItems:'center'
      ,width:'100%',height:'100vh'
    }}>
      <form style={{display:'flex', flexDirection:'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <br />
        <button>Login</button>
      </form>
      </div>
  )
}

export default LoginPage