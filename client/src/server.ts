import { Event } from "./event";

/** Type of callback that receives the list of file names */
export type ListCallback = (events: Event[]) => void;

/**
 * Accesses /names server endpoint and receives current list of files
 * as a record: {names: string[]}.
 * Passes list of names to the given callback.
 * @param cb callback that accepts a string[] of file names as its param.
 *           Called when server response is received and parsed.
 */
export const listEvents = (cb: ListCallback): void => {
    fetch("/api/getEvt")
        .then((res) => doListResp(res, cb))
        .catch(() => doListError("failed to connect to server"));
};

/**
 * Determines whether the given value is a record.
 * @param val the value in question
 * @return true if the value is a record and false otherwise
 */
export const isRecord = (val: unknown): val is Record<string, unknown> => {
    return val !== null && typeof val === "object";
};

/** Type of callback for adding event */
export type AddCallback = () => void;

/**
 * Accesses /names server endpoint and receives current list of files
 * as a record: {names: string[]}.
 * Passes list of names to the given callback.
 * @param cb callback that accepts a string[] of file names as its param.
 *           Called when server response is received and parsed.
 */
export const addEvent = (e: Event, cb: AddCallback): void => {
    fetch("/api/add", {
        method: 'POST', body: JSON.stringify(e),
        headers: { 'Content-Type': 'application/json' }
    })
        .then((res) => doAddResp(res, cb))
        .catch(() => doAddError("failed to connect to server"));
};

/** Type of callback for adding event */
export type GetTktsCallback = () => void;

/**
 * Accesses /names server endpoint and receives current list of files
 * as a record: {names: string[]}.
 * Passes list of names to the given callback.
 * @param cb callback that accepts a string[] of file names as its param.
 *           Called when server response is received and parsed.
 */
export const getTickets = (sport: string, event: string, name: string, numOfTickets: number, cb: AddCallback): void => {
    fetch("/api/getTkt", {
        method: 'POST', body: JSON.stringify({ sport: sport, event: event, name: name, numTkets: numOfTickets }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then((res) => doGetTktResp(res, cb))
        .catch(() => doGetTktError("failed to connect to server"));
};

/**
 * Called when the new question response JSON has been parsed.
 * @param val is the array of events
 * @param cb callback that accepts a string[] of file names as its param.
 */
const doListJson = (val: unknown, cb: ListCallback): void => {
    if (!isRecord(val) || !Array.isArray(val.elems)) {
        console.error('Invalid data from /api/getEvt', val);
        return;
    }

    const events: Event[] = [];
    try {
        for (const e of val.elems) {
            events.push(e);
        }
    } catch {
        console.error('Error occurred on getting events from server!');
        return;
    }

    cb(events);
};

/**
 * Called when the server responds with to a request for the file names.
 * @param res object to send response with
 * @param cb callback that accepts a string[] of file names as its param.
 *           Called when server response is received and parsed.
 */
const doListResp = (res: Response, cb: ListCallback): void => {
    if (res.status === 200) {
        res.json().then((val) => doListJson(val, cb))
            .catch(() => doListError("200 response is not JSON"));
    } else if (res.status === 400) {
        res.text().then(doListError)
            .catch(() => doListError("400 response is not text"));
    } else {
        doListError(`bad status code: ${res.status}`);
    }
};

/**
 * Called if an error occurs trying to save the file
 * @param msg is the message to display in details
 */
const doListError = (msg: string): void => {
    console.error(`Error fetching /api/getEvt: ${msg}`);
};

/**
 * Called when the new question response JSON has been parsed.
 * @param val is the array of events
 * @param cb callback that accepts a string[] of file names as its param.
 */
const doAddJson = (val: unknown, cb: AddCallback): void => {
    if (!isRecord(val) || val.msg !== 'ok') {
        console.error('Invalid JSON from /api/getTkt', val);
        return;
    }

    cb();
};

/**
 * Called when the server responds with to a request for the file names.
 * @param res object to send response with
 * @param cb callback that accepts a string[] of file names as its param.
 *           Called when server response is received and parsed.
 */
const doAddResp = (res: Response, cb: AddCallback): void => {
    if (res.status === 200) {
        res.json().then((val) => doAddJson(val, cb))
            .catch(() => doAddError("200 response is not JSON"));
    } else if (res.status === 400) {
        res.text().then(doAddError)
            .catch(() => doAddError("400 response is not text"));
    } else {
        doAddError(`bad status code: ${res.status}`);
    }
};

/**
 * Called if an error occurs trying to save the file
 * @param msg is the message to display in details
 */
const doAddError = (msg: string): void => {
    console.error(`Error fetching /api/add: ${msg}`);
};

/**
 * Called when the new question response JSON has been parsed.
 * @param val is the array of events
 * @param cb callback that accepts a string[] of file names as its param.
 */
const doGetTktJson = (val: unknown, cb: AddCallback): void => {
    if (!isRecord(val) || val.msg !== 'ok') {
        console.error('Invalid JSON from /api/getTkt', val);
        return;
    }

    cb();
};

/**
 * Called when the server responds with to a request for the file names.
 * @param res object to send response with
 * @param cb callback that accepts a string[] of file names as its param.
 *           Called when server response is received and parsed.
 */
const doGetTktResp = (res: Response, cb: AddCallback): void => {
    if (res.status === 200) {
        res.json().then((val) => doGetTktJson(val, cb))
            .catch(() => doGetTktError("200 response is not JSON"));
    } else if (res.status === 400) {
        res.text().then(doAddError)
            .catch(() => doGetTktError("400 response is not text"));
    } else {
        doGetTktError(`bad status code: ${res.status}`);
    }
};

/**
 * Called if an error occurs trying to save the file
 * @param msg is the message to display in details
 */
const doGetTktError = (msg: string): void => {
    console.error(`Error fetching /api/getTkt: ${msg}`);
};