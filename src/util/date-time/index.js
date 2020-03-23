// @flow
/** @fileoverview Date utilities */

/**
 * Clone Date
 * @param  {Date} date - Date to clone
 * @return {Date} - Cloned `date`
 */
const cloneDate = (date: Date): Date => {
  const clonedDate: Date = new Date()

  clonedDate.setTime(date.getTime())

  return clonedDate
}

/**
 * Add days to a date
 * @param {Date} date - Date to add days to
 * @param {number} numberOfDaysToAdd - Number of days to add
 * @return {Date} - New date based on `date` with `numberOfDaysToAdd` added
 */
export const addDays = (date: Date, numberOfDaysToAdd: number): Date => {
  const clonedDate: Date = cloneDate(date)

  clonedDate.setDate(clonedDate.getDate() + numberOfDaysToAdd)

  return clonedDate
}

/**
 * Add weeks to a date
 * @param {Date} date - Date to add weeks to
 * @param {number} numberOfWeeksToAdd - Number of weeks to add
 * @return {Date} - New date based on `date` with `numberOfWeeksToAdd` added
 */
export const addWeeks = (date: Date, numberOfWeeksToAdd: number): Date => {
  return addDays(date, numberOfWeeksToAdd * 7)
}

/**
 * Get the first of the month
 * @param {Date} date - Date to find the first of the month for
 * @return {Date} - New date based on `date` set to the first of the month
 */
export const startOfMonth = (date: Date) => {
  const clonedDate: Date = cloneDate(date)

  clonedDate.setDate(1)
  clonedDate.setHours(0, 0, 0, 0)

  return clonedDate
}

/**
 * Get the day of the week
 * @param {Date} date - Date to find the first day of the week for
 * @return {Date} - New date based on `date` set to the first day if the week
 */
export const startOfWeek = (date: Date): Date => {
  const clonedDate = cloneDate(date)
  const currentDayOfWeek = clonedDate.getDay()

  clonedDate.setDate(clonedDate.getDate() - currentDayOfWeek)
  clonedDate.setHours(0, 0, 0, 0)

  return clonedDate
}

/**
 * Determine if 2 date occur in both the same year and month
 * @param  {Date}  date1 - First date
 * @param  {Date}  date2 - Second date
 * @return {Boolean} - Whether or not `date1` and `date2` occur in both the same year and month
 */
export const isSameMonth = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  )
}

/**
 * Get the number of days in a month
 * @param  {Date} date - Date of month to get the number of days of
 * @return {number} - Number of days in month of `date`
 */
export const getDaysInMonth = (date: Date): number => {
  const clonedDate = cloneDate(date)

  clonedDate.setMonth(clonedDate.getMonth() + 1)
  clonedDate.setDate(0)

  return clonedDate.getDate()
}

/**
 * Get the number of weeks in a month
 * @param  {Date} date - Date of month to get weeks for
 * @return {number} - Number of weeks in month of `date`
 */
export const getWeeksInMonth = (date: Date): number => {
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
  let weeks = 1 + remainingDaysInMonth / 7

  // If there are days left over after the whole weeks are accounted for, add another week */
  if (remainingDaysInMonth % 7 !== 0) {
    weeks = weeks + 1
  }

  return Math.floor(weeks)
}
