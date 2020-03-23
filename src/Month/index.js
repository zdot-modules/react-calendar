// @flow

/** @fileoverview Month Component */

import './styles.css'
import * as React from 'react'
import { Day } from '../Day'
import { Week } from '../Week'
import {
  addWeeks,
  getWeeksInMonth,
  startOfMonth,
  startOfWeek
} from '../util/date-time'

import type { Props as DayProps } from '../Day'
import type { Props as WeekProps } from '../Week'

export type Props = {
  date: Date,
  DayComponent?: React.ComponentType<DayProps>,
  WeekComponent?: React.ComponentType<WeekProps>
}

/**
 * Grid to represent a month on a calendar
 * @param {object} props - Component properties
 * @param {Date} props.date - Date
 * @param {React.Component} [props.DayComponent] - Component to render for a day
 * @param {React.Component} [props.WeekComponent=Week] - Component to render for a week
 * @return {React.Component} - Component
 */
export const Month = ({
  date,
  DayComponent = Day,
  WeekComponent = Week
}: Props): React.Element<'div'> => {
  const firstDayOfMonth = startOfMonth(date)
  const numberOfWeeksInMonth = getWeeksInMonth(date)

  return (
    <div className={`${CLASSNAME}-month-root`}>
      {Array.from({ length: numberOfWeeksInMonth }, (item, idx) => (
        <WeekComponent
          DayComponent={DayComponent}
          date={startOfWeek(addWeeks(firstDayOfMonth, idx))}
          displayForMonth={firstDayOfMonth}
          rootClassName={idx > 0 ? `${CLASSNAME}-month-week-root` : ''}
        />
      ))}
    </div>
  )
}
