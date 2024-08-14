import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { Event } from "./event";


// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check

// The array for event list
const eventList: Event[] = [];

/**
 * Get event info from event from server
 * Note that this is a GET request!
 * @param req request to respond to
 * @param res object to send response with
 */
export const getAllEvents = (_req: SafeRequest, res: SafeResponse): void => {
  res.status(200).send({ elems: eventList });
}

/**
 * Get tickets from event from server
 * Note that this is a POST request!
 * @param req request to respond to
 * @param res object to send response with
 */
export const getTkt = (req: SafeRequest, res: SafeResponse): void => {
  // although we've done input check in the client side, we should also do the input check from server side
  // as the user may "inject" bad data to our server
  if (eventList.length === 0) {
    res.status(400).send('No Sport Available Yet! Cannot get tickets!');
    return;
  } else if (doAvlbCheckBeforeClick()) {
    res.status(400).send('All events\' tickets are sold out! Cannot get tickets!');
    return;
  }

  const sport = req.body.sport;
  const event = req.body.event;
  const name = req.body.name;
  const numTkets = req.body.numTkets;
  if (typeof sport !== 'string' || sport === '') {
    res.status(400).send('Invalid type on required parameter \'sport\' or the parameter is empty!');
    return;
  } else if (typeof event !== 'string' || event === '') {
    res.status(400).send('Invalid type on required parameter \'event\' or the parameter is empty!');
    return;
  } else if (typeof name !== 'string' || name === '') {
    res.status(400).send('Invalid type on required parameter \'name\' or the parameter is empty!');
    return;
  } else if (typeof numTkets !== 'number') {
    res.status(400).send('Invalid type on required parameter \'numTkets\' or the parameter is missing!');
    return;
  }

  // Check if there is a event with that sport and event
  let evt: Event | undefined = undefined;
  // Inv: evt = findEvent(eventList, 0, i)
  //    That is, if there is a event with same sport and event in the eventList array
  //    evt would become that event; if there is no event with same sport and event,
  //    evt would be undefined
  for (const _e of eventList) {
    if (_e.sport === sport && _e.event === event) {
      evt = _e;
    }
  }

  if (evt === undefined) {
    res.status(400).send('No such event!');
    return;
  }

  // special handling for BigInt typed data - numTketsStr
  try {
    if (BigInt(numTkets) < 1n || BigInt(numTkets) > evt.maxAvabTicket - evt.soldTicket) {
      throw new Error('Invalid Number of Tickets!');
    }
  } catch {
    // It is expected that the error above would be caught by this [ catch ]
    // Meanwhile, it helps to catch the error in calling BigInt()
    res.status(400).send('The given parameter \'numTkets\' is invalid!');
    return;
  }

  for (const _e of eventList) {
    if (evt.sport === _e.sport && evt.event === _e.event) {
      _e.soldTicket += numTkets;
    }
  }

  res.status(200).send({ msg: 'ok' });
}

/**
 * Add a new event to the server
 * Note that this is a POST request!
 * @param req request to respond to
 * @param res object to send response with
 */
export const add = (req: SafeRequest, res: SafeResponse): void => {
  const event = req.body.event;
  const sport = req.body.sport;
  const description = req.body.description;
  const date = req.body.date;
  const venue = req.body.venue;
  const avlb = req.body.maxAvabTicket;

  // although we've done input check in the client side, we should also do the input check from server side
  // as the user may "inject" bad data to our server
  if (typeof event !== 'string' || event === '') {
    res.status(400).send('Invalid type on required parameter \'event\' or the parameter is empty!');
    return;
  } else if (typeof sport !== 'string' || sport === '') {
    res.status(400).send('Invalid type on required parameter \'sport\' or the parameter is empty!');
    return;
  } else if (typeof description !== 'string' || description === '') {
    res.status(400).send('Invalid type on required parameter \'description\' or the parameter is empty!');
    return;
  } else if (typeof date !== 'number') {
    res.status(400).send('Invalid type on required parameter \'date\' or the parameter is missing!');
    return;
  } else if (typeof venue !== 'string' || venue === '') {
    res.status(400).send('Invalid type on required parameter \'venue\' or the parameter is empty!');
    return;
  } else if (typeof avlb !== 'number') {
    res.status(400).send('Invalid type on required parameter \'maxAvabTicket\' or the parameter is missing!');
    return;
  }
  // special handling for BigInt typed data - date and avlb
  try {
    if (BigInt(date) < 1n || BigInt(date) > 31n) {
      throw new Error('Invalid Date!');
    }
  } catch {
    // It is expected that the error above would be caught by this [ catch ]
    // Meanwhile, it helps to handle when date is not an integer
    res.status(400).send('The given parameter \'date\' is invalid!');
    return;
  }

  try {
    if (BigInt(avlb) <= 0n) {
      throw new Error('Invalid Availability!');
    }
  } catch {
    // It is expected that the error above would be caught by this [ catch ]
    // Meanwhile, it helps to handle when avlb is not an integer
    res.status(400).send('The given parameter \'maxAvabTicket\' is invalid!');
    return;
  }

  // handle duplicate event
  for (const _e of eventList) {
    if (sport === _e.sport && event === _e.event) {
      res.status(400).send('The given sport and event already existed in database! Please input a valid sport/event!');
      return;
    }
  }

  eventList.push({
    event: event,
    sport: sport,
    description: description,
    date: date,
    venue: venue,
    maxAvabTicket: avlb,
    soldTicket: 0
  });

  res.status(200).send({ msg: 'ok' });
};


// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param: unknown): string | undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
};

/**
 * Checks if there is any ticket left
 *    if there is availability, return false
 *    otherwise return true
 * @returns a boolean indicating if there is availability left
 */
const doAvlbCheckBeforeClick = (): boolean => {
  for (const e of eventList) {
    if (e.soldTicket !== e.maxAvabTicket) return false;
  }
  return true;
}

/**
 * Only for testing purposes - clear the whole event list
 * @effect eventList would become an empty array
 */
export const resetForTesting = (): void => {
  eventList.splice(0, eventList.length);
}