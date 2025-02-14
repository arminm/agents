import React from 'react';
import ChatComponent from '../components/chat';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
            <div className="p-4">
                {/* <h1 className="text-4xl font-bold mb-4">Welcome to the Chatbot Application</h1> */}
                {/* <p className="text-lg mb-8">This is the main entry point for our chatbot website.</p> */}
            </div>
            <ChatComponent />
        </div>
    );
};

export default HomePage;