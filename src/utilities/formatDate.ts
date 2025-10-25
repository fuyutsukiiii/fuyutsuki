/**
 * Reformats a date (YYYY-MM-dd) to (YYYY.MM)
 *
 * @param date Date in string form to format.
 */
export const formatDate = (date: string) => {
  return date.substring(0, 4) + "." + date.substring(5, 7);
};
