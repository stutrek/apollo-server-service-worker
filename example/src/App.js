import React from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import QueryComponent from './QueryComponent';

import logo from './logo.svg';
import './App.css';

const client = new ApolloClient();

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <QueryComponent />
            </div>
        </ApolloProvider>
    );
}

export default App;
