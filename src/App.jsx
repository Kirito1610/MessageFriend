
import './index.css'
import {Chat} from 'stream-chat-react'
import { StreamChat } from 'stream-chat';
import Cookies from 'universal-cookie';
import ChannelContainer from './Components/ChannelContainer';
import ChannelListContainer from './Components/ChannelListContainer';
import Auth from './Components/Auth';
import { useState } from 'react';
import 'stream-chat-react/css/v2/index.css'

const cookies=new Cookies();
const AuthToken=cookies.get('token');
const client=StreamChat.getInstance("4kesj7uh3u5c");
if (AuthToken) {
  client.connectUser({
    id: cookies.get('userID'),
    name: cookies.get('Username'),
    FullName: cookies.get('FullName'),
    image: cookies.get('AvatarUrl'),
     MobilNum: cookies.get('MobilNum'),
        hashedPassword: cookies.get('hashedPassword'),
  },AuthToken)
}
function App() {

const [createType,setCreateType]=useState('');
const [isCreating,setIsCreating]=useState(false);
const [isEditing,setIsEditing]=useState(false);
  if (!AuthToken) return <Auth />
  return (
  
   <div className='w-full gap-5  '>
    <div className='flex flex-col sm:flex-row max-w-screen-xl mx-auto px-1 h-screen'>
   <Chat client={client} theme='team dark'>
    
    <ChannelListContainer
    isCreating={isCreating}
    setIsCreating={setIsCreating}
    setCreateType={setCreateType}
    setIsEditing={setIsEditing}
    />
    <ChannelContainer
    isCreating={isCreating}
    setIsCreating={setIsCreating}
    createType={createType}
    setIsEditing={setIsEditing}
    isEditing={isEditing}
    />
   </Chat>
   </div>
   </div>
  )
}

export default App
