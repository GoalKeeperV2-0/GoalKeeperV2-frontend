import React, { useEffect } from 'react'
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&scope=${process.env.REACT_APP_GOOGLE_SCOPE1} ${process.env.REACT_APP_GOOGLE_SCOPE2}&response_type=code`;
function Home() {
    useEffect(()=>{

        const code = new URL(document.location.toString()).searchParams.get(
            'code',
        ) as string;
        console.log( "인가코드 : ",code);
        console.log( "한번 사용한 인가코드는 다시 사용못하므로 재발급 받아야함");
    },[]);
    console.log(GOOGLE_AUTH_URL);
  return (
    <div> <button>
    <a href={GOOGLE_AUTH_URL}>구글로그인버튼</a>
   </button>
</div>
  )
}

export default Home