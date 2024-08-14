import React from "react";
import { Component } from "react";
import { displayEventInfo, displaySalesRankingInfo, Event } from "./event";

type HomePageProps = {
    onAddEventClicked: () => void;
    onGetTicketClicked: () => void;
    onRefreshClicked: () => void;
    listEvents: Event[];
};

type HomePageState = {
};

export class HomePageView extends Component<HomePageProps, HomePageState> {

    constructor(props: HomePageProps) {
        super(props);

        this.state = {};
    }

    render = (): JSX.Element => {
        return <div>
            <h3>Olympic Event List</h3>
            <ul>{this.getUpcomingEvents()}</ul>
            <div>{this.getRanking()}</div>
            <br />
            <div className="buttons">
                <button onClick={this.doAddEventClick} style={{ marginRight: 10 }}>Add Event</button>
                <button onClick={this.doGetTicketClick} style={{ marginRight: 10 }}>Get Tickets</button>
                <button onClick={this.doRefreshClick}>Refresh</button>
            </div>
        </div>;
    }

    /**
     * Event handler for adding event
     */
    doAddEventClick = (): void => {
        this.props.onAddEventClicked();
    }

    /**
     * Event handler for getting ticket
     */
    doGetTicketClick = (): void => {
        this.props.onGetTicketClicked();
    }

    /**
     * Event handler for refreshing the page
     */
    doRefreshClick = (): void => {
        this.props.onRefreshClicked();
    }


    /**
     * The list of all upcoming events
     * @returns a JSX.Element array - as the list of all upcoming events in chronological order
     */
    getUpcomingEvents = (): JSX.Element[] => {
        const filteredEvents: Event[] = [];

        for (const e of this.props.listEvents) {
            if (e.date >= 1n) { // assume the date today is Aug 1st, as spec given
                filteredEvents.push(e);
            }
        }

        filteredEvents.sort((a: Event, b: Event) => Number(a.date - b.date)); // sort the events in chronological order

        const items: JSX.Element[] = [];
        for (const e of this.props.listEvents) {
            items.push(<li>{displayEventInfo(e)}</li>);
        }

        return items;
    }

    /**
     * Get the sale ranking of upcomping events
     * @returns a JSX.Element array - the list of sale ranking for upcoming events (only gold, silver, bronze)
     */
    getRanking = (): JSX.Element => {
        const sortedRanking: Event[] = [];

        // make a deep copy of data from listEvents
        for (const e of this.props.listEvents) {
            sortedRanking.push(e);
        }

        sortedRanking.sort((a: Event, b: Event) => Number(b.soldTicket - a.soldTicket));

        // the returned value based on the length of sortedRanking
        switch (sortedRanking.length) {
            case 0:
                return <div>
                    Wow! There is no sport right now!
                </div>;
            case 1:
                return <div>
                    Ranking:
                    <br />
                    <ul>
                        <li>Gold: {displaySalesRankingInfo(sortedRanking[0])}</li>
                        <li>Silver: N/A</li>
                        <li>Bronze: N/A</li>
                    </ul>
                </div>;
            case 2:
                return <div>
                    Ranking:
                    <br />
                    <ul>
                        <li>Gold: {displaySalesRankingInfo(sortedRanking[0])}</li>
                        <li>Silver: {displaySalesRankingInfo(sortedRanking[1])}</li>
                        <li>Bronze: N/A</li>
                    </ul>
                </div>;
            default:
                return <div>
                    Ranking:
                    <br />
                    <ul>
                        <li>Gold: {displaySalesRankingInfo(sortedRanking[0])}</li>
                        <li>Silver: {displaySalesRankingInfo(sortedRanking[1])}</li>
                        <li>Bronze: {displaySalesRankingInfo(sortedRanking[2])}</li>
                    </ul>
                </div>;
        }
    }

}