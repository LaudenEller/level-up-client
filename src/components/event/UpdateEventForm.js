import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { getGames } from "../game/GameManager"
import { getEvent, updateEvent } from "./EventManager"



export const UpdateEventForm = () => {
    const history = useHistory()
    const { eventId } = useParams()
    const [games, setGames] = useState()
    const [event, setEvent] = useState({})
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    
    useEffect(() => {
        getGames().then((d) => setGames(d))
    }, [])

    useEffect(() => {
        getEvent(eventId).then((d) => setEvent(d))
    }, [eventId]) // INSQ: Why is it observing the route parameter?

    const changeEventState = (domEvent) => {
        const copy = { ...event }
            copy[domEvent.target.name] = domEvent.target.value
            setEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Update event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={event.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={event.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={event.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="games">games: 
                    <select value={event.game} name="game" onChange={changeEventState}>
                    <option value ="0">What games was Played?</option>
                    {games?.map(g => <option key={g.id} value={g.id}>{g.title}</option>)}
                    </select>
                    </label>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const updatedEvent = {
                        description: event.description,
                        date: event.date,
                        time: event.time,
                        game: parseInt(event.game),
                        id: parseInt(event.id)
                    }

                    // Send POST request to your API
                    updateEvent(updatedEvent)
                        .then(() => history.push(`/events/${eventId}`))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}