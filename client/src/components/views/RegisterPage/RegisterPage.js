import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {loginUser, registerUser} from '../../../_actions/user_action'

function RegisterPage() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  
  // email, password, confirmpassword State만들기
  const [Email, setEmail]=useState("");
  const [Password, setPassword]=useState("");
  const [Name, setName]=useState("");
  const [ConfirmPassword, setConfirmPassword]=useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) =>{
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) =>{
    setConfirmPassword(event.currentTarget.value)
  }

  const onNameHandler = (event) =>{
    setName(event.currentTarget.value)
  }

  const onSubmitHandler = (event) =>{
    event.preventDefault(); // pageRefresh를 막음

    if(Password !== ConfirmPassword){
      return alert('비밀번호와 비밀번호확인 불일치')
    }
    
    let body = {
      email : Email,
      password : Password,
      name : Name,
      
    }

    //action 넣어주기
    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success){
          navigate('/login')
        }else{
          alert('Failed sign up')
        }
      })
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

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />


        <br />
        <button>Login</button>
      </form>
      </div>
  )
}

export default RegisterPage