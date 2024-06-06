import React, { useState } from 'react'
import ImgSrc from '../assets/AuthImg.jpg'
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies=new Cookies();
const initialState={
    FullName:'',
    Username:'',
    MobilNum:'',
    AvatarUrl:'',
    Password:'',
    ConfirmPassword:''
}
function Auth() {
    const [isLoggedIn,setIsLoggedIN]=useState(false);
    const [formValue,setFormValue]=useState(initialState);
    const [disableState,setDisableState]=useState(true)
    const HandleChange=(e)=>{
        if (!isLoggedIn) {
            if (formValue.Password != formValue.ConfirmPassword && !formValue.FullName.length < 1 && !formValue.MobilNum.length < 1 && !formValue.ConfirmPassword.length < 6 && !formValue.Password.length < 6 && !formValue.Username.length < 1 ) {
                setDisableState(true);
            }
            else{
                setDisableState(false);
            }
        }
        else{
            if (!formValue.Username || !formValue.Password || formValue.Password.length < 6) {setDisableState(true)}
            else{setDisableState(false)}
        }
     
setFormValue((prevState)=>{return{...prevState,[e.target.name]:e.target.value}});
    }
    const handleSubmit=async (e)=>{
e.preventDefault();
setDisableState(true);
const {Username,MobilNum,AvatarUrl,Password}=formValue;
const URL='https://livechat-p3f3.onrender.com/auth/';
const {data:{token,userID,hashedPassword,FullName},}=await axios.post(`${URL}${isLoggedIn ? 'login' : 'signup'}`,{'FullName':formValue.FullName,'Username':Username,'Password':Password,'MobilNum':MobilNum,'AvatarUrl':AvatarUrl})
cookies.set('token',token);
cookies.set('Username',Username);
cookies.set('FullName',FullName);
cookies.set('userID',userID);

if (!isLoggedIn) {
    cookies.set('MobilNum',MobilNum);
    cookies.set('AvatarUrl',AvatarUrl);
    cookies.set('hashedPassword',hashedPassword);
}
window.location.reload();
    }
  return (
    <div className='flex flex-col md:flex-row flex-wrap'>
      <div className='flex w-full md:w-1/2 flex-col p-5 bg-white'>
<h1 className=' font-semibold text-2xl mb-2 text-center'>{isLoggedIn ? 'Sign In' : 'Sign Up'}</h1>
<form action="" className='px-8' onSubmit={handleSubmit}>
    {!isLoggedIn ?
    <div className='flex flex-col gap-2'>
    <label htmlFor='Full Name'> Full Name
        <input type='text' name='FullName' onChange={HandleChange} placeholder='Full name' className='outline-none mt-2 border-2 block rounded-md w-full py-2 px-4' required />
    </label>
    <label htmlFor='Full Name' className='mb-4'> UserName
    <input type='text' name='Username' onChange={HandleChange} placeholder='Username' className='outline-none mt-2 border-2 block rounded-md w-full py-2 px-4' required />
</label>
</div> : <label htmlFor='Full Name' className='mb-4'> UserName
    <input type='text' name='Username' onChange={HandleChange} placeholder='Username' className='outline-none mt-2 border-2 block rounded-md w-full py-2 px-4' required />
</label>
    }
       {!isLoggedIn && 
    <div className='flex flex-col gap-2'>
    <label htmlFor='Full Name' className='mb-4'> Phone Number
        <input type='number' name='MobilNum' onChange={HandleChange} placeholder='Phone Number' className='outline-none mt-2 border-2 block rounded-md w-full py-2 px-4' required />
    </label>
    <label htmlFor='Full Name' className='mb-4'> Avatar Url
    <input type='text' name='AvatarUrl' onChange={HandleChange} placeholder='Avatar Url' className='outline-none border-2 mt-2 block rounded-md w-full py-2 px-4' required />
</label>
</div>
    }
    <div className='flex flex-col gap-2'>
    <label htmlFor='Full Name' className='mb-4'> Password
        <input type='password' name='Password' onChange={HandleChange} placeholder='Password(Must be greater or equal to 7)' className='outline-none mt-2 border-2 block rounded-md w-full py-2 px-4' required />
    </label>
    {!isLoggedIn && 
     <label htmlFor='Full Name' className='mb-4'> Confirm Password
     <input type='password' name='ConfirmPassword' onChange={HandleChange} placeholder='Confirm Password' className='outline-none mt-2 border-2 block rounded-md w-full py-2 px-4' required />
 </label>
    }
    </div>
    <div className='flex flex-row justify-between items-center'>
<p>{!isLoggedIn ? 'Already have an account?' : 'Don\'t have an account?'}<span className=' cursor-pointer text-blue-700 ml-1' onClick={()=>setIsLoggedIN((prevState)=>!prevState)}>{isLoggedIn ?  'Sign Up' : 'Sign In'}</span></p>
<button type='submit' disabled={disableState} className='outline-none disabled:bg-gray-300 bg-blue-600 text-white p-4 py-2 rounded-sm font-medium'>{isLoggedIn ?  'Sign In' : 'Sign Up'}</button>
    </div>
</form>
      </div>
      <div className=' flex flex-1 relative'>
        <img src={ImgSrc} alt="bg-photo" className='flex flex-1' />
      </div>
    </div>
  )
}

export default Auth
