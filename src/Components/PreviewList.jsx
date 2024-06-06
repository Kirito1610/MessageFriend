
import React from 'react'
import { Avatar,useChatContext } from 'stream-chat-react'
function PreviewList({channel,type,...rest}) {
    const {channel:ActiveChannel,client,setActiveChannel}=useChatContext();
    const ChannelPreview=({})=>{
      return(
        <div className=''>
        <p className={`p-2 ${ ActiveChannel.data.name === channel?.data?.name ? 'bg-gray-200 font-medium' : ''} hover:bg-gray-200 cursor-pointer rounded-md my-2`}>
            # {channel?.data?.name || channel?.data?.id }
        </p>
        </div>)
    }
    const DirectPreview=()=>{
        const members = Object.values(channel.state.members).filter(({user})=> user.id !== client.userID)
       
        return(
            <div className={`flex gap-3 p-2 my-2 hover:bg-gray-200 cursor-pointer rounded-md ${ ActiveChannel.id === channel.id ? 'bg-gray-200 font-medium' : ''}`}>
                <Avatar 
                image={members[0]?.user.image}
                name={members[0]?.user?.FullName  || members[0]?.user?.id}
                size={24}
                />
                <p className='text-base font-medium'>{members[0]?.user?.FullName  || members[0]?.user?.id}</p>

            </div>
        )
    }
  return (
    <div onClick={()=>{
      rest.setIsCreating(false);
      rest.setIsEditing(false);
      setActiveChannel(channel);
    }}>
      {type === 'team' ? <ChannelPreview /> :  <DirectPreview />}
    </div>
  )
}

export default PreviewList
