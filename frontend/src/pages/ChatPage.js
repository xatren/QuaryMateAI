import React from 'react';

const ChatPage = ({ messages }) => {
    return (
        <div className="chat-page flex flex-col justify-end h-full">
            <div className="chat-messages flex-1 overflow-auto p-4">
                {messages && messages.length > 0 ? (
                    messages.map((message, index) => (
                        <div key={index} className="mb-4">
                            <div className={`p-2 rounded-lg ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                                {message.text}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500">No messages yet.</div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
