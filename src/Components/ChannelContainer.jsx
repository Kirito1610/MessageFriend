import React from 'react'
import {Channel,useChatContext,MessageSimple} from 'stream-chat-react';
import ChannelInner from './ChannelInner';
import CreateChannel from './CreateChannel';
import EditChannel from './EditChannel';
import {EmojiPicker} from 'stream-chat-react/emojis'
function ChannelContainer({isCreating,setIsCreating,createType,setIsEditing,isEditing,}) {
  if (isCreating) {
    return(
      <div className=' grow-[3] flex'>
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    )
  }
  if (isEditing) {
    return(
      <div className='grow-[3]'>
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    )
  }

  const EmptyState=()=>{
    <div>
      <p>This is the beginning of your chat </p>
      <p>Send Messages, attachements, links,emojis and more</p>
    </div>
  }
  return (
    <div className='col-span-3 w-full'>
      <Channel EmptyStateIndicator={EmptyState} EmojiPicker={EmojiPicker}
      Message={(messageProps,i)=><MessageSimple key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
      </div>
  )
}

export default ChannelContainer
