import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context';

const Sidebar = () => {

    // extended is boolean value which store info of sidebar is collapsed or not
    const [extended, setExtended] = useState(false);
    const {onSent, prevPrompts, setRecentPrompt, newChat, chatHistory, setChatHistory, loadOldChat, clearChatHistory } = useContext(Context)

    const loadPrompt = async(prompt)=>{
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

  return (
    <div className={`sidebar ${extended ? 'expanded' : 'collapsed'}`}>
      
        <div className="top">
        
            <img onClick={()=>setExtended(!extended)} className='menu' src={assets.menu_icon} alt="" />

            <div onClick={()=>newChat()} className="new-chat">
                <img src={assets.plus_icon} alt="" />
                {/* using ternary operator */}
                {extended ? <p>New Chat</p> : null}
            </div>

            {/* using ternary operator  */}
            {extended ? 
                <div className="recent">
                    <p className='recent-title'>Recent</p>
                    {chatHistory.length === 0 ? (
                        <p className="empty-history">No chats yet</p>
                        ) : (
                        chatHistory.map((chat, index) => (
                            <div
                            key={index}
                            onClick={() => loadOldChat(chat)}
                            className="recent-entry">

                                <img src={assets.message_icon} alt="" />
                                <p>{(chat.prompt || "").slice(0, 25)}...</p>
                            </div>
                        ))
                    )}
                    <button className="clear-history" onClick={clearChatHistory}>
                        Delete All History
                    </button>

                </div>
                : null
            }

        </div>

        <div className="bottom">

            <div className="bottom-item recent-entry"
                onClick={() => window.open("https://support.google.com/gemini/community?hl=en&dark=1&sjid=9056826473941292056-NC", "_blank")}
            >
                <img src={assets.question_icon} alt="" />
                {extended ? <p>Help</p> : null}
            </div>

            <div className="bottom-item recent-entry"
                onClick={() => alert("Activity feature coming soon!")}
            >
                <img src={assets.history_icon} alt="" />
                {extended ? <p>Activity</p> : null}
            </div>

            <div className="bottom-item recent-entry"
                onClick={() => alert("Settings feature coming soon!")}
            >
                <img src={assets.setting_icon} alt="" />
                {extended ? <p>Settings</p> : null}
            </div>

        </div>

    </div>
  )
}

export default Sidebar
