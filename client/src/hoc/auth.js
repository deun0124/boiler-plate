import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'


export default function(SpecifiComponent, option, adminRoute = null ) {
    // option (mull, true, false)
    // null = 아무나 출입 가능한 페이지
    // true = 로그인 한 유저만 출입 가능한 페이지
    // false = 로그인 한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(porps){
       const disaptch =  useDispatch()
        useEffect(()=>{

            dispatchEvent(auth()).then((response) =>{

            })
            axios.get('api/users/auth')

        })
    }
    

    return AuthenticationCheck
}