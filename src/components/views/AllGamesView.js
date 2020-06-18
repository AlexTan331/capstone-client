import React from 'react';

function AllGamesView(props) {
  return (
    <div>
      <button onClick={props.handleFilter({ page: -2 })}>Previous Page</button>
      <button onClick={props.handleFilter({ page: -1 })}>Next Page</button>
      {props.games ? (
        props.games.map((game) => {
          return (
            <div key={game.id}>
              <h1>{game.name}</h1>
              <img
                alt={game.name}
                src={game.background_image}
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              />
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export default AllGamesView;