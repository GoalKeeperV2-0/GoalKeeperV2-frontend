import React, { useEffect } from 'react'

function Login() {
    useEffect(()=>{

        const code = new URL(document.location.toString()).searchParams.get(
            'code',
        ) as string;
        console.log( "인가코드 : ",code);
        console.log( "한번 사용한 인가코드는 다시 사용못하므로 재발급 받아야함");
    },[]);
  return (
    <div>Login</div>
  )
}

export default Login