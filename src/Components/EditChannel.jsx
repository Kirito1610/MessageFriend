import React, { useState } from 'react'
import {useChatContext} from 'stream-chat-react'
import UserList from './UserList'
import close from '../assets/close.png'
const ChannelInput=({channelName = '',setChannelName })=>{
const handleChange=(e)=>{
  setChannelName(e.target.value)
}
  return(
    <div className='w-full flex flex-col gap-8'>
    <label htmlFor="input" className='flex flex-col gap-2'>Name
    <input type="text" placeholder="Channel Name" onChange={handleChange} value={channelName} className='bg-gray-100 outline-none p-2 rounded-md flex flex-1 text-black pl-4 placeholder:text-black' />
    </label>
  </div>
  )
}

function EditChannel({setIsEditing}) {
  const {channel}=useChatContext()
  const [channelName,setChannelName]=useState(channel.data.name)
  const [selectedUsers,setSlectedUsers]=useState([])
  const updateChannel=async()=>{
const NameChange= channelName != channel.data.name || channel.data.id;
if(NameChange){
  await channel.update({name:channelName},{text:`Channel Name changed to ${channelName}`})
}
if (selectedUsers.length) {
  await channel.addMembers(selectedUsers,{text:`Added New Member `});
}
setChannelName(null);
setIsEditing(false);
setSlectedUsers([]);
  }
  return (
    <div className='bg-white relative flex-col flex ml-1 h-screen'>
      <div className='p-5 px-8 box-border grow-[3] flex flex-col gap-4'>
   <div className='flex items-center justify-between'>
    <p>Edit Channel</p>
    <img src={close} alt="close.png" onClick={()=>setIsEditing((prevState)=>!prevState)} className='w-6 object-contain cursor-pointer' />
   </div>
   <div className='flex gap-8 flex-col'>
   <ChannelInput channelName={channelName} setChannelName={setChannelName}  />
   <UserList setSlectedUsers={setSlectedUsers} />
   </div>
   <div>
    <p onClick={updateChannel} className='bg-blue-400 cursor-pointer text-white font-medium px-4 p-1.5 absolute bottom-4 right-4 rounded-md'>Save Changes</p>
   </div>
   </div>
    </div>
  )
}

export default EditChannel
