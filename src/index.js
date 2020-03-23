// @flow

/**
 * @fileoverview Basic calendar
 */

import './styles.css'
import * as React from 'react'
import { DayOfWeekLabelRow } from './DayOfWeekLabelRow'
import { Month } from './Month'
import { MonthYearHeading } from './MonthYearHeading'

import type { Props as DayProps } from './Day'
import type { Props as WeekProps } from './Week'
import type { Props as MonthProps } from './Month'

type Props = {
  DayComponent: React.ComponentType<DayProps>,
  MonthComponent: React.ComponentType<MonthProps>,
  WeekComponent: React.ComponentType<WeekProps>,
  className?: string,
  date: Date
}

/**
 * Calendar
 * @param {object} props - Component properties
 * @param {Date} props.date - Currently selected date
 * @param {React.Component} [props.DayComponent] - Component to render for a day
 * @param {React.Component} [props.MonthComponent=Month] - Component to render for a month
 * @param {React.Component} [props.WeekComponent] - Component to render for a week
 * @param {string} [className] - Class name to apply to root element
 * @return {React.Component} - Calendar Component
 */
const Calendar = ({
  DayComponent,
  MonthComponent = Month,
  WeekComponent,
  className,
  date = new Date()
}: Props) => (
  <div className={`${CLASSNAME}-calendar-root ${className || ''}`}>
    <MonthYearHeading date={date} />
    <DayOfWeekLabelRow />
    <MonthComponent
      date={date}
      WeekComponent={WeekComponent}
      DayComponent={DayComponent}
    />
  </div>
)

export default Calendar
