import React from 'react'
import image from '../../src/assets/add.png'
function PeopleList({children,error = false,loading,type,...rest}) {
    if (error) {
        return type === 'team' ? (
            <div className=''>
                <p>Connection error, Please wait a moment and try again</p>
            </div>
        ) : null
    }
    if (loading) {
        return(
            <>
            <p>{type === 'team' ? 'Channels' :'Messages'} Loading...</p>
            </>
        )
    }
    const clickHandler=()=>{
      rest.setCreateType(()=>type === 'team' ? 'team' :'messaging')
      rest.setIsCreating((prevState)=> !prevState);
      rest.setIsEditing(false);
      // if (setToggleContainer) setToggleContainer((prevState)=> !prevState);
    } 
   
  return (
    <div className='px-3'>
      <div className='flex justify-between items-center'>
      <p className='py-2'>{type === 'team' ? 'Channels' :' Direct Messages'}</p>
<img src={image} alt='add' className=' w-5 object-contain cursor-pointer mr-5' onClick={clickHandler} />
      </div>
      {children}
    </div>
  )
}

export default PeopleList
