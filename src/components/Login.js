import React, { useEffect } from 'react';
import { SignedIn, SignedOut, SignIn, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import your custom CSS file

const Login = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/unirides/profile');
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="container">
      <SignedIn>
        {/* This will be handled by the useEffect hook */}
      </SignedIn>
      <SignedOut>
        <SignIn path="/unirides/login" routing="path" signUpUrl="/unirides/signup" className="custom-signin" />
      </SignedOut>
    </div>
  );
};

export default Login;