import React from "react"
import { Route } from "react-router-dom"
import { Event } from "./event/Event.js"
import { EventForm } from "./event/EventForm.js"
import { EventList } from "./event/EventList.js"
import { UpdateEventForm } from "./event/UpdateEventForm.js"
import { Game } from "./game/Game.js"
import { GameForm } from "./game/GameForm.js"
import { GameList } from "./game/GameList.js"
import { UpdateForm } from "./game/UpdateForm.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/games/:gameId(\d+)">
            <Game />
            </Route>
            <Route exact path="/events/:eventId(\d+)">
            <Event />
            </Route>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>
            <Route exact path="/games/new/:gameId(\d+)">
                <UpdateForm />
            </Route>
            <Route exact path="/events/new/:eventId(\d+)">
                <UpdateEventForm />
            </Route>

        </main>
    </>
}
