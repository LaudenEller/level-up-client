import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getGame } from "./GameManager"

export const Game = () => {
    const [game, setGame] = useState()
    const { gameId } = useParams()

    useEffect(() => {
        getGame(gameId)
            .then((data) => {
                setGame(data)
            })
    },
        [])

    const history = useHistory()

    return (
        <>
            <div className='game-container'>
                <div className="game-title">Title: {game?.title}</div>
                <div className="game-maker">Maker: {game?.maker}</div>
                <div className="game-number_of_players">Number of Players: {game?.number_of_players}</div>
                <div className="game-skill_level">Skill Level: {game?.skill_level}</div>
                <div className="game-game_type">Game Type: {game?.game_type.label}</div>
            </div>
            <button onClick={() => history.push({ pathname: `./new/${gameId}` })}>Update Game</button>
        </>)
}