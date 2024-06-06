import React, { useRef,useState } from 'react';
import { MessageList, MessageInput, Thread, Window, useChannelActionContext, Avatar, useChannelStateContext, useChatContext } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

export const GiphyContext = React.createContext({});

const ChannelInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();
  
  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };
    
    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }
    
    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };
const flRef=useRef();

  return (
    <div style={{minWidth:'100%',paddingTop:'10px',paddingBottom:'10px'}} className='sm:flex'>
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
        <Window>
          <TeamChannelHeader setIsEditing={setIsEditing}  style={{width:'100%',margin:'0 auto'}} />
          <MessageList setFlatListRef={ref => (flRef.current = ref)}  style={{width:'100%',margin:'0 auto'}} />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} audioRecordingEnabled={true}  style={{width:'100%',margin:'0 auto'}} />
        </Window>
        <Thread />
    </GiphyContext.Provider>
    </div>
  );
};

const TeamChannelHeader = ({ setIsEditing }) => {
    const { channel, watcher_count } = useChannelStateContext();
    const { client } = useChatContext();
  
    const MessagingHeader = () => {
      const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
      const additionalMembers = members.length - 3;
  
      if(channel.type === 'messaging') {
        return (
          <div className='team-channel-header__name-wrapper '>
            {members.map(({ user }, i) => (
              <div key={i} className='team-channel-header__name-multi flex gap-3 items-center'>
                <Avatar image={user.image} name={user.fullName || user.name} size={32} />
                <p className='team-channel-header__name user'>{user.FullName || user.name}</p>
              </div>
            ))}
  
            {additionalMembers > 0 && <p className='team-channel-header__name user'>and {additionalMembers} more</p>}
          </div>
        );
      }
  
      return (
        <div className='flex gap-3 items-center justify-center'>
          <p className='team-channel-header__name font-bold text-4xl italic'># {channel.data.name}</p>
          <span style={{ display: 'flex' }} onClick={() => setIsEditing(true)}>
         <span className=' text-slate-500 w-5 h-5 mt-2 rounded-full border flex items-center justify-center p-2 cursor-pointer'>i</span>
            
          </span>
        </div>
      );
    };
  
    const getWatcherText = (watchers) => {
      if (!watchers) return 'No users online';
      if (watchers === 1) return '1 user online';
      return `${watchers} users online`;
    };
  
    return (
      <div className='flex items-start flex-col justify-between bg-white py-2 px-4 w-full'>
        <MessagingHeader />
        <div className='team-channel-header__right'>
          <p className='team-channel-header__right-text'>{getWatcherText(watcher_count)}</p>
        </div>
      </div>
    );
  };

  export default ChannelInner;