const request = require('supertest');
const express = require('express');
const routes = require('../../routes/business_dates');

// Create an Express app for testing
const app = express();
app.use(express.json());
app.use(routes.path, routes.routes);

describe('Business Dates API', () => {
  describe('GET /isBusinessDay', () => {
    describe('If date param is provided', () => {
      it('Should return true when the provided date is a business day', async () => {
        const response = await request(app).get('/isBusinessDay?date=2023-06-14&country=US');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ ok: true, results: true });
      });

      it('Should return false when the provided date is not a business day', async () => {
        const response = await request(app).get('/isBusinessDay?date=2023-06-17&country=US');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ ok: true, results: false });
      });
    });

    describe('If date param is missing', () => {
      it('Should return error message', async () => {
        const response = await request(app).get('/isBusinessDay?country=US');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ ok: false, errorMessage: 'A valid date is required' });
      });
    });
  });
  
  describe('GET /settlementDate', () => {
    describe('If correct params are provided', () => {
      it('Should calculate the correct settlement date in the US', async () => {
        const response = await request(app).get('/settlementDate?initialDate=2023-06-12&delay=3&country=US');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          ok: true,
          initialQuery: {
            initialDate: '2023-06-12',
            delay: '3',
            country: 'US',
          },
          results: {
            businessDate: '2023-06-13T19:00:00Z',
            holidayDays: 0,
            totalDays: 3,
            weekendDays: 0,
          },
        });
      });

      describe('If no holidays/weekend exists in given range', () => {
        it('Should return settlement date and holiday/weekend days will be zero', async () => {
          const response = await request(app).get('/settlementDate?initialDate=2023-06-12&delay=3&country=US');
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
            ok: true,
            initialQuery: {
              initialDate: '2023-06-12',
              delay: '3',
              country: 'US',
            },
            results: {
              businessDate: '2023-06-13T19:00:00Z',
              holidayDays: 0,
              totalDays: 3,
              weekendDays: 0,
            },
          });
        });
      });

      describe('If holidays/weekend exists in given range', () => {
        it('Should return settlement date and holiday/weekend days will be non zero', async () => {
          const response = await request(app).get('/settlementDate?initialDate=2023-06-16&delay=3&country=US');
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
            ok: true,
            initialQuery: {
              initialDate: '2023-06-16',
              delay: '3',
              country: 'US',
            },
            results: {
              businessDate: '2023-06-21T19:00:00Z',
              holidayDays: 2,
              totalDays: 7,
              weekendDays: 2,
            },
          });
        });
      });
    });

    describe('If params are missing', () => {
      describe('If initial date is missing and delay is provided', () => {
        it('Should return only business date as null', async () => {
          const response = await request(app).get('/settlementDate?delay=3&country=US');
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
            ok: true,
            initialQuery: {
              delay: '3',
              country: 'US',
            },
            results: {
              businessDate: null,
              holidayDays: 0,
              totalDays: 3,
              weekendDays: 0,
            },
          });
        });
      });

      describe('If initial date is provided and delay is missing', () => {
        it('Should return error message', async () => {
          const response = await request(app).get('/settlementDate?initialDate=2023-06-12&country=US');
          expect(response.status).toBe(500);
          expect(response.body).toEqual({});
        });
      });

      describe('If both initial date and delay is missing', () => {
        it('Should return business date and total days as null', async () => {
          const response = await request(app).get('/settlementDate?country=US');
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
            ok: true,
            initialQuery: {
              country: 'US',
            },
            results: {
              businessDate: null,
              holidayDays: 0,
              totalDays: null,
              weekendDays: 0,
            },
          });
        });
      });
    });
  });
});
