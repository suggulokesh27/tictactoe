import React, { useState } from "react";
import Square from "./Square";


const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isNext, setIsNext] = useState(true);
    const [statusDiclared, setStatusDiclared] = useState(false);

    const handlerSquare = (index) => {
        const newSquare = [...squares];
        if (calculateWinner(newSquare) || newSquare[index]) {
            return;
        }
        newSquare[index] = isNext ? "X" : "O";
        setSquares(newSquare);
        setIsNext(!isNext);
    }

    const winner = calculateWinner(squares);
    const status = winner ? (winner === "Try Again") ? "Draw": `Congratulation : ${winner}` : `${isNext ? "First Player : X" : "Second player : O"}`

    const resetHandler = () => {
        const newSquare = Array(9).fill(null);
        setSquares(newSquare);
        setIsNext(true);
        return "try Again"
    }

    return (
        <div style={{"display" : "flex", "flexDirection" : "column", "color": "white","width" : "100%"}}>
            <div style={{"display" : "flex", "fontSize" : "20px", padding: "0 10px",borderRadius:"7px",
            background:`${(status=== "Draw" || status.includes("Congratulation")) ? "white" : ""}`
            ,color:`${(status=== "Draw" || status.includes("Congratulation")) ? "black" : ""}`}}>{status}</div>
            <div>{
                squares.map((square, index) => (
                    <Square key={index} onClick={() => handlerSquare(index)} value={square} />
                ))
            }
            </div>
            <button style={{"width" : "100px"}} onClick={resetHandler}>Reset</button>
        </div>
    )
}

const calculateWinner = (square) => {
    if(square[0] === square[1] && square[1] === square[2]){
        return square[0];
    }
    if(square[3] === square[4] && square[4] === square[5]){
        return square[3];
    }
    if(square[6] === square[7] && square[7] === square[8]){
        return square[6];
    }
    if(square[0] === square[3] && square[3] === square[6]){
        return square[0];
    }
    if(square[1] === square[4] && square[4] === square[7]){
        return square[1];
    }
    if(square[2] === square[5] && square[5] === square[8]){
        return square[2];
    }
    if(square[0] === square[4] && square[4] === square[8]){
        return square[0];
    }
    if(square[2] === square[4] && square[4] === square[6]){
        return square[2];
    }
    if(!square.includes(null)){
        return "Try Again";
    }
}

export default Board;