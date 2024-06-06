import React from 'react'
import { useState,useEffect, } from 'react'
import {useChatContext} from 'stream-chat-react';
import search from '../assets/search.png';
import close from '../public/close.png'
import ResultDropdown from './ResultDropdown';
function PeopleSearch() {
  const [query,setQuery]=useState('');
  const [teamChannels,setTeamChannels]=useState([]);
  const [directChannels,setDirectChannels]=useState([]);
const [LoadingChannels,setLoading]=useState('false');
const {client,setActiveChannel}=useChatContext();


useEffect(()=>{
  if (!query) {
    setTeamChannels([]);
    setDirectChannels([]);
  }
},[query])

const getChannel=async (text)=>{
try{
const channelResponse= client.queryChannels({
  type:'team',
  name:{$autocomplete : `${text}`},
  members:{$in : [client.userID]}
});
const userResponse=client.queryUsers({
  id:{$nin : [client.userID]},
  name:{$autocomplete : text}
})

const [channels,{users}]=await Promise.all([channelResponse,userResponse]);
if (channels.length) setTeamChannels(channels);
if (users.length) setDirectChannels(users)
}catch(error){
  setQuery('')
}
}
const onSearch=(e)=>{
  setQuery(e.target.value);
  getChannel(e.target.value)
}
const setChannel=(channel)=>{
setQuery('');
setActiveChannel(channel);
}
  return (
    <div className='p-4 pl-0 relative'>
    <div className='relative'>
       <input type="text" value={query} onChange={onSearch} placeholder='search' className=' relative outline-none placeholder:text-base text-sm border-2 p-2 pl-10 rounded-md' />
        <img src={search} alt='search' className='absolute top-3 left-4 w-4 object-contain' ></img>
       {query && <img src={close} alt='search' className='absolute top-[14px] cursor-pointer right-4 w-3 object-contain' onClick={()=>{setQuery('')}} ></img>}
    </div>
    {query &&(
      <ResultDropdown
      teamChannels={teamChannels}
      directChannels={directChannels}
      loading={LoadingChannels}
      setQuery={setQuery}
      setChannel={setChannel}
      />
    )}
    </div>
  )
}

export default PeopleSearch
