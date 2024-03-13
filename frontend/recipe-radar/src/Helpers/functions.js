/**
 * Function to format date to MM/DD/YYYY
 * @param {Date} date - The date to be formatted
 * @returns {string} - The formatted date in the format MM/DD/YYYY
/**
 * Function to format date to MM/DD/YYYY
 * @param {Date} date
 * 
 **/
export function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  let month = (1 + d.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;
  let day = d.getDate().toString();
  day = day.length > 1 ? day : "0" + day;
  return month + "/" + day + "/" + year;
}
