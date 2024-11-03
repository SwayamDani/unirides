// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Use createRoot API if you're using React 18+
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';

// Get the Clerk publishable key from the environment variable
const clerkKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

// React 18 createRoot API
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkKey}> {/* use publishableKey */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);