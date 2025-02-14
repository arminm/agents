import React from 'react';
import './globals.css';

const Layout = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <title>Chatbot Application</title>
            </head>
            <body className="bg-gray-100 text-gray-900">
                <header className="bg-blue-500 text-white p-4">
                    <h1 className="text-2xl font-bold">Chatbot Application</h1>
                </header>
                <main className="flex flex-col max-h-screen">{children}</main>
            </body>
        </html>
    );
};

export default Layout;