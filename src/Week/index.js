// @flow

/** @fileoverview Week Component */

import './styles.css'
import * as React from 'react'
import { Day } from '../Day'
import { addDays, isSameMonth, startOfWeek } from '../util/date-time'

import type { Props as DayProps } from '../Day'

export type Props = {
  date: Date,
  DayComponent: React.ComponentType<DayProps>,
  displayForMonth: Date,
  rootClassName?: string
}

/**
 * Row of days to represent a week on a calendar
 * @param {object} props - Component properties
 * @param {Date} props.date - Date in the week to render
 * @param {Date} props.displayForMonth - Date of month this week is for (to determine which days to fade out)
 * @param {string} rootClassName - Class name for root element
 * @param {React.Component} [props.DayComponent=Day] - Component to render for a day
 * @return {React.Component} - Component
 */
export const Week = ({
  date,
  displayForMonth,
  rootClassName,
  DayComponent = Day
}: Props): React.Element<'div'> => {
  /** First day of the week */
  const firstDayOfWeek: Date = startOfWeek(date)

  /** Array of Dates for the week */
  const arrayOfDates: Date[] = Array.from({ length: 7 }, (item, idx: number) =>
    addDays(firstDayOfWeek, idx)
  )

  /**
   * Get date dependent classnames
   * @param {Date} item - Date to get classnames for
   * @param {Date} month - Current month
   * @return {string} - Classnames
   */
  const getClassName = (item: Date, month: Date): string =>
    isSameMonth(item, month) ? '' : `${CLASSNAME}-different-month`

  /**
   * Given a Date and index of the week, return a component
   * @param {Date} item - Date
   * @param {number} idx - Date index in week
   * @return {React.Element} - Day Component
   */
  const mapDateToDay = (
    item: Date,
    idx: number
  ): React.Element<typeof DayComponent> => {
    /** Classnames for day */
    const className: string = getClassName(item, displayForMonth)

    return (
      <DayComponent
        key={item.toString()}
        date={item}
        dateLabelClassName={className}
        rootClassName={idx > 0 ? `${CLASSNAME}-week-day-root` : ''}
      />
    )
  }

  return (
    <div
      data-component-id={'week'}
      className={`${CLASSNAME}-week-root ${rootClassName || ''}`}
    >
      {arrayOfDates.map(mapDateToDay)}
    </div>
  )
}
