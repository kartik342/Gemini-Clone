import React, {useEffect, createContext, useState, useRef } from "react";
import runChat from "../config/Gemini";


export const Context = createContext(); // createContext return a context component, not a variable and must start with uppercase

const ContextProvider = (props) =>{

    const[input, setInput] = useState("")
    const[recentPrompt, setRecentPrompt] = useState("")
    const[prevPrompts, setPrevPrompts] = useState([])
    const[showResult, setShowResult] = useState(false)
    const[loading, setLoading] = useState(false)
    const[resultData, setResultData] = useState("")
    const [chatHistory, setChatHistory] = useState([]);
    const [listening, setListening] = useState(false);

    const startListening = () => {
        const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
        alert("Speech recognition not supported in this browser.");
        return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-IN";          // change to "hi-IN" for Hindi
        recognition.continuous = false;      // stop after one result
        recognition.interimResults = false;  // only final text

        recognition.start();
        setListening(true);

        recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        // put text into your existing input box
        setInput(transcript);

        // OPTIONAL: auto-send right after speaking
        // onSent(transcript);
        };

        recognition.onerror = (e) => {
            console.error("Speech error:", e.error);
        };

        recognition.onend = () => {
            setListening(false);
        };
    };

    useEffect(() => {
        const savedChats = localStorage.getItem("chatHistory");
        if (savedChats) {
            try {
            const parsedChats = JSON.parse(savedChats);
            console.log("Loaded from localStorage:", parsedChats);
            if (Array.isArray(parsedChats)) setChatHistory(parsedChats);
            } catch (err) {
            console.error("Error loading chatHistory:", err);
            setChatHistory([]);
            }
        }
    }, []);




    // Save chat history every time it changes
    const firstRender = React.useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return; // Skip saving on the first render
        }
        
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }, [chatHistory]);

    const delayPara = (index, nextWord)=>{
        setTimeout(function(){
            setResultData(prev => prev+nextWord)
        }, 40*index)
    }

    const newChat = () =>{
        setLoading(false)
        setShowResult(false)
    }

    const loadOldChat = (chat) => {
        setShowResult(true);
        setRecentPrompt(chat.prompt);
        setResultData(chat.response);
    };

    const clearChatHistory = () => {
        if (window.confirm("Are you sure you want to delete all chat history?")) {
            setChatHistory([]);
            localStorage.removeItem("chatHistory");
            setShowResult(false);
            setRecentPrompt("");
            setResultData("");
            console.log("Chat history cleared.");
        }
    };


    const onSent = async(prompt)=>{
        
        setResultData("") // to remove prev value of resultData
        setLoading(true)
        setShowResult(true)
        
        let response; 
        if(prompt !== undefined){
            response = await runChat(prompt)
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev, input])
            setRecentPrompt(input)
            response = await runChat(input)
        }
        
        let newResponseArray = response.split(" ")

        // Save this conversation
        setChatHistory(prev => [
            ...prev,
            { prompt: prompt || input, response, timestamp: new Date().toLocaleTimeString() }
        ]);

        console.log("Updated chatHistory state (before saving):", chatHistory);


        for(let i=0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i]
            delayPara(i, nextWord+" ")
        }

        setLoading(false)
        setInput("")
    }

    // useEffect(() => {
    //     onSent(); // <--- THIS LINE is what finally calls the function!
    // }, []);

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        chatHistory,
        setChatHistory,
        loadOldChat,
        clearChatHistory,
        listening,
        startListening
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider