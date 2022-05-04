import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { updateGame, getGame } from './GameManager.js'
import { getGameTypes } from "../gametype/GametypeManager.js"


export const UpdateForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const { gameId } = useParams()
    const [game, setGame] = useState({})
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    
    // Render a form with values conditionally set to state
    // fetch the data from server, update state

    useEffect(() => {getGameTypes().then((d) => setGameTypes(d))
    }, [])
    
    useEffect(() => {
        getGame(gameId).then((d) => setGame(d))
    }, [gameId]) // INSQ: Why is it observing the route parameter?

    const changeGameState = (domEvent) => {
        const copy = { ...game }
            copy[domEvent.target.name] = domEvent.target.value
            setGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={game.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={game.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <input type="text" name="number_of_players" required autoFocus className="form-control"
                        value={game.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="text" name="skill_level" required autoFocus className="form-control"
                        value={game.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="game_type">Game Type: 
                    <select value={game.game_type} name="game_type" onChange={changeGameState}>
                    <option value ="0">What Type of Game is this?</option>
                    {gameTypes?.map(gt => <option key={gt.id} value={gt.id}>{gt.label}</option>)}
                    </select>
                    </label>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const updatedGame = {
                        maker: game.maker,
                        title: game.title,
                        number_of_players: parseInt(game.number_of_players),
                        skill_level: game.skill_level,
                        game_type: parseInt(game.game_type),
                        id: parseInt(game.id)
                    }

                    // Send POST request to your API
                    updateGame(updatedGame)
                        .then(() => history.push(`/games/${gameId}`))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}