const fullMonthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function formatBothDateTime(datetime = new Date(), timeZone = '') {
  return formatDateOnly(datetime, timeZone) + ' ' + formatTimeOnly(datetime, timeZone);
}

export function formatDateOnly(datetime = new Date(), timeZone = '') {
  let result = new Date(datetime);
  if (timeZone !== '') {
    result = new Date(result.toLocaleString('en-US', {timeZone}));
  }
  return fullMonthList[result.getMonth()] + ' ' + result.getDate() + ', ' + result.getFullYear();
}

export function formatDateRaw(datetime = new Date(), timeZone = '') {
  let result = new Date(datetime);
  if (timeZone !== '') {
    result = new Date(result.toLocaleString('en-US', {timeZone}));
  }
  return [
    result.getFullYear(),
    zeroSuffix(result.getMonth() + 1),
    zeroSuffix(result.getDate())
  ].join('/');
}

export function formatTimeOnly(datetime = new Date(), timeZone = '') {
  let result = new Date(datetime);
  if (timeZone !== '') {
    result = new Date(result.toLocaleString('en-US', {timeZone}));
  }
  return [zeroSuffix(result.getHours()), zeroSuffix(result.getMinutes())].join(':');
}

export function formatDateMonthYear(datetime = new Date(), timeZone = '') {
  let result = new Date(datetime);
  if (timeZone !== '') {
    result = new Date(result.toLocaleString('en-US', {timeZone}));
  }
  const date = result.getDate();
  const month = fullMonthList[result.getMonth()];
  const year = result.getFullYear();
  return {
    date,
    month,
    year
  };
}

export function untilPresent(datetime = new Date(), timeZone = '') {
  let past = new Date(datetime);
  let present = new Date();
  if (timeZone !== '') {
    past = new Date(past.toLocaleString('en-US', {timeZone}));
    present = new Date(present.toLocaleString('en-US', {timeZone}));
  }
  const timeDifferenceInMilliseconds = present - past;
  const timeDifferenceInMinute = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
  const year = Math.floor(timeDifferenceInMinute / (365 * 24 * 60));
  const month = Math.floor(timeDifferenceInMinute / (30 * 24 * 60));
  const day = Math.floor(timeDifferenceInMinute / (24 * 60));
  const hour = Math.floor(timeDifferenceInMinute / 60);
  if (year >= 1) return year + ' ' + (year >= 2 ? 'years' : 'year') + ' ago';
  if (month >= 1) return month + ' ' + (month >= 2 ? 'months' : 'month') + ' ago';
  if (day >= 1) return day + ' ' + (day >= 2 ? 'days' : 'day') + ' ago';
  if (hour >= 1) return hour + ' ' + (hour >= 2 ? 'hours' : 'hour') + ' ago';
  if (timeDifferenceInMinute >= 1)
    return (
      timeDifferenceInMinute + ' ' + (timeDifferenceInMinute >= 2 ? 'minutes' : 'minute') + ' ago'
    );
  return 'now';
}

function zeroSuffix(str) {
  return ('0' + str).slice(-2);
}
