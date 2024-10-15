import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './services/firebase';
import LoginPage from './components/LoginPage';
import QuestionPage from './components/QuestionPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);  // track user

  // monitor authentication 
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);  // set user state when auth changes
      console.log("Auth state changed:", user);  // debugging
    });
    return () => unsubscribe();  
  }, []);

  return (
    <Router>
      <Routes>
        {/* login page  */}
        <Route path="/" element={user ? <QuestionPage /> : <LoginPage />} />
        
        {/* Protect QuestionPage if user is not logged in, redirect to login */}
        <Route
          path="/questions"
          element={user ? <QuestionPage /> : <LoginPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
