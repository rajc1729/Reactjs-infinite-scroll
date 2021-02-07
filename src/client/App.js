import React from 'react';
import ProfileCard from './components/card';
import './app.css';


function App() {
  return (
    <div className="feed_container">
      <ProfileCard
      avatar = "https://robohash.org/eoseaqueconsequatur.jpg?size=100x100&set=set1"
      firstName = "Raj"
      lastName = "Chhatbar"
      />
    </div>
  );
}

export default App;
