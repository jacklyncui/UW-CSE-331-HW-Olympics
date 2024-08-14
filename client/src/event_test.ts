import * as assert from "assert";
import { displayEventInfo, displaySalesRankingInfo, Event, getAvab } from "./event";

describe('event', function () {

    it('getAvab', function () {
        // case 1 - no ticket available - test 1
        const e1_1: Event = {
            event: "Event 1.1",
            sport: "idk",
            description: "some des here",
            date: 10,
            venue: "where?",
            maxAvabTicket: 0,
            soldTicket: 0
        };
        assert.deepStrictEqual(getAvab(e1_1), "SOLD OUT");

        // case 1 - no ticket available - test 2
        const e1_2: Event = {
            event: "Event 1.2",
            sport: "some other stuff",
            description: "des here",
            date: 25,
            venue: "where?",
            maxAvabTicket: 15,
            soldTicket: 15
        };
        assert.deepStrictEqual(getAvab(e1_2), "SOLD OUT");

        // case 2 - only one ticket available - test 1
        const e2_1: Event = {
            event: "Event 2.1",
            sport: "idk",
            description: "some des here",
            date: 10,
            venue: "where?",
            maxAvabTicket: 1,
            soldTicket: 0
        };
        assert.deepStrictEqual(getAvab(e2_1), "1 ticket");

        // case 2 - only one ticket available - test 2
        const e2_2: Event = {
            event: "Event 2.2",
            sport: "some other stuff",
            description: "des here",
            date: 25,
            venue: "where?",
            maxAvabTicket: 15,
            soldTicket: 14
        };
        assert.deepStrictEqual(getAvab(e2_2), "1 ticket");

        // case 3 - only one ticket available - test 1
        const e3_1: Event = {
            event: "Event 3.1",
            sport: "idk",
            description: "some des here",
            date: 10,
            venue: "where?",
            maxAvabTicket: 2,
            soldTicket: 0
        };
        assert.deepStrictEqual(getAvab(e3_1), "2 tickets");

        // case 3 - some more tickets available - test 2
        const e3_2: Event = {
            event: "Event 3.2",
            sport: "some other stuff",
            description: "des here",
            date: 25,
            venue: "where?",
            maxAvabTicket: 15,
            soldTicket: 10
        };
        assert.deepStrictEqual(getAvab(e3_2), "5 tickets");
    });

    it('displayEventInfo', function () {
        // straight line code - test 0
        const e0: Event = {
            event: "Event 0",
            sport: "what is this",
            description: "some des here",
            date: 6,
            venue: "where?",
            maxAvabTicket: 5,
            soldTicket: 5
        };
        assert.deepStrictEqual(displayEventInfo(e0), "Event 0 (what is this) | SOLD OUT | Aug. 6, 2024");

        // straight line code - test 1
        const e1: Event = {
            event: "Event 1",
            sport: "idk",
            description: "some des here",
            date: 10,
            venue: "where?",
            maxAvabTicket: 1,
            soldTicket: 0
        };
        assert.deepStrictEqual(displayEventInfo(e1), "Event 1 (idk) | 1 ticket | Aug. 10, 2024");

        // straight line code - test 2
        const e2: Event = {
            event: "Event 2",
            sport: "some other stuff",
            description: "des here",
            date: 25,
            venue: "where?",
            maxAvabTicket: 15,
            soldTicket: 10
        };
        assert.deepStrictEqual(displayEventInfo(e2), "Event 2 (some other stuff) | 5 tickets | Aug. 25, 2024");
    });

    it('displaySalesRankingInfo', function () {
        // straight line code - test 0
        const e0: Event = {
            event: "Event 0",
            sport: "what is this",
            description: "some des here",
            date: 6,
            venue: "where?",
            maxAvabTicket: 5,
            soldTicket: 5
        };
        assert.deepStrictEqual(displaySalesRankingInfo(e0), "Event 0 (what is this) - 5 sold");

        // straight line code - test 1
        const e1: Event = {
            event: "Event 1",
            sport: "idk",
            description: "some des here",
            date: 10,
            venue: "where?",
            maxAvabTicket: 1,
            soldTicket: 0
        };
        assert.deepStrictEqual(displaySalesRankingInfo(e1), "Event 1 (idk) - 0 sold");

        // straight line code - test 2
        const e2: Event = {
            event: "Event 2",
            sport: "some other stuff",
            description: "des here",
            date: 25,
            venue: "where?",
            maxAvabTicket: 15,
            soldTicket: 10
        };
        assert.deepStrictEqual(displaySalesRankingInfo(e2), "Event 2 (some other stuff) - 10 sold");
    });
});