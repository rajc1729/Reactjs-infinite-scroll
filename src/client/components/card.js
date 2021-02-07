import React from 'react';
import './card.scss';


function ProfileCard({avatar, firstName, lastName}) {
  return (
    <div className="card_container">
        <img src={avatar} alt={firstName}/>
        <h1>{firstName} {lastName}</h1>
    </div>
  );
}

function ProfileLoadingCard() {
    return (
      <div className="skeleton">
              <p class="image"></p>
              <p class="line"></p>
      </div>
    );
  }



export  {ProfileLoadingCard, ProfileCard};

