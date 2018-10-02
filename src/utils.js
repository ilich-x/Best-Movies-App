export function formatMoney(amount) {
  if (!amount) return '0';
  return String(amount)
    .split('')
    .reverse()
    .map((val, i) => {
      if (i !== 0 && !(i % 3)) {
        return `${val} `;
      }
      return `${val}`;
    })
    .reverse()
    .join('')
    .trim();
}

export function formatDate(date) {
  const map = {
    '01': 'января',
    '02': 'февраля',
    '03': 'марта',
    '04': 'апреля',
    '05': 'мая',
    '06': 'июня',
    '07': 'июля',
    '08': 'августа',
    '09': 'сентября',
    '10': 'октября',
    '11': 'ноября',
    '12': 'декабря'
  };
  const arrDate = date.split('-').reverse();
  return `${arrDate[0]} ${map[arrDate[1]]} ${arrDate[2]}`;
}

export function formatTime(time) {
  let hours = Math.floor(time / 60);
  let mins = Math.floor(time % 60);
  if (hours < 10) hours = `0${hours}`;
  if (mins < 10) mins = `0${mins}`;
  return `${time} мин / ${hours}:${mins}`;
}
