import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'
const Main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, input, setInput, listening, startListening} = useContext(Context)
  return (
    <div className='main'>
        
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.avatar} alt="" />
        </div>

        <div className="main-container">

            {!showResult 
            ?   <>
                    <div className="greet">

                        <p><span>Hello, User</span></p>
                        <p>How can I help you today?</p>

                    </div>

                    {/* Greetings Cards  */}
                    <div className="cards">

                        <div onClick={()=>onSent("Suggest beautiful places to see on an upcoming trip")} className="card">
                            <p>Suggest beautiful places to see on an upcoming trip</p>
                            <img src={assets.compass_icon} alt="" />
                        </div>
                        <div onClick={()=>onSent("Briefly summarize this concept : urban planning")} className="card">
                            <p>Briefly summarize this concept : urban planning</p>
                            <img src={assets.bulb_icon} alt="" />
                        </div>
                        <div onClick={()=>onSent("Brainstorm team bonding activities for our break retrear")} className="card">
                            <p>Brainstorm team bonding activities for our break retrear</p>
                            <img src={assets.message_icon} alt="" />
                        </div>
                        <div onClick={()=>onSent("Improve the readibility of the following code")} className="card">
                            <p>Improve the readibility of the following code</p>
                            <img src={assets.code_icon} alt="" />
                        </div>

                    </div>
                </>
            :
                <div className='result'>

                    <div className='result-title'>
                        <img src={assets.avatar} alt="" />
                        <p>{recentPrompt}</p>
                    </div>

                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading
                        ? 
                        <div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        : 
                        <pre className='code-block'><code>{resultData}</code>
                        </pre>
                        }
                        

                    </div>
                </div>
            }

            {/* search box */}
            <div className="main-bottom">

                <div className="search-box">

                    <input onChange={(e)=>setInput(e.target.value)} 
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && input.trim() !== "") {
                            onSent();
                            }
                        }}
                        value={input} type="text" 
                        placeholder='Enter your prompt here...'
                    />

                    <div className='icons'>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" onClick={startListening} style={{ cursor: "pointer" }} className={`mic-icon ${listening ? "listening" : ""}`} />
                        {input ? <img onClick={()=>onSent()} src={assets.send_icon} alt="" /> : null}
                    </div>

                </div>

                <p className='bottom-info'>Gemini may display inaccurate info, including about people, so double-check its responses. <a href="https://support.google.com/gemini/answer/13594961" target="_blank">Your privacy & Gemini Apps</a></p>
            </div>
        </div>

    </div>
  )
}

export default Main
 