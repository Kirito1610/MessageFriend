import React, { useContext, useState } from 'react'
import {ChannelList,useChatContext} from 'stream-chat-react';
import PeopleList from './PeopleList';
import PreviewList from './PreviewList';
import messenger from '../public/messenger.png'
import '../index.css';
import PeopleSearch from './PeopleSearch';
import 'stream-chat-react/dist/css/v2/index.css';
import exit from '../public/power-off.png'
import Cookies from 'universal-cookie';
const customChannelTeamFilter = (channels) => {
  return channels.filter((channel)=> channel.type === 'team');
};
const customChannelMessagingFilter=(channels)=>{
  return channels.filter((channel)=> channel.type === 'messaging')
  }
  const cookies=new Cookies();
  const logoutHandler=()=>{
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('name');
    window.location.reload();
  }
const Peoples=({...rest})=>{
const {client}=useChatContext();
const filters = {members: { $in: [client.userID] } }
  return(
    <div className='flex flex-1 sm:flex-0 flex-col gap-3 border-b-2 sm:border-r-2 bg-white sticky top-0 pl-4 pt-8 pb-8 text-sm '>
      <div className='flex items-center gap-2'>
<img src={messenger} alt='app_logo' className='w-10 object-contain' />
<p className=' font-medium'>MessageFriend</p>
</div>
      <PeopleSearch />
      <h1 className='font-bold m-0 text-base px-1'>Groups and Persons</h1>
      <hr />
      <div className=''>
      <ChannelList
    filters={filters}
    channelRenderFilterFn={customChannelTeamFilter}
    List={(listprops)=><PeopleList {...listprops} type='team' {...rest}   />}
    Preview={(PreviewProps)=><PreviewList {...PreviewProps} type='team' {...rest} />}
    />
      </div>
        <ChannelList
    filters={filters} 
    channelRenderFilterFn={customChannelMessagingFilter} 
    List={(listprops)=><PeopleList {...listprops} type='messaging' {...rest}   />}
    Preview={(PreviewProps)=><PreviewList {...PreviewProps}  type='messaging' {...rest} />}
    />
    <div className='flex pl-4 gap-3 focus:scale-95' onClick={logoutHandler}>
<img src={exit} alt="exit" className='w-6 object-contain' />
<p className=' font-medium cursor-pointer'>Logout</p>
      </div>
    </div>
  )
}
function ChannelListContainer({...rest}) {
  const [toggleContainer,setToggleContainer]=useState(false)
  return (
    <div className='flex flex-1'>
      <Peoples {...rest} />
      
    </div>
  )
}

export default ChannelListContainer
