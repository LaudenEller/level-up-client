import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager"
import { useHistory } from "react-router-dom"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

const history = useHistory()

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
        history.push({ pathname: "/events/new" })
    }}
>Register New Event</button>
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">A game of {event.game.title}</div>
                        <div className="event__date">was played on {event.date} at {event.time}</div>
                    </section>
                })
            }
        </article>
        </>
    )
}