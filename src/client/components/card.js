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

function ProfileLoadingCard({number = 10}) {
    return (
      [...Array(number)].map((e, i) => {
        return (
          <div key={i} className="skeleton">
          <p className="image"></p>
          <p className="line"></p>
          </div>
        )
      })
    );
  }



export  {ProfileLoadingCard, ProfileCard};

