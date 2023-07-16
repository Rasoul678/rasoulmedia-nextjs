export const parseDate = (date: string, isPersian = false) => {
  const lang = isPersian ? "fa-IR" : "en-US";

  const parsedDate = Date.parse(date);
  const dateTime = new Intl.DateTimeFormat(lang).format(parsedDate);

  const diff = Number(new Date(parsedDate)) - Number(new Date());

  const seconds = Math.round(diff / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const weeks = Math.round(days / 7);
  const months = Math.round(weeks / 4);
  const years = Math.round(months / 12);

  let relativeTime: string;

  const formatter = new Intl.RelativeTimeFormat(lang, {
    numeric: "auto",
  });

  relativeTime = formatter.format(seconds, "seconds");

  if (minutes) {
    relativeTime = formatter.format(minutes, "minutes");
  }

  if (hours) {
    relativeTime = formatter.format(hours, "hours");
  }

  if (days) {
    relativeTime = formatter.format(days, "days");
  }

  if (weeks) {
    relativeTime = formatter.format(weeks, "weeks");
  }

  if (months) {
    relativeTime = formatter.format(months, "months");
  }

  if (years) {
    relativeTime = formatter.format(years, "years");
  }

  return { dateTime, relativeTime };
};
