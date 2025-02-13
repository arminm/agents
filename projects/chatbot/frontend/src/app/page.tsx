import React from 'react';
import ChatComponent from '../components/chat';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the Chatbot Application</h1>
            <p>This is the main entry point for our chatbot website.</p>
            <ChatComponent />
        </div>
    );
};

export default HomePage;