// @lib/utils/bookingRules.js

export const BLOCKED_TIME_RANGES = [
  { start: [20, 0], end: [24, 0] },
  { start: [0, 0], end: [9, 0] },
];

export const BLOCKED_DAYS = [0, 3, 6];

const toMinutes = ([h, m]) => h * 60 + m;

const isInBlockedRange = (minutes) =>
  BLOCKED_TIME_RANGES.some(({ start, end }) => {
    const s = toMinutes(start);
    const e = toMinutes(end);
    return s < e ? minutes >= s && minutes < e : minutes >= s || minutes < e;
  });

export const isBlockedDay = (day) => BLOCKED_DAYS.includes(day);

export const isBookingAllowedNow = () => {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  return !(isInBlockedRange(mins) || isBlockedDay(now.getDay()));
};

export const isValidTime = (time, date) => {
  if (!time || !date) return false;

  const [h, m] = time.split(":").map(Number);
  const mins = toMinutes([h, m]);
  const selected = new Date(date);
  const now = new Date();

  if (isBlockedDay(selected.getDay())) return false;
  if (isInBlockedRange(mins)) return false;

  const selectedDateTime = new Date(selected);
  selectedDateTime.setHours(h, m, 0, 0);

  if (selected.toDateString() === now.toDateString() && selectedDateTime < now)
    return false;

  return true;
};
