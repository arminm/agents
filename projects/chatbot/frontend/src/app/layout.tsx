import React from 'react';

const Layout = ({ children }) => {
    return (
        <html lang="en">
            <head>
            <title>Chatbot Application</title>
            </head>
            <body>
            <header>
                <h1>Chatbot Application</h1>
            </header>
            <main>{children}</main>
            </body>
        </html>
    );
};

export default Layout;