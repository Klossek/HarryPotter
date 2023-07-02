import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import useUser from './hooks/useUser';

export default function App() {

  const [user] = useUser();
  const [game, setGame] = useState();

  function isUserPlaying(user, game) {
    return game.players.find((player) => player._id === user._id);
  };

  useEffect(() => {
    socket.emit("getGame");
    socket.on("game", (res) => {
      console.log(res);
      setGame(res);
    });
  }, []);

  return game && (
    <div className=" App">
      <div className='text-xl'>Harry Potter Quiz</div>
      {!game.isStarted ?
        < button className='bg-amber-400  cursor-pointer m-4' onClick={() => {
          socket.emit("startGame", user);
        }}>
          Start game
        </button > :
        !isUserPlaying(user, game) &&
        < button className='bg-amber-400  cursor-pointer m-4' onClick={() => {
          socket.emit("startGame", user);
        }}>
          Join game
        </button>
      }
      <button className='bg-amber-400  cursor-pointer m-4' onClick={() => {
        socket.emit("restart", user);
      }}>
        restart
      </button>

      {
        game.isStarted && isUserPlaying(user, game) &&
        <div className='flex flex-col w-[300px] gap-2 m-2'>
          {
            [1, 2, 3, 4].map((number) => {
              return <button key={"button_" + number} className='bg-amber-400 m-2 cursor-pointer font-bold text-l border-none focus:border-none' onClick={() => {
                socket.emit("selected", { "selected": number, user });
              }}>
                {number}
              </button>;
            })
          }
        </div>
      }

      {
        game.isStarted ? <>
          <div> Game: </div>
          <div>
            <div> round: {game.round} </div>
          </div>
        </> :
          <div> Final Score: </div>
      }

      <ul className='flex flex-col mt-4 mr-10 gap-2'>
        {game.players.sort((A, B) => { return A.score < B.score; }).map((player) => {
          let tempScore = <></>;

          if (player.lastScore > 0) {
            tempScore = <div className='font-bold text-green-600'>+ {player.lastScore} </div>;
          } else {
            tempScore = <div className='font-bold text-red-600'> {player.lastScore} </div>;
          }

          return <li key={player._id} className='flex justify-between'>
            <div>
              {player.name}
            </div>
            <div className='flex gap-4'>
              {tempScore}  {player.score}
            </div>

          </li>;
        })}
      </ul>
    </div >
  );
}