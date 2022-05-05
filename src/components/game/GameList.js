import React, { useEffect, useState } from "react"
import { deleteGame, getGames } from "./GameManager.js"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"

export const GameList = () => {
    const [ games, setGames ] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const history = useHistory()

    const DeleteGame = (id) => {
        deleteGame(id).then(() => Update())
    }
    
    const Update = () => {
        getGames().then(data => setGames(data))
    }

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
        history.push({ pathname: "/games/new" })
    }}
>Register New Game</button>
        <article className="games">
            {
                games.map(game => {
                    return <>
                    <Link to={`/games/${game.id}`} key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                    </Link>
                    <button className="gameList-button" onClick={() => {DeleteGame(game.id)}}>Delete</button>
                    </>
                })
            }
        </article>
        </>
    )
}