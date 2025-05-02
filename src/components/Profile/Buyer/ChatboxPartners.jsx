import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ChatboxPartners.module.css'
import { CiMenuKebab } from "react-icons/ci";

function ChatboxPartners() {

    const refChat = useRef();
    const refTheme = useRef();
    const [message,setMessage] = useState('');
    const [allMessages,setAllMessages] = useState([]);
    const [tagStatus,setTagStatus] = useState('me');
    const [showSelect, setShowSelect] = useState(false); 
    const [selectTheme,setSelectTheme] = useState('Light')
    

    const handleMessage = (e)=>{
      
         setMessage(e.target.value);
      
    }

    const handleChats = (e)=>{
       
        if(tagStatus==='me'){
            setTagStatus('partner');
         }
         else{
            setTagStatus('me');
         }

        if(message.trim()!=='')
        {

            setAllMessages((prevMessages)=>[
                ...prevMessages,{tag:tagStatus,text:message}
            ])

            setMessage('');

            
        }

        const audio = new Audio("/audios/mixkit-hard-pop-click-2364.wav"); // Replace with your sound file
        audio.play();

        setTimeout(() => {
            if (refChat.current) {
              refChat.current.scrollTo({
                top: refChat.current.scrollHeight, // Scroll to the bottom
                behavior: 'smooth', // Smooth scrolling
              });
            }
          }, 0);

      
       
       
    }

    const handleKeySend = (e)=>{
        if(e.code === 'Enter')
        {
            handleChats(e);
        }
      }


    const handleTheme = (e)=>{
        setShowSelect((prev)=>!prev);
    }

    const handleThemeList = (e) =>{
        setSelectTheme((prev)=> prev = e.target.innerText);
        
     

        
    }

    useEffect(()=>{
            
        if(selectTheme==='Light'){
            refTheme.current.style.backgroundColor = '#fff';
            refTheme.current.style.color = '#000';
        }
        else{
            refTheme.current.style.backgroundColor = '#000';
            refTheme.current.style.color = '#fff';
        }

    },[selectTheme])


    
  return (
    <div className={styles['container']} ref={refTheme}>

        <div className={styles['headingCont']}>
            <Link to={'/myprofile/mypartners'} className={styles['backBtn']}>Back</Link>
            <span>Chat Box</span>
            <Link></Link>
        </div>

        <div className={styles['chatCont']} ref={refChat}>

      {allMessages.map((msg,index)=>{
        return   <div className={msg.tag!=='me'? styles['blockChatPartner']:styles['blockChatMe']}>

         {/* conditional rendering image and message partner and me    */}

      {msg.tag!=='me' ? (<> <img src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
      <div className={msg.tag!=='me'?styles['messagePartner']:styles['messageMe']}>
          <p>{msg.text}</p>
      </div></>): 


      (<>
      <div className={msg.tag!=='me'?styles['messagePartner']:styles['messageMe']}>
          <p>{msg.text}</p>
      </div>
      <img src="https://media.istockphoto.com/id/1392528328/photo/portrait-of-smiling-handsome-man-in-white-t-shirt-standing-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=6vUtfKvHhNsK9kdNWb7EJlksBDhBBok1bNjNRULsAYs=" alt="" />
      </>)
      }
      </div>

      })}



        </div>
     
        <div className={styles['messageContainer']}>
<CiMenuKebab className={styles['menuIcon']} onClick={handleTheme}/>
{showSelect && (
    <ul className={styles['themeDropdown']} onClick={handleThemeList}>
    <li className={selectTheme==='Light'?styles['selectTheme']:""} style={{borderRadius:'10px 10px 0px 0px'}}>Light</li>
    <li className={selectTheme==='Dark'?styles['selectTheme']:""} style={{borderRadius:'0px 0px 10px 10px'}}>Dark</li>
</ul>
)}
<input type="text" name="" id="" value={message} placeholder='Write Message Here...' onChange={handleMessage} onKeyDown={handleKeySend} style={selectTheme==='Light'?{color:'#000'}:{color:'#fff'}}/>
<button onClick={handleChats}>Send</button>

</div>
    </div>
  )
}

export default ChatboxPartners