"use client"
import { useState } from "react";
import { Chess } from 'chess.js';
import { Chessboard } from "react-chessboard";

export default function playGame() {
  const [game, setGame] = useState(new Chess());

  function makeAMove(move) {
    const gameCopy = new Chess(game.fen());
    const result = gameCopy.move(move);
    
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function onDrop(sourceSquare, targetSquare) {
    try {
      const move = makeAMove({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      if (move === null) return false;
      return true;
    }
    catch {
      return false;
    }
  }

  return <Chessboard position={game.fen()} onPieceDrop={onDrop} boardWidth={600}/>;
}