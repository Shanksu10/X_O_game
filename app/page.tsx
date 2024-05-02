"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Cell from './components/Cell';

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
export default function Home() {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [go, setGo] = useState("O");
  const [winningMessage, setWinningMessage] = useState("");
  useEffect(() => {
    winningCombos.forEach((combo) => {
      const circleWins = combo.every((cell) => cells[cell] === "O");
      const crossWins = combo.every((cell) => cells[cell] === "X");
      if(circleWins){
        setWinningMessage("O WINS !")
      } else if (crossWins){
        setWinningMessage("X WINS !")
      }
    })
  }, [cells, winningMessage]);

  useEffect(()=>{
    if(cells.every((cell)=> cell !== "") && !winningMessage){
      setWinningMessage("DRAW !");
    }
  }, [cells, winningMessage]);

  return (
    <div className='container'>
      <h1>Tic-Tac-Toe</h1>
      <div className='gameboard'>
        {
          cells.map(
            (cell, index) => <Cell id={index} go={go} setGo={setGo} key={index} cells={cells} setCells={setCells} cell={cell} winningMessage={winningMessage}/>
          )
        }
      </div>
      <div className='turnMessage'>{!winningMessage && `Now its ${go} turn !`}</div>
      <div className='winningMessage'>{winningMessage}</div>
    </div>
  )
}
