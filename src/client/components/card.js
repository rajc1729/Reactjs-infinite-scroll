import React from 'react';
import './card.css';


function ProfileCard({avatar, firstName, lastName}) {
  return (
    <div className="card_container">
        <img src={avatar} alt={firstName}/>
        <h1>{firstName} {lastName}</h1>
    </div>
  );
}

export default ProfileCard;
