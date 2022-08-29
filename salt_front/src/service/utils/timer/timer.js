export default function currentTimer() {
  const date = new Date()
  const year = String(date.getFullYear)
  const month = String(date.getMonth)
  const day = String(date.getDay)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return {
    year: year,
    month: month,
    day: day,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  }
}
