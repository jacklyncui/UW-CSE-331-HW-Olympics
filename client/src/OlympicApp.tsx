import React from "react";
import { Component } from "react";
import { HomePageView } from "./HomePageView";
import { AddPageView } from "./AddPageView";
import { GetTicketPageView } from "./GetPageView";
import { Event } from "./event";
import { addEvent, getTickets, listEvents } from "./server";

type Page = "Homepage" | "AddEvent" | "GetTicket";

type OlympicAppState = {
  page: Page;
  listEvents: Event[];
}

/** Displays the UI of the Wedding rsvp application. */
export class OlympicApp extends Component<{}, OlympicAppState> {

  constructor(props: {}) {
    super(props);

    this.state = { page: "Homepage", listEvents: [] };
  }

  componentDidMount = (): void => {
    listEvents(this.doListEventsJson);
  };

  render = (): JSX.Element => {


    switch (this.state.page) {
      case "Homepage":
        return <HomePageView onAddEventClicked={this.doHomePageAddEventClick} onGetTicketClicked={this.doHomePageGetTicketsClick} onRefreshClicked={this.doBackClick} listEvents={this.state.listEvents} />;
      case "AddEvent":
        return <AddPageView onBackClicked={this.doBackClick} onCreateClicked={this.doCreateEventClick} />;
      case "GetTicket":
        if (this.state.listEvents.length === 0) {
          alert('No Sport Available Yet! Cannot get tickets!');
          this.setState({ page: "Homepage" });
        } else if (this.doAvlbCheckBeforeClick()) {
          alert('All events\' tickets are sold out! Cannot get tickets!');
          this.setState({ page: "Homepage" });
        }
        return <GetTicketPageView onBackClicked={this.doBackClick} onGetTicketsClicked={this.doGetTicketsClick} allEvents={this.state.listEvents} />;
    }
  };

  /**
   * Checks if there is any ticket left
   *    if there is availability, return false
   *    otherwise return true
   * @returns a boolean indicating if there is availability left
   */
  doAvlbCheckBeforeClick = (): boolean => {
    for (const e of this.state.listEvents) {
      if (e.soldTicket !== e.maxAvabTicket) return false;
    }
    return true;
  }

  /**
   * Invoked when either
   *    1) "Back" button on "AddEvent" or "GetTicket" page was clicked
   *    2) Refresh button on the homepage was clicked
   */
  doBackClick = (): void => {
    listEvents(this.doListEventsJson);
    this.setState({ page: "Homepage" });
  }

  /**
   * Invoked when "Add Event" was clicked on "Homepage"
   */
  doHomePageAddEventClick = (): void => {
    this.setState({ page: "AddEvent" });
  }

  /**
   * Invoked when "Get Tickets" was clicked on "Homepage"
   */
  doHomePageGetTicketsClick = (): void => {
    this.setState({ page: "GetTicket" });
  }

  /**
   * Invoked when "Get Tickets" was clicked on "GetTicket" page
   */
  doGetTicketsClick = (sport: string, event: string, name: string, numOfTickets: number): void => {
    getTickets(sport, event, name, numOfTickets, this.doBackClick);
  }

  /**
   * Invoked when "Create" was clicked on "AddEvent" page
   * @param e is the event needs to be created
   */
  doCreateEventClick = (e: Event): void => {
    addEvent(e, this.doBackClick);
  }

  /**
   * Updates all list files as the callback
   * @param names names to be stored in the state
   */
  doListEventsJson = (events: Event[]): void => {
    this.setState({ listEvents: events });
  };
}
