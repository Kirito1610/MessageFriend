import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react';
import UserList from './UserList';
import close from '../assets/close.png'
import 'stream-chat-react/dist/css/v2/index.css';
const ChannelIput=({channelName,setChannelName})=>{
  const handleChange=(e)=>{
e.preventDefault();
setChannelName(e.target.value);
  }
  return(
    <div className='w-full  flex flex-col gap-8'>
      <label htmlFor="input" className='flex flex-wrap flex-col gap-2'>Name
      <input type="text" placeholder="Channel Name" onChange={handleChange} value={channelName} className='bg-gray-100 outline-none p-2 rounded-md flex flex-1 text-black pl-4 placeholder:text-black' />
      </label>
      <p>Add Members</p>
    </div>
  )
}

function CreateChannel({createType,setIsCreating}) {
  const [channelName,setChannelName]=useState('');
  const {client,setActiveChannel}=useChatContext();
  const [selectedUsers,setSlectedUsers]=useState([client.userID || '']);
  const createChannel=async(e)=>{
e.preventDefault();
try {
  const newChannel= client.channel(createType,channelName,{
    name:channelName,members:selectedUsers
  });
   
  await newChannel.watch();
  setChannelName('');
  setIsCreating(false);
  setSlectedUsers([client.userID]);
  setActiveChannel(newChannel);
} catch (error) {
  console.log(error);
}
  }
  return (
    <div className='bg-white relative flex min-w-full ml-1 h-screen' style={{minWidth:'100%',paddingTop:'10px',paddingBottom:'10px'}}>
<div className='p-5 px-8 box-border grow-[3] flex flex-col gap-4'>
<div className='flex  justify-between items-center'>
  <p className=' font-bold text-xl'>{createType === 'team' ? 'Create a New Channel' : 'Send Direct Messages'}</p>
  <img src={close} alt="close.png" onClick={()=>setIsCreating((prevState)=>!prevState)} className='w-6 object-contain cursor-pointer' />
  </div>
{createType === 'team' ? <ChannelIput channelName={channelName} setChannelName={setChannelName}  /> :''}
<UserList selectedUsers={selectedUsers} setSlectedUsers={setSlectedUsers}  />
<div onClick={createChannel} className=' cursor-pointer'>
  <p className=' bg-blue-400 text-white font-medium px-4 p-1.5 absolute bottom-4 right-8 rounded-md'>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
</div>
</div>
    </div>
  )
}

export default CreateChannel
