import React from 'react';
import {ProfileCard, ProfileLoadingCard} from './components/card';
import './app.scss';


function App() {
  return (
    <div className="feed_container">
      <ProfileCard
      avatar = "https://robohash.org/eoseaqueconsequatur.jpg?size=100x100&set=set1"
      firstName = "John"
      lastName = "King"
      />
      <ProfileLoadingCard/>
    </div>
  );
}

export default App;
