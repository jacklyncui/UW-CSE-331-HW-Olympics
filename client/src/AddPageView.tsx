import React, { ChangeEvent } from "react";
import { Component } from "react";
import { Event } from "./event";

type AddPageProps = {
    onBackClicked: () => void;
    onCreateClicked: (e: Event) => void;
};

type AddPageState = {
    event: string; // the event info
    sport: string; // the name of the sport
    description: string; // the description of the event
    date: number; // Should always between 1 and 31
    venue: string; // the venue for the event
    maxAvabTicket: number; // the number of maximum available tickets, should strictly greater than 0
};

export class AddPageView extends Component<AddPageProps, AddPageState> {

    constructor(props: AddPageProps) {
        super(props);

        this.state = {
            event: "",
            sport: "",
            description: "",
            date: 1,
            venue: "",
            maxAvabTicket: 1
        };
    }


    render = (): JSX.Element => {
        return <div>
            <h3>Add Event</h3>
            <form id="new-event">
                {
                    // TODO: Check if there's a better way to implement
                }
                <div>Event: <input name="event" onChange={this.doEventNameChange}></input></div>
                <div>Sport: <input name="sport" onChange={this.doSportNameChange}></input></div>
                <div>Description: <input name="description" onChange={this.doDescriptionChange}></input></div>
                <div>Date: August <input name="date" onChange={this.doDateChange} type="number" max="31" min="1" defaultValue="1"></input>, 2024</div>
                <div>Venue: <input name="description" onChange={this.doVenueChange}></input></div>
                <div>Max Tickets Available: <input name="maxAvabTicket" onChange={this.doMaxAvabTicketChange} type="number" min="1" defaultValue="1"></input></div>

            </form>
            <br />
            <div className="buttons">
                <button onClick={this.doBackClick} style={{ marginRight: 10 }}>Back</button>
                <button onClick={this.doCreateClick}>Create</button>
            </div>
        </div>;
    }

    /**
     * Handler for changing the texts in <input> for event
     * @param evt is the event triggered by user
     */
    doEventNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ event: evt.target.value });
    }

    /**
     * Handler for changing the texts in <input> for sport name
     * @param evt is the event triggered by user
     */
    doSportNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ sport: evt.target.value });
    }

    /**
     * Handler for changing the texts in <input> for description
     * @param evt is the event triggered by user
     */
    doDescriptionChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ description: evt.target.value });
    }

    /**
     * Handler for changing the texts in <input> for date
     * @param evt is the event triggered by user
     */
    doDateChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        try {
            this.setState({ date: Number(evt.target.value) });
        } catch {
            // it helps to catch the error in calling BigInt()
            this.setState({ date: -1 });
        }
    }

    /**
     * Handler for changing the texts in <input> for venue
     * @param evt is the event triggered by user
     */
    doVenueChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ venue: evt.target.value });
    }

    /**
     * Handler for changing the texts in <input> for max available tickets
     * @param evt is the event triggered by user
     */
    doMaxAvabTicketChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        try {
            this.setState({ maxAvabTicket: Number(evt.target.value) });
        } catch {
            // it helps to catch the error in calling BigInt()
            this.setState({ maxAvabTicket: -1 });
        }
    }


    /**
     * Event handler for go back
     */
    doBackClick = (): void => {
        this.props.onBackClicked();
    }

    /**
     * Event handler for "create" clicked 
     */
    doCreateClick = (): void => {
        if (this.state.event === '') {
            alert('Event name could not be empty!');
            return;
        } else if (this.state.sport === '') {
            alert('Sport name could not be empty!');
            return;
        } else if (this.state.date < 1 || this.state.date > 31) {
            alert('Please enter a valid date!');
            return;
        } else if (this.state.venue === '') {
            alert('Venue could not be empty!');
            return;
        } else if (this.state.maxAvabTicket <= 0) {
            alert('Please enter a valid number of tickets!');
            return;
        } else {
            try {
                BigInt(this.state.date);
            } catch {
                alert('Please enter a valid date!');
                return;
            }

            try {
                BigInt(this.state.maxAvabTicket);
            } catch {
                alert('Please enter a valid maxAvabTicket!');
                return;
            }
        }
        this.props.onCreateClicked({
            event: this.state.event,
            sport: this.state.sport,
            description: this.state.description,
            date: this.state.date,
            venue: this.state.venue,
            maxAvabTicket: this.state.maxAvabTicket,
            soldTicket: 0,
        });
    }
}