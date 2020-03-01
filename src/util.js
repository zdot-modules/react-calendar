
const cloneDate = date => {
  const clonedDate = new Date()

  clonedDate.setTime(date.getTime())

  return clonedDate
}

export const addDays = (date, numberOfDaysToAdd) => {
  const clonedDate = cloneDate(date)

  clonedDate.setDate(clonedDate.getDate() + numberOfDaysToAdd)

  return clonedDate
}

export const addWeeks = (date, numberOfWeeksToAdd) => {
  return addDays(date, numberOfWeeksToAdd * 7)
}

export const startOfMonth = date => {
  const clonedDate = cloneDate(date)

  clonedDate.setDate(1)
  clonedDate.setHours(0, 0, 0, 0)

  return clonedDate
}

export const startOfWeek = date => {
  const clonedDate = cloneDate(date)
  const currentDayOfWeek = clonedDate.getDay()

  clonedDate.setDate(clonedDate.getDate() - currentDayOfWeek)
  clonedDate.setHours(0, 0, 0, 0)

  return clonedDate
}

export const isSameMonth = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  )
}

export const getDaysInMonth = date => {
  const clonedDate = cloneDate(date)

  clonedDate.setMonth(clonedDate.getMonth() + 1)
  clonedDate.setDate(0)

  return clonedDate.getDate()

}

export const getWeeksInMonth = date => {
  /** Date */
  const clonedDate = cloneDate(date)

  /** Number of days in month */
  const daysInMonth = getDaysInMonth(clonedDate)

  // Set the date to the first of the month
  clonedDate.setDate(1)

  /** Day of the week of the first of the month */
  const firstDayOfWeek = clonedDate.getDay()

  /** Number of days of the month used in the week of the start of the month */
  const daysUsedInFirstWeek = 7 - firstDayOfWeek

  /** Number of days in the month remaining after the first week of the month */
  const remainingDaysInMonth = daysInMonth - daysUsedInFirstWeek

  /** Number of whole weeks in the month */
  let weeks = 1 + (remainingDaysInMonth / 7)

  // If there are days left over after the whole weeks are accounted for, add another week */
  if(remainingDaysInMonth % 7 !== 0){
    weeks = weeks + 1
  }

  return Math.floor(weeks)
}
