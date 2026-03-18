export function stringToDateToString(stringDate: string) {
  const date = new Date(stringDate);
  return(date.toLocaleString())
}