export default function isValidDate(date) {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    // it is a date
    if (isNaN(date)) {
      // d.getTime() or d.valueOf() will also work
      // date object is not valid
      return false
    } else {
      // date object is valid
      const testYear = new Date(date)
      if (testYear.getFullYear() < 2010) {
        return false
      } else {
        return true
      }
    }
  } else {
    // not a date object
    return false
  }
}
