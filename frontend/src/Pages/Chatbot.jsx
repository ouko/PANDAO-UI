import React, { useState, useEffect } from "react";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 5000); 

        return () => clearTimeout(timer);
    }, []);

    const toggleChatbot = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <div>
            <button
                onClick={toggleChatbot}
                className="fixed bottom-4 right-4 bg-transparent p-0 border-none"
                style={{ cursor: "pointer", zIndex: 9999 }}
            >
                <img
                    src="/logo1.png"
                    alt="Chat Icon"
                    className="w-16 h-16" 
                />
            </button>

          
            {isOpen && (
                <div
                    className="fixed bottom-20 right-4 w-60 sm:w-[375px] h-[70vh] border rounded-lg bg-white shadow-lg z-50"
                    style={{ zIndex: 9999 }}
                >
                    <iframe
                        src="https://www.chatbase.co/chatbot-iframe/r_SBaVSe-gQtH9oky9_K9"
                        className="w-full h-full rounded-lg" 
                        frameBorder="0"
                        title="Chatbot"
                    ></iframe>
                </div>
            )}

        </div>
    );
};

export default Chatbot;
