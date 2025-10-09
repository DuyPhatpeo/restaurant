// @lib/utils/bookingRules.js

export const BLOCKED_TIME_RANGES = [{ start: [16, 0], end: [9, 0] }];
export const BLOCKED_DAYS = [0, 6];

// Trạng thái booking: "available" | "full"
export let BOOKING_STATUS = "available";

const toMinutes = ([h, m]) => h * 60 + m;

const isInBlockedRange = (minutes) =>
  BLOCKED_TIME_RANGES.some(({ start, end }) => {
    const s = toMinutes(start);
    const e = toMinutes(end);
    return s < e ? minutes >= s && minutes < e : minutes >= s || minutes < e;
  });

export const isBlockedDay = (day) => BLOCKED_DAYS.includes(day);

/** Kiểm tra có thể đặt ngay bây giờ không */
export const isBookingAllowedNow = () => {
  if (BOOKING_STATUS === "full") return false; // check full bàn
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  return !(isInBlockedRange(mins) || isBlockedDay(now.getDay()));
};

/** Kiểm tra slot hợp lệ theo thời gian và ngày */
export const isValidTime = (time, date) => {
  if (!time || !date) return false;
  if (BOOKING_STATUS === "full") return false; // check full bàn

  const [h, m] = time.split(":").map(Number);
  const mins = toMinutes([h, m]);
  const selected = new Date(date);
  const now = new Date();

  if (isBlockedDay(selected.getDay())) return false;
  if (isInBlockedRange(mins)) return false;

  const selectedDateTime = new Date(selected);
  selectedDateTime.setHours(h, m, 0, 0);

  // Nếu đặt cho ngày hôm nay mà giờ đã qua
  if (selected.toDateString() === now.toDateString() && selectedDateTime < now)
    return false;

  return true;
};
