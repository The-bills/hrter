export const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});