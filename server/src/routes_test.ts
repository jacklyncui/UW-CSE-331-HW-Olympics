import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { add, getAllEvents, getTkt, resetForTesting } from './routes';


describe('routes', function () {
  it('add', function () {
    // case 1 - invalid event - test 1
    const req1_1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: {} }
    );
    const res1_1 = httpMocks.createResponse();
    add(req1_1, res1_1);
    assert.deepStrictEqual(res1_1._getStatusCode(), 400);
    assert.deepStrictEqual(res1_1._getData(), 'Invalid type on required parameter \'event\' or the parameter is empty!');

    // case 1 - invalid event - test 2
    const req1_2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 3n } }
    );
    const res1_2 = httpMocks.createResponse();
    add(req1_2, res1_2);
    assert.deepStrictEqual(res1_2._getStatusCode(), 400);
    assert.deepStrictEqual(res1_2._getData(), 'Invalid type on required parameter \'event\' or the parameter is empty!');

    // case 1 - invalid event - test 3
    const req1_3 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: '' } }
    );
    const res1_3 = httpMocks.createResponse();
    add(req1_3, res1_3);
    assert.deepStrictEqual(res1_3._getStatusCode(), 400);
    assert.deepStrictEqual(res1_3._getData(), 'Invalid type on required parameter \'event\' or the parameter is empty!');

    // case 2 - invalid sport - test 1
    const req2_1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff' } }
    );
    const res2_1 = httpMocks.createResponse();
    add(req2_1, res2_1);
    assert.deepStrictEqual(res2_1._getStatusCode(), 400);
    assert.deepStrictEqual(res2_1._getData(), 'Invalid type on required parameter \'sport\' or the parameter is empty!');

    // case 2 - invalid sport - test 2
    const req2_2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 1n } }
    );
    const res2_2 = httpMocks.createResponse();
    add(req2_2, res2_2);
    assert.deepStrictEqual(res2_2._getStatusCode(), 400);
    assert.deepStrictEqual(res2_2._getData(), 'Invalid type on required parameter \'sport\' or the parameter is empty!');

    // case 2 - invalid sport - test 3
    const req2_3 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: '' } }
    );
    const res2_3 = httpMocks.createResponse();
    add(req2_3, res2_3);
    assert.deepStrictEqual(res2_3._getStatusCode(), 400);
    assert.deepStrictEqual(res2_3._getData(), 'Invalid type on required parameter \'sport\' or the parameter is empty!');

    // case 3 - invalid description - test 1
    const req3_1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that' } }
    );
    const res3_1 = httpMocks.createResponse();
    add(req3_1, res3_1);
    assert.deepStrictEqual(res3_1._getStatusCode(), 400);
    assert.deepStrictEqual(res3_1._getData(), 'Invalid type on required parameter \'description\' or the parameter is empty!');

    // case 3 - invalid description - test 2
    const req3_2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: {} } }
    );
    const res3_2 = httpMocks.createResponse();
    add(req3_2, res3_2);
    assert.deepStrictEqual(res3_2._getStatusCode(), 400);
    assert.deepStrictEqual(res3_2._getData(), 'Invalid type on required parameter \'description\' or the parameter is empty!');

    // case 3 - invalid description - test 3
    const req3_3 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: '' } }
    );
    const res3_3 = httpMocks.createResponse();
    add(req3_3, res3_3);
    assert.deepStrictEqual(res3_3._getStatusCode(), 400);
    assert.deepStrictEqual(res3_3._getData(), 'Invalid type on required parameter \'description\' or the parameter is empty!');

    // case 4 - invalid date - test 1
    const req4_1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: ':)' } }
    );
    const res4_1 = httpMocks.createResponse();
    add(req4_1, res4_1);
    assert.deepStrictEqual(res4_1._getStatusCode(), 400);
    assert.deepStrictEqual(res4_1._getData(), 'Invalid type on required parameter \'date\' or the parameter is missing!');

    // case 4 - invalid date - test 2
    const req4_2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: ':)', date: {} } }
    );
    const res4_2 = httpMocks.createResponse();
    add(req4_2, res4_2);
    assert.deepStrictEqual(res4_2._getStatusCode(), 400);
    assert.deepStrictEqual(res4_2._getData(), 'Invalid type on required parameter \'date\' or the parameter is missing!');

    // case 4 - invalid date - test 3
    const req4_3 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: ':)', date: 'string!' } }
    );
    const res4_3 = httpMocks.createResponse();
    add(req4_3, res4_3);
    assert.deepStrictEqual(res4_3._getStatusCode(), 400);
    assert.deepStrictEqual(res4_3._getData(), 'Invalid type on required parameter \'date\' or the parameter is missing!');

    // case 5 - invalid venue - test 1
    const req5_1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: ':)', date: 8 } }
    );
    const res5_1 = httpMocks.createResponse();
    add(req5_1, res5_1);
    assert.deepStrictEqual(res5_1._getStatusCode(), 400);
    assert.deepStrictEqual(res5_1._getData(), 'Invalid type on required parameter \'venue\' or the parameter is empty!');

    // case 5 - invalid venue - test 2
    const req5_2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: ':)', date: 8, venue: 789 } }
    );
    const res5_2 = httpMocks.createResponse();
    add(req5_2, res5_2);
    assert.deepStrictEqual(res5_2._getStatusCode(), 400);
    assert.deepStrictEqual(res5_2._getData(), 'Invalid type on required parameter \'venue\' or the parameter is empty!');

    // case 5 - invalid venue - test 3
    const req5_3 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: ':)', date: 8, venue: '' } }
    );
    const res5_3 = httpMocks.createResponse();
    add(req5_3, res5_3);
    assert.deepStrictEqual(res5_3._getStatusCode(), 400);
    assert.deepStrictEqual(res5_3._getData(), 'Invalid type on required parameter \'venue\' or the parameter is empty!');

    // case 6 - invalid avlb - test 1
    const req6_1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: ':)', date: 8, venue: 'vihydfg' } }
    );
    const res6_1 = httpMocks.createResponse();
    add(req6_1, res6_1);
    assert.deepStrictEqual(res6_1._getStatusCode(), 400);
    assert.deepStrictEqual(res6_1._getData(), 'Invalid type on required parameter \'maxAvabTicket\' or the parameter is missing!');

    // case 6 - invalid avlb - test 2
    const req6_2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: ':)', date: 8, venue: 'vihydfg', maxAvabTicket: {} } }
    );
    const res6_2 = httpMocks.createResponse();
    add(req6_2, res6_2);
    assert.deepStrictEqual(res6_2._getStatusCode(), 400);
    assert.deepStrictEqual(res6_2._getData(), 'Invalid type on required parameter \'maxAvabTicket\' or the parameter is missing!');

    // case 6 - invalid avlb - test 3
    const req6_3 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: ':)', date: 8, venue: 'vihydfg', maxAvabTicket: '' } }
    );
    const res6_3 = httpMocks.createResponse();
    add(req6_3, res6_3);
    assert.deepStrictEqual(res6_3._getStatusCode(), 400);
    assert.deepStrictEqual(res6_3._getData(), 'Invalid type on required parameter \'maxAvabTicket\' or the parameter is missing!');

    // case 7 - invalid date in try...catch - test 1
    const req7_1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: ':)', date: 0, venue: 'vihydfg', maxAvabTicket: 7324 } }
    );
    const res7_1 = httpMocks.createResponse();
    add(req7_1, res7_1);
    assert.deepStrictEqual(res7_1._getStatusCode(), 400);
    assert.deepStrictEqual(res7_1._getData(), 'The given parameter \'date\' is invalid!');

    // case 7 - invalid date in try...catch - test 2
    const req7_2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: ':)', date: 32, venue: 'vihydfg', maxAvabTicket: 7324 } }
    );
    const res7_2 = httpMocks.createResponse();
    add(req7_2, res7_2);
    assert.deepStrictEqual(res7_2._getStatusCode(), 400);
    assert.deepStrictEqual(res7_2._getData(), 'The given parameter \'date\' is invalid!');

    // case 7 - invalid date in try...catch - test 3
    const req7_3 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: ':)', date: 1.12345, venue: 'vihydfg', maxAvabTicket: 7324 } }
    );
    const res7_3 = httpMocks.createResponse();
    add(req7_3, res7_3);
    assert.deepStrictEqual(res7_3._getStatusCode(), 400);
    assert.deepStrictEqual(res7_3._getData(), 'The given parameter \'date\' is invalid!');

    // case 8 - invalid maxAvabTicket in try...catch - test 1
    const req8_1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: ':)', date: 3, venue: 'vihydfg', maxAvabTicket: 0 } }
    );
    const res8_1 = httpMocks.createResponse();
    add(req8_1, res8_1);
    assert.deepStrictEqual(res8_1._getStatusCode(), 400);
    assert.deepStrictEqual(res8_1._getData(), 'The given parameter \'maxAvabTicket\' is invalid!');

    // case 8 - invalid maxAvabTicket in try...catch - test 2
    const req8_2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: ':)', date: 3, venue: 'vihydfg', maxAvabTicket: -999 } }
    );
    const res8_2 = httpMocks.createResponse();
    add(req8_2, res8_2);
    assert.deepStrictEqual(res8_2._getStatusCode(), 400);
    assert.deepStrictEqual(res8_2._getData(), 'The given parameter \'maxAvabTicket\' is invalid!');

    // case 8 - invalid maxAvabTicket in try...catch - test 3
    const req8_3 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: ':)', date: 2, venue: 'vihydfg', maxAvabTicket: 74.34324 } }
    );
    const res8_3 = httpMocks.createResponse();
    add(req8_3, res8_3);
    assert.deepStrictEqual(res8_3._getStatusCode(), 400);
    assert.deepStrictEqual(res8_3._getData(), 'The given parameter \'maxAvabTicket\' is invalid!');

    // case 9 - all inputs are valid and returns the normal string - test 1
    const req9_1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: ':)', date: 3, venue: 'vihydfg', maxAvabTicket: 10 } }
    );
    const res9_1 = httpMocks.createResponse();
    add(req9_1, res9_1);
    assert.deepStrictEqual(res9_1._getStatusCode(), 200);
    assert.deepStrictEqual(res9_1._getData(), { msg: 'ok' });

    // case 9 - all inputs are valid and returns the normal string - test 2
    const req9_2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some different stuff', sport: 'what is that', description: ':(', date: 3, venue: 'vihydfg', maxAvabTicket: 99 } }
    );
    const res9_2 = httpMocks.createResponse();
    add(req9_2, res9_2);
    assert.deepStrictEqual(res9_2._getStatusCode(), 200);
    assert.deepStrictEqual(res9_2._getData(), { msg: 'ok' });

    // case 9 - all inputs are valid and returns the normal string - test 3
    const req9_3 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some brand-new stuff', sport: 'idk', description: ':(', date: 3, venue: 'vihydfg', maxAvabTicket: 999 } }
    );
    const res9_3 = httpMocks.createResponse();
    add(req9_3, res9_3);
    assert.deepStrictEqual(res9_3._getStatusCode(), 200);
    assert.deepStrictEqual(res9_3._getData(), { msg: 'ok' });

    // case 10 - duplicated event name / sport - test 1
    const req10_1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: ':)', date: 3, venue: 'vihydfg', maxAvabTicket: 10 } }
    );
    const res10_1 = httpMocks.createResponse();
    add(req10_1, res10_1);
    assert.deepStrictEqual(res10_1._getStatusCode(), 400);
    assert.deepStrictEqual(res10_1._getData(), 'The given sport and event already existed in database! Please input a valid sport/event!');

    // case 10 - duplicated event name / sport - test 2
    const req10_2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some different stuff', sport: 'what is that', description: ':)', date: 3, venue: 'gtvdyufg', maxAvabTicket: 10 } }
    );
    const res10_2 = httpMocks.createResponse();
    add(req10_2, res10_2);
    assert.deepStrictEqual(res10_2._getStatusCode(), 400);
    assert.deepStrictEqual(res10_2._getData(), 'The given sport and event already existed in database! Please input a valid sport/event!');

    resetForTesting();
  });

  it('getAllEvents', function () {
    // test 1 - no event available yet
    const req1 = httpMocks.createRequest(
      { method: 'GET', url: '/api/getEvt', query: {} }
    );
    const res1 = httpMocks.createResponse();
    getAllEvents(req1, res1);
    assert.deepStrictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData(), { elems: [] });

    // test 2 - there are some events
    // before that, we add something to the list
    const addReq1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: ':)', date: 3, venue: 'vihydfg', maxAvabTicket: 10 } }
    );
    const addRes1 = httpMocks.createResponse();
    add(addReq1, addRes1);

    const req2 = httpMocks.createRequest(
      { method: 'GET', url: '/api/getEvt', query: {} }
    );
    const res2 = httpMocks.createResponse();
    getAllEvents(req2, res2);
    assert.deepStrictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData(), { elems: [{ event: 'some stuff', sport: 'what is that', description: ':)', date: 3, venue: 'vihydfg', maxAvabTicket: 10, soldTicket: 0 }] });

    // test 3 - there are some events
    // before that, we add something to the list
    const addReq2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some different stuff', sport: 'what is that', description: ':(', date: 3, venue: 'vihydfg', maxAvabTicket: 99 } }
    );
    const addRes2 = httpMocks.createResponse();
    add(addReq2, addRes2);

    const req3 = httpMocks.createRequest(
      { method: 'GET', url: '/api/getEvt', query: {} }
    );
    const res3 = httpMocks.createResponse();
    getAllEvents(req3, res3);
    assert.deepStrictEqual(res3._getStatusCode(), 200);
    assert.deepStrictEqual(res3._getData(), {
      elems: [
        { event: 'some stuff', sport: 'what is that', description: ':)', date: 3, venue: 'vihydfg', maxAvabTicket: 10, soldTicket: 0 },
        { event: 'some different stuff', sport: 'what is that', description: ':(', date: 3, venue: 'vihydfg', maxAvabTicket: 99, soldTicket: 0 }
      ]
    });

    // test 4 - there are some events
    // before that, we add something to the list
    const addReq3 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some brand-new stuff', sport: 'idk', description: ':(', date: 3, venue: 'vihydfg', maxAvabTicket: 999 } }
    );
    const addRes3 = httpMocks.createResponse();
    add(addReq3, addRes3);

    const req4 = httpMocks.createRequest(
      { method: 'GET', url: '/api/getEvt', query: {} }
    );
    const res4 = httpMocks.createResponse();
    getAllEvents(req4, res4);
    assert.deepStrictEqual(res4._getStatusCode(), 200);
    assert.deepStrictEqual(res4._getData(), {
      elems: [
        { event: 'some stuff', sport: 'what is that', description: ':)', date: 3, venue: 'vihydfg', maxAvabTicket: 10, soldTicket: 0 },
        { event: 'some different stuff', sport: 'what is that', description: ':(', date: 3, venue: 'vihydfg', maxAvabTicket: 99, soldTicket: 0 },
        { event: 'some brand-new stuff', sport: 'idk', description: ':(', date: 3, venue: 'vihydfg', maxAvabTicket: 999, soldTicket: 0 }
      ]
    });

    resetForTesting();
  });

  it('getTkt', function () {
    // case 0 - no event available
    const req0 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: {} }
    );
    const res0 = httpMocks.createResponse();
    getTkt(req0, res0);
    assert.deepStrictEqual(res0._getStatusCode(), 400);
    assert.deepStrictEqual(res0._getData(), 'No Sport Available Yet! Cannot get tickets!');

    // before testing this function, add some stuff to the event list
    const addReq1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some stuff', sport: 'what is that', description: ':)', date: 3, venue: 'vihydfg', maxAvabTicket: 10 } }
    );
    const addRes1 = httpMocks.createResponse();
    add(addReq1, addRes1);

    const addReq2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some different stuff', sport: 'what is that', description: ':(', date: 3, venue: 'vihydfg', maxAvabTicket: 99 } }
    );
    const addRes2 = httpMocks.createResponse();
    add(addReq2, addRes2);

    const addReq3 = httpMocks.createRequest(
      { method: 'POST', url: '/api/add', body: { event: 'some brand-new stuff', sport: 'idk', description: ':(', date: 3, venue: 'vihydfg', maxAvabTicket: 999 } }
    );
    const addRes3 = httpMocks.createResponse();
    add(addReq3, addRes3);

    // case 1 - invalid sport - test 1
    const req1_1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: {} }
    );
    const res1_1 = httpMocks.createResponse();
    getTkt(req1_1, res1_1);
    assert.deepStrictEqual(res1_1._getStatusCode(), 400);
    assert.deepStrictEqual(res1_1._getData(), 'Invalid type on required parameter \'sport\' or the parameter is empty!');

    // case 1 - invalid sport - test 2
    const req1_2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: '' } }
    );
    const res1_2 = httpMocks.createResponse();
    getTkt(req1_2, res1_2);
    assert.deepStrictEqual(res1_2._getStatusCode(), 400);
    assert.deepStrictEqual(res1_2._getData(), 'Invalid type on required parameter \'sport\' or the parameter is empty!');

    // case 1 - invalid sport - test 3
    const req1_3 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 1 } }
    );
    const res1_3 = httpMocks.createResponse();
    getTkt(req1_3, res1_3);
    assert.deepStrictEqual(res1_3._getStatusCode(), 400);
    assert.deepStrictEqual(res1_3._getData(), 'Invalid type on required parameter \'sport\' or the parameter is empty!');

    // case 2 - invalid event - test 1
    const req2_1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'some stuff' } }
    );
    const res2_1 = httpMocks.createResponse();
    getTkt(req2_1, res2_1);
    assert.deepStrictEqual(res2_1._getStatusCode(), 400);
    assert.deepStrictEqual(res2_1._getData(), 'Invalid type on required parameter \'event\' or the parameter is empty!');

    // case 2 - invalid event - test 2
    const req2_2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'some stuff', event: '' } }
    );
    const res2_2 = httpMocks.createResponse();
    getTkt(req2_2, res2_2);
    assert.deepStrictEqual(res2_2._getStatusCode(), 400);
    assert.deepStrictEqual(res2_2._getData(), 'Invalid type on required parameter \'event\' or the parameter is empty!');

    // case 2 - invalid event - test 3
    const req2_3 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'some stuff', event: 678 } }
    );
    const res2_3 = httpMocks.createResponse();
    getTkt(req2_3, res2_3);
    assert.deepStrictEqual(res2_3._getStatusCode(), 400);
    assert.deepStrictEqual(res2_3._getData(), 'Invalid type on required parameter \'event\' or the parameter is empty!');

    // case 3 - invalid name - test 1
    const req3_1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'some stuff', event: 'what is that' } }
    );
    const res3_1 = httpMocks.createResponse();
    getTkt(req3_1, res3_1);
    assert.deepStrictEqual(res3_1._getStatusCode(), 400);
    assert.deepStrictEqual(res3_1._getData(), 'Invalid type on required parameter \'name\' or the parameter is empty!');

    // case 3 - invalid name - test 2
    const req3_2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'some stuff', event: 'what is that', name: '' } }
    );
    const res3_2 = httpMocks.createResponse();
    getTkt(req3_2, res3_2);
    assert.deepStrictEqual(res3_2._getStatusCode(), 400);
    assert.deepStrictEqual(res3_2._getData(), 'Invalid type on required parameter \'name\' or the parameter is empty!');

    // case 3 - invalid name - test 3
    const req3_3 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'some stuff', event: 'what is that', name: 12 } }
    );
    const res3_3 = httpMocks.createResponse();
    getTkt(req3_3, res3_3);
    assert.deepStrictEqual(res3_3._getStatusCode(), 400);
    assert.deepStrictEqual(res3_3._getData(), 'Invalid type on required parameter \'name\' or the parameter is empty!');

    // case 4 - invalid numTkets - test 1
    const req4_1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'some stuff', event: 'what is that', name: 'alice' } }
    );
    const res4_1 = httpMocks.createResponse();
    getTkt(req4_1, res4_1);
    assert.deepStrictEqual(res4_1._getStatusCode(), 400);
    assert.deepStrictEqual(res4_1._getData(), 'Invalid type on required parameter \'numTkets\' or the parameter is missing!');

    // case 4 - invalid numTkets - test 2
    const req4_2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'some stuff', event: 'what is that', name: 'alice', numTkets: 'something' } }
    );
    const res4_2 = httpMocks.createResponse();
    getTkt(req4_2, res4_2);
    assert.deepStrictEqual(res4_2._getStatusCode(), 400);
    assert.deepStrictEqual(res4_2._getData(), 'Invalid type on required parameter \'numTkets\' or the parameter is missing!');

    // case 5 - no such event - test 1
    const req5_1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'some stuff', event: 'what is that', name: 'alice', numTkets: 10 } }
    );
    const res5_1 = httpMocks.createResponse();
    getTkt(req5_1, res5_1);
    assert.deepStrictEqual(res5_1._getStatusCode(), 400);
    assert.deepStrictEqual(res5_1._getData(), 'No such event!');

    // case 5 - no such event - test 2
    const req5_2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'idk', event: 'what is that', name: 'alice', numTkets: 10 } }
    );
    const res5_2 = httpMocks.createResponse();
    getTkt(req5_2, res5_2);
    assert.deepStrictEqual(res5_2._getStatusCode(), 400);
    assert.deepStrictEqual(res5_2._getData(), 'No such event!');

    // case 6 - invalid num of numTkets in try...catch - test 1
    const req6_1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'what is that', event: 'some stuff', name: 'alice', numTkets: 0 } }
    );
    const res6_1 = httpMocks.createResponse();
    getTkt(req6_1, res6_1);
    assert.deepStrictEqual(res6_1._getStatusCode(), 400);
    assert.deepStrictEqual(res6_1._getData(), 'The given parameter \'numTkets\' is invalid!');

    // case 6 - invalid num of numTkets in try...catch - test 2
    const req6_2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'what is that', event: 'some stuff', name: 'alice', numTkets: 11 } }
    );
    const res6_2 = httpMocks.createResponse();
    getTkt(req6_2, res6_2);
    assert.deepStrictEqual(res6_2._getStatusCode(), 400);
    assert.deepStrictEqual(res6_2._getData(), 'The given parameter \'numTkets\' is invalid!');

    // case 6 - invalid num of numTkets in try...catch - test 3
    const req6_3 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'what is that', event: 'some different stuff', name: 'alice', numTkets: 100 } }
    );
    const res6_3 = httpMocks.createResponse();
    getTkt(req6_3, res6_3);
    assert.deepStrictEqual(res6_3._getStatusCode(), 400);
    assert.deepStrictEqual(res6_3._getData(), 'The given parameter \'numTkets\' is invalid!');

    // case 6 - invalid num of numTkets in try...catch - test 4
    const req6_4 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'what is that', event: 'some different stuff', name: 'alice', numTkets: 3.002 } }
    );
    const res6_4 = httpMocks.createResponse();
    getTkt(req6_4, res6_4);
    assert.deepStrictEqual(res6_4._getStatusCode(), 400);
    assert.deepStrictEqual(res6_4._getData(), 'The given parameter \'numTkets\' is invalid!');

    // case 7 - get some tickets and success - test 1
    const req7_1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'what is that', event: 'some different stuff', name: 'alice', numTkets: 98 } }
    );
    const res7_1 = httpMocks.createResponse();
    getTkt(req7_1, res7_1);
    assert.deepStrictEqual(res7_1._getStatusCode(), 200);
    assert.deepStrictEqual(res7_1._getData(), { msg: 'ok' });
    // then - get some tickets and failed
    const req7_1_ex = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'what is that', event: 'some different stuff', name: 'alice', numTkets: 2 } }
    );
    const res7_1_ex = httpMocks.createResponse();
    getTkt(req7_1_ex, res7_1_ex);
    assert.deepStrictEqual(res7_1_ex._getStatusCode(), 400);
    assert.deepStrictEqual(res7_1_ex._getData(), 'The given parameter \'numTkets\' is invalid!');

    // case 7 - get some tickets and success - test 2
    const req7_2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'what is that', event: 'some stuff', name: 'alice', numTkets: 7 } }
    );
    const res7_2 = httpMocks.createResponse();
    getTkt(req7_2, res7_2);
    assert.deepStrictEqual(res7_2._getStatusCode(), 200);
    assert.deepStrictEqual(res7_2._getData(), { msg: 'ok' });
    // then - get some tickets and failed
    const req7_2_ex = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'what is that', event: 'some stuff', name: 'alice', numTkets: 4 } }
    );
    const res7_2_ex = httpMocks.createResponse();
    getTkt(req7_2_ex, res7_2_ex);
    assert.deepStrictEqual(res7_2_ex._getStatusCode(), 400);
    assert.deepStrictEqual(res7_2_ex._getData(), 'The given parameter \'numTkets\' is invalid!');

    // case 7 - get some tickets and success - test 3
    const req7_3 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'idk', event: 'some brand-new stuff', name: 'alice', numTkets: 900 } }
    );
    const res7_3 = httpMocks.createResponse();
    getTkt(req7_3, res7_3);
    assert.deepStrictEqual(res7_3._getStatusCode(), 200);
    assert.deepStrictEqual(res7_3._getData(), { msg: 'ok' });
    // then - get some tickets and failed
    const req7_3_ex = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'idk', event: 'some brand-new stuff', name: 'alice', numTkets: 100 } }
    );
    const res7_3_ex = httpMocks.createResponse();
    getTkt(req7_3_ex, res7_3_ex);
    assert.deepStrictEqual(res7_3_ex._getStatusCode(), 400);
    assert.deepStrictEqual(res7_3_ex._getData(), 'The given parameter \'numTkets\' is invalid!');

    // case X - All tickets were sold out
    const req_x_rmAll_1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'what is that', event: 'some different stuff', name: 'alice', numTkets: 1 } }
    );
    const res_x_rmAll_1 = httpMocks.createResponse();
    getTkt(req_x_rmAll_1, res_x_rmAll_1);
    assert.deepStrictEqual(res_x_rmAll_1._getStatusCode(), 200);
    assert.deepStrictEqual(res_x_rmAll_1._getData(), { msg: 'ok' });
    const req_x_rmAll_2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'what is that', event: 'some stuff', name: 'alice', numTkets: 3 } }
    );
    const res_x_rmAll_2 = httpMocks.createResponse();
    getTkt(req_x_rmAll_2, res_x_rmAll_2);
    assert.deepStrictEqual(res_x_rmAll_2._getStatusCode(), 200);
    assert.deepStrictEqual(res_x_rmAll_2._getData(), { msg: 'ok' });
    const req_x_rmAll_3 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'idk', event: 'some brand-new stuff', name: 'alice', numTkets: 99 } }
    );
    const res_x_rmAll_3 = httpMocks.createResponse();
    getTkt(req_x_rmAll_3, res_x_rmAll_3);
    assert.deepStrictEqual(res_x_rmAll_3._getStatusCode(), 200);
    assert.deepStrictEqual(res_x_rmAll_3._getData(), { msg: 'ok' });

    // no ticket left - do testing for that
    const req_EX_1 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: { sport: 'what is that', event: 'some different stuff', name: 'alice', numTkets: 1 } }
    );
    const res_EX_1 = httpMocks.createResponse();
    getTkt(req_EX_1, res_EX_1);
    assert.deepStrictEqual(res_EX_1._getStatusCode(), 400);
    assert.deepStrictEqual(res_EX_1._getData(), 'All events\' tickets are sold out! Cannot get tickets!');

    const req_EX_2 = httpMocks.createRequest(
      { method: 'POST', url: '/api/getTkt', body: {} }
    );
    const res_EX_2 = httpMocks.createResponse();
    getTkt(req_EX_2, res_EX_2);
    assert.deepStrictEqual(res_EX_2._getStatusCode(), 400);
    assert.deepStrictEqual(res_EX_2._getData(), 'All events\' tickets are sold out! Cannot get tickets!');

  });

});
