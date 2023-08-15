const { DateTime } = require('luxon');
const dates = require('../../lib/dates');

describe('getTotalDelay', () => {
  it('Should calculate the total delay with no weekend days or holidays', () => {
    const initialDate = DateTime.fromISO('2023-06-12T10:10:10Z');
    const delay = 3;
    const result = dates.getTotalDelay(initialDate, delay, 'US');
    expect(result).toEqual({ holidayDays: 0, weekendDays: 0, totalDays: 3 });
  });

  it('Should calculate the total delay with weekend days and holidays', () => {
    const initialDate = DateTime.fromISO('2021-11-10T10:10:10Z');
    const delay = 6;
    const result = dates.getTotalDelay(initialDate, delay, 'US');
    expect(result).toEqual({ holidayDays: 1, weekendDays: 2, totalDays: 9 });
  });
});

describe('isBusinessDay', () => {
  it('Should return true for a business day in the US', () => {
    const date = '2023-06-14T10:10:10Z';
    const result = dates.isBusinessDay(date, 'US');
    expect(result).toBe(true);
  });

  it('Should return false for a weekend day', () => {
    const date = '2023-06-17T10:10:10Z'; // Saturday
    const result = dates.isBusinessDay(date, 'US');
    expect(result).toBe(false);
  });

  it('Should return false for a holiday', () => {
    const date = '2023-12-25T10:10:10Z'; // Christmas Day
    const result = dates.isBusinessDay(date, 'US');
    expect(result).toBe(false);
  });
});
