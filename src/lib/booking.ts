import { useMemo, useState } from 'react';

export type BookingCopy = {
  greeting: string; // e.g. "Hello Sawah Sunyi, I would like to check availability."
  arrival: string;
  departure: string;
  guests: string;
  room: string;
  note: string;
  flexible: string;
  anyRoom: string;
};

export function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().slice(0, 10);
}

export function useBooking() {
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [guests, setGuests] = useState(2);
  const [room, setRoom] = useState('');
  const [note, setNote] = useState('');
  const datesInvalid = Boolean(arrival && departure && departure <= arrival);
  const nights = useMemo(() => {
    if (!arrival || !departure || datesInvalid) return 0;
    return Math.round((Date.parse(departure) - Date.parse(arrival)) / 86400000);
  }, [arrival, departure, datesInvalid]);
  const compose = (c: BookingCopy) =>
    [
      c.greeting,
      `${c.arrival}: ${arrival || c.flexible}`,
      `${c.departure}: ${departure || c.flexible}`,
      `${c.guests}: ${guests}`,
      `${c.room}: ${room || c.anyRoom}`,
      note.trim() ? `${c.note}: ${note.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  return { arrival, setArrival, departure, setDeparture, guests, setGuests, room, setRoom, note, setNote, datesInvalid, nights, compose };
}
