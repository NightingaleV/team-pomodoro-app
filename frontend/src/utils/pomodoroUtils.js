// UTILS
//----------------------------------------------------------------------------
export function convertMinToSec(numOfMinutes) {
  return numOfMinutes * 60;
}

export function formatTime(seconds) {
  let formMinutes = Math.floor((seconds % 3600) / 60);
  let formSeconds = Math.floor((seconds % 3600) % 60);
  if (seconds >= 0) {
    //Normal Timer
    let timeFormated =
      (formMinutes < 10 ? '0' : '') +
      formMinutes +
      ':' +
      (formSeconds < 10 ? '0' : '') +
      formSeconds;
    return timeFormated;
  } else {
    //Timer below 0
    let absSec = Math.abs(formSeconds);
    let absMin = Math.abs(formMinutes);
    let timeFormated =
      '-' +
      (absMin < 10 ? '0' : '') +
      (absSec === 0 ? absMin : absMin - 1) +
      ':' +
      (absSec < 10 ? '0' : '') +
      absSec;
    return timeFormated;
  }
}

export function updateProgressBar(remTime, totTime) {
  //Round to 2 digits
  let newProgressValue = Math.round((remTime / totTime) * 10000) / 100;
  return newProgressValue;
}
