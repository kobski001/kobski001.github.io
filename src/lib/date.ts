const formatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' });

export const formatDate = (date: Date) => formatter.format(date);
