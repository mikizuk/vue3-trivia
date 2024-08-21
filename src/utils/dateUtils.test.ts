import { describe, it, expect } from 'vitest';
import {
  calculateTimeDifference,
  formatDuration,
  getTimeNow,
  calculateTimeSpend,
} from './dateUtils';

describe('calculateTimeDifference', () => {
  it('should calculate the time difference in milliseconds', () => {
    expect(calculateTimeDifference(1000, 2000)).toEqual(1000);
    expect(calculateTimeDifference(0, 1000)).toEqual(1000);
  });

  it('should return 0 if the start time is greater than the end time', () => {
    expect(calculateTimeDifference(2000, 1000)).toEqual(0);
  });

});

describe('formatDuration', () => {
  it('should format the duration correctly', () => {
    expect(formatDuration(1000)).toEqual('1 second');
    expect(formatDuration(60000)).toEqual('1 minute');
    expect(formatDuration(3600000)).toEqual('1 hour');
    expect(formatDuration(3661000)).toEqual('1 hour 1 minute 1 second');
  });

  it('should handle plural forms correctly', () => {
    expect(formatDuration(2000)).toEqual('2 seconds');
    expect(formatDuration(120000)).toEqual('2 minutes');
    expect(formatDuration(7200000)).toEqual('2 hours');
  });

  it('should handle zero duration', () => {
    expect(formatDuration(0)).toEqual('0 second');
  });
});

describe('getTimeNow', () => {
  it('should return the current time in milliseconds', () => {
    const timeNow = getTimeNow();
    expect(typeof timeNow).toEqual('number');
    expect(timeNow).toBeGreaterThan(0);
  });
});

describe('calculateTimeSpend', () => {
  it('should calculate the time spent correctly', () => {
    const startTime = 1000;
    const endTime = 2000;
    expect(calculateTimeSpend(startTime, endTime)).toEqual(1000);
  });
});