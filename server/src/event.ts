export type Event = {
    event: string; // the event info
    sport: string; // the name of the sport
    description: string; // the description of the event
    date: number; // Should always between 1 and 31 (in real apps)
    venue: string; // the venue for the event
    maxAvabTicket: number; // the number of maximum available tickets
    soldTicket: number; // the sold ticket number (should always between 0 and maxAvabTicket)
}

/**
 * Get the availability of a given Event
 *      If the event has no ticket available, return "SOLD OUT"
 *      Otherwise, return the number of available tickets
 * @param e the event for displaying the info
 */
export const getAvab = (e: Event): string => {
    switch (e.maxAvabTicket - e.soldTicket) {
        case 0: return "SOLD OUT";
        case 1: return "1 ticket"; // for grammar purposes
        default: return `${e.maxAvabTicket - e.soldTicket} tickets`;
    }
}

/**
 * Returns a string representation of event in "HomePage"
 * @param e the event for displaying the info
 */
export const displayEventInfo = (e: Event): string => {
    return `${e.event} (${e.sport}) | ${getAvab(e)} | Aug. ${e.date}, 2024`;
}

/**
 * Returns a string representation of event for sales ranking
 * @param e the event for displaying the sales ranking info
 */
export const displaySalesRankingInfo = (e: Event): string => {
    return `${e.event} (${e.sport}) - ${e.soldTicket} sold`;
}