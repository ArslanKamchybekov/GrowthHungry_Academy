import Login from './components/Login';
import { useState } from 'react';
import VideoList from './components/VideoList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <VideoList/>
      ) : (
        <Login handleLogin={handleLogin}/>
      )}
    </div>
  );
}

export default App;