import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createEvent } from "./EventManager"
import { getGames } from "../game/GameManager"



export const EventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        description: "",
        date: "",
        time: "",
        game_id: 0
    })

    useEffect(() => {getGames().then((d) => setGames(d))
    }, [])

    const changeEventState = (domEvent) => {
        const copy = { ...currentEvent }
            copy[domEvent.target.name] = domEvent.target.value
            setCurrentEvent(copy)
    }

    return (
        <form className="EventForm">
            <h2 className="EventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="game">Game: 
                    <select value={currentEvent.game_id} name="game_id" onChange={changeEventState}>
                    <option value ="0">What Game was Played?</option>
                    {games?.map(g => <option key={g.id} value={g.id}>{g.title}</option>)}
                    </select>
                    </label>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    // property of event === column in model on server side, value === properties in useState
                    const event = {
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        game: parseInt(currentEvent.game_id)
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}