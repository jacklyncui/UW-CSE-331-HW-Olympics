import React, { ChangeEvent } from "react";
import { Component } from "react";
import { Event } from "./event";

type GetPageProps = {
    onBackClicked: () => void;
    onGetTicketsClicked: (sport: string, event: string, name: string, numOfTickets: number) => void;
    allEvents: Event[];
}

type GetTicketPageState = {
    displayedSport?: string;
    displayedEvent?: string;
    selectedEvent?: Event;
    name?: string;
    numTickets?: number;
};

export class GetTicketPageView extends Component<GetPageProps, GetTicketPageState> {

    constructor(props: GetPageProps) {
        super(props);

        this.state = {};
    }

    render = (): JSX.Element => {

        if (this.state.displayedSport === undefined) {
            return <div>
                <h3>Get Event Tickets</h3>
                <div>Sport: <select onChange={this.doSelectedSportChange} value="Select..">{this.doSportsListShowJson()}</select></div>
                <br />
                <div className="buttons">
                    <button onClick={this.props.onBackClicked} style={{ marginRight: 10 }}>Back</button>
                </div>
            </div>;
        }
        else if (this.state.displayedEvent === undefined) {
            return <div>
                <h3>Get Event Tickets</h3>
                <div>Sport: <select onChange={this.doSelectedSportChange}>{this.doSportsListShowJson()}</select></div>
                <div>Event: <select onChange={this.doSelectedEventChange} value="Select...">{this.doEventListShowJson(this.state.displayedSport)}</select></div>
                <br />
                <div className="buttons">
                    <button onClick={this.props.onBackClicked} style={{ marginRight: 10 }}>Back</button>
                </div>
            </div>;
        } else {
            return <div>
                <h3>Get Event Tickets</h3>
                <div>Sport: <select onChange={this.doSelectedSportChange}>{this.doSportsListShowJson()}</select></div>
                <div>Event: <select onChange={this.doSelectedEventChange}>{this.doEventListShowJson(this.state.displayedSport)}</select></div>
                {this.doShowEventDetailsJson()}
                <br />
                <div className="buttons">
                    <button onClick={this.doBackClick} style={{ marginRight: 10 }}>Back</button>
                    <button onClick={this.doGetTicketsClick}>Get Tickets</button>
                </div>
            </div>;
        }
    }

    /**
     * Returns all events for user to select
     * @param sportsName is the name of the selected sport
     * @returns An array of JSX.Element for selecting events in a list
     */
    doEventListShowJson = (sportName: string): JSX.Element[] => {
        const items: JSX.Element[] = [];

        items.push(<option>Select an Event from the list...</option>)

        for (const e of this.props.allEvents) {
            if (e.sport === sportName && e.maxAvabTicket - e.soldTicket > 0n) items.push(<option>{e.event}</option>);
        }

        return items;
    }

    /**
     * Returns all sports for user to select
     * @returns An array of JSX.Element for selecting sports in a list
     */
    doSportsListShowJson = (): JSX.Element[] => {
        const items: JSX.Element[] = [];

        items.push(<option>Select a Sport from the list...</option>)

        const allSportsName: string[] = [];

        for (const e of this.props.allEvents) {
            if (!allSportsName.includes(e.sport) && e.maxAvabTicket - e.soldTicket > 0n) allSportsName.push(e.sport);
        }

        for (const e of allSportsName) {
            items.push(<option>{e}</option>);
        }

        return items;
    }

    /**
     * Helper for displaying the details of the event
     * @returns A JSX.Element for details for the event as a whole <div> element
     */
    doShowEventDetailsJson = (): JSX.Element => {
        if (this.state.selectedEvent === undefined) {
            return <div>Impossible! Here selectedEvent must NOT be undefined!</div>;
        }
        return <div className="event-details">
            <div>Description: {this.state.selectedEvent.description}</div>
            <div>Date: Aug. {this.state.selectedEvent.date.toString()}, 2024</div>
            <div>Venue: {this.state.selectedEvent.venue}</div>
            <div>Tickets Available: {(this.state.selectedEvent.maxAvabTicket - this.state.selectedEvent.soldTicket).toString()} / {this.state.selectedEvent.maxAvabTicket.toString()}</div>
            <div>Name: <input name="user-name" onChange={this.doUserNameChange} ></input></div>
            <div>Number of Tickets: <input name="num-tickets" onChange={this.doNumTicketsChange} type="number" min="1" max={Number(this.state.selectedEvent.maxAvabTicket - this.state.selectedEvent.soldTicket)}></input></div>
        </div>;
    }

    /**
     * Handler for changing the number of tickets in <input> for number of tickets
     * @param evt is the event triggered by user
     */
    doNumTicketsChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        try {
            this.setState({ numTickets: Number(evt.target.value) });
        } catch {
            // it helps to catch the error in calling BigInt()
            this.setState({ numTickets: -1 });

        }
    }

    /**
     * Handler for changing the texts in <input> for name
     * @param evt is the event triggered by user
     */
    doUserNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ name: evt.target.value });
    }

    /**
     * Handler for changing the selection in <select> for sport
     */
    doSelectedSportChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
        if (evt.target.value === 'Select a Sport from the list...') {
            this.setState({
                displayedSport: undefined,
                displayedEvent: undefined,
                selectedEvent: undefined,
                name: undefined,
                numTickets: undefined
            });
            return;
        }
        this.setState({
            displayedSport: evt.target.value,
            displayedEvent: undefined,
            selectedEvent: undefined,
            name: undefined,
            numTickets: undefined
        });
    }

    /**
     * Find the event info based on sport name and event
     */
    doFindEventFromJson = (sport: string, event: string): Event | undefined => {
        for (const e of this.props.allEvents) {
            if (e.event === event && e.sport === sport) {
                return e;
            }
        }
        return undefined;
    }

    /**
     * Handler for changing the selection in <select> for event
     */
    doSelectedEventChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
        if (evt.target.value === 'Select an Event from the list...') {
            this.setState({
                displayedEvent: undefined,
                selectedEvent: undefined,
                name: undefined,
                numTickets: undefined
            });
            return;
        }
        if (this.state.displayedSport === undefined) {
            alert('Impossible! displayed sport must not be undefined now');
            return;
        }
        const e: Event | undefined = this.doFindEventFromJson(this.state.displayedSport, evt.target.value);
        this.setState({
            displayedEvent: evt.target.value,
            selectedEvent: e,
            name: undefined,
            numTickets: undefined
        });
    }

    /**
     * Handler for clicking on "Back"
     */
    doBackClick = (): void => {
        this.props.onBackClicked();
    }

    /**
     * Handler for clicking on "Get Tickets"
     */
    doGetTicketsClick = (): void => {
        if (this.state.displayedSport === undefined || this.state.displayedEvent === undefined) {
            alert('Impossible! The sport or event must not be empty!'); // make compiler happy
            return;
        } else if (this.state.name === undefined || this.state.name === '') {
            alert('Please enter your name!');
            return;
        } else if (this.state.numTickets === undefined) {
            alert('Please enter the number of tickets you wish to get!');
            return;
        } else if (this.state.selectedEvent === undefined) {
            alert('Inpossible! The selectedEvent must NOT be undefined!');
            return;
        } else if (this.state.numTickets <= 0 || this.state.numTickets > this.state.selectedEvent.maxAvabTicket - this.state.selectedEvent.soldTicket) {
            alert('Please enter a valid number of tickets you wish to get!');
            return;
        } else {
            try {
                BigInt(this.state.numTickets);
            } catch {
                alert('Please enter a valid number of tickets!');
                return;
            }
        }
        this.props.onGetTicketsClicked(this.state.displayedSport, this.state.displayedEvent, this.state.name, this.state.numTickets);
    }

}