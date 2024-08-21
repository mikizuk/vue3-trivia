export const calculateTimeDifference = (timeOne: number, timeTwo: number): number => {
  if (timeTwo < timeOne) {
    return 0;
  }
  return timeTwo - timeOne;
}

export const formatDuration = (ms: number): string => {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);

  let timeString = '';

  if (hours > 0) {
      timeString += `${hours} hour${hours > 1 ? 's' : ''} `;
  }
  if (minutes > 0) {
      timeString += `${minutes} minute${minutes > 1 ? 's' : ''} `;
  }
  if (seconds > 0 || timeString === '') {
      timeString += `${seconds} second${seconds > 1 ? 's' : ''}`;
  }

  return timeString.trim();
}

export const getTimeNow = (): number => {
  return new Date().getTime();
}

export const calculateTimeSpend = (startTime: number, endTime: number): number => {
  const durationInMs = calculateTimeDifference(startTime, endTime);
  return durationInMs;
} 
// export const calculateTimeSpendFormatted = (startTime: number, endTime: number): string => {
//   const durationInMs = calculateTimeDifference(startTime, endTime);
//   const timeFormatted = formatDuration(durationInMs);

//   return timeFormatted;
// } 