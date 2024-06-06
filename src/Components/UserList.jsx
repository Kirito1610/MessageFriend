import React, { useState,useEffect } from 'react'
import { useChatContext,Avatar } from 'stream-chat-react'
import Checkmark  from '../assets/checkmark-128.svg'
const ListContainer=({children})=>{
    return(
        <div className='w-full flex flex-1 flex-col'>
            <div className='flex justify-between text-lg font-medium text-gray-400'>
<p>User</p>
<p>Invite</p>
            </div>
            {children}
        </div>
    )
}
const UserItem=({user,setSlectedUsers,selectedUsers})=>{
    
    const [selected,setSelected]=useState(false)
    const clickHandler=()=>{
        if (selected) {
            setSlectedUsers((prevUser)=> prevUser.filter((prevUser)=> prevUser != user.id))
        }
        else{
            setSlectedUsers((prevState)=>[...prevState,user.id])
        }
        setSelected((prevState)=>!prevState);
    }
    if (user.name) return(
    <div className='flex justify-between items-center'>
    <div className='flex flex-1 gap-4 flex-row mt-3'>
<Avatar image={user?.image} size={32} style={{borderRadius:'20px !important'}} />
<p>{user?.name}</p>
    </div> 
    <div onClick={clickHandler}>
    { selected ?
<img src={Checkmark} alt='checkmark' className='w-8 object-contain'  /> :
    <div className='w-7 border rounded-full h-7'></div>
}
</div>
    </div>
)
}




function UserList({selectedUsers,setSlectedUsers}) {
    const {client}=useChatContext();
    const [users,setUsers]=useState([]);
    const [Loading,setLoading]=useState(false);
    const [listEmpty,setListEmpty]=useState(false);
const [error,setError]=useState(false)
useEffect(()=>{
const getUser=async ()=>{
    if (Loading) return
    setLoading(true);

try {
    const response=await client.queryUsers(
        {id: {$ne:client.userID}},
        {id:1},
        {limit: 8}
    )

if (response.users.length) {
    setUsers(response.users);
}
else{
    setListEmpty(true)
}

} catch (error) {
    setError(true)
}
setLoading(false)
}

if (client) getUser();

},[])

if (error) {
    return(
     <ListContainer>
     <p>Error Loading, Please refresh and try again.</p>
     </ListContainer>
    )
}

if (listEmpty) {
    return(
     <ListContainer>
     <p>No Users Found.</p>
     </ListContainer>
    )
}

  return (
    <ListContainer>
        {Loading ? <div>User Loading ...</div> :
        users?.map((user,i)=>(
            <UserItem user={user} index={i} key={user.id} selectedUsers={selectedUsers} setSlectedUsers={setSlectedUsers} />
        ))
        }
    </ListContainer>
  )
}

export default UserList
