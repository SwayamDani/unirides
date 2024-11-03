// src/App.js
import React, {useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth, ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Cards from './components/Cards';
import Login from './components/Login';
import Signup from './components/CustomSignUp';
import CreateGroup from './components/CreateGroup';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css';

const App = () => {

  const { signOut } = useAuth();

  useEffect(() => {
    const handleUnload = (event) => {
      console.log('Logging out...');
      signOut();
    };

    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, [signOut]);

  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/unirides" element={<Home />} />
          <Route path="/unirides/profile" element={<Profile />} />
          <Route path="/unirides/cards" element={<Cards />} />
          <Route path="/unirides/join-group" element={<Cards />} /> {/* "Join a Group" shows Cards */}
          <Route path="/unirides/create-group" element={<CreateGroup />} />
          <Route path="/unirides/about-us" element={<div>About Us Page</div>} />
          <Route path="/unirides/login" element={<Login />} /> {/* Add a proper login route */}
          <Route path="/unirides/signup" element={<Signup />} /> {/* Add a proper signup route */}
          <Route path="/unirides/login/factor-one" element={<RedirectToSignIn />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
