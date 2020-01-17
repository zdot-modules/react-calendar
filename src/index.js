/**
 * @fileoverview Basic calendar
 */

import * as React from 'react'
import {
  addDays,
  addWeeks,
  getWeeksInMonth,
  isSameMonth,
  startOfMonth,
  startOfWeek
} from 'date-fns'
import createStyles from 'simplestyle-js'

// Types/Constants ////////////////////////////////////////////////////////////

/** Basis for spacing width */
const spacingWidth = 8

// Day ////////////////////////////////////////////////////////////////////////

const dayClasses = createStyles({
  root: {
    // border: '1px solid black',
    display: 'inline-block',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box'
  },
  content: {
    padding: `${spacingWidth / 2}px`,
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    height: 'inherit'
  },
  dateLabel: {
    alignSelf: 'flex-start',
    marginTop: 0
  }
})

/**
 * Component to represent a day on the calendar
 * @param {object} props - Component properties
 * @param {Date} props.date - Date
 * @param {object} props.classes - CSS class names for styling
 * @param {string} props.classes.root - CSS class names for styling
 * @param {string} props.classes.content - CSS class names for styling
 * @return {React.Component} - Component
 */
export const Day = ({
  children,
  contentClassName,
  date,
  dateLabelClassName,
  onClick,
  rootClassName
}) => (
  <div
    className={`${dayClasses.root} ${rootClassName}`}
    title={Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date)}
    onClick={onClick}
  >
    <div className={`${dayClasses.content} ${contentClassName}`}>
      <h6 className={`${dayClasses.dateLabel} ${dateLabelClassName}`}>
        {Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date)}
      </h6>
      {children}
    </div>
  </div>
)

// Week ///////////////////////////////////////////////////////////////////////

const weekClasses = createStyles({
  root: {
    //border: '1px solid black',
    display: 'grid',
    gridGap: '1px',
    gridTemplateColumns:
      '[day-0] calc(100% / 7) [day-1] calc(100% / 7) [day-2] calc(100% / 7) [day-3] calc(100% / 7) [day-4] calc(100% / 7) [day-5] calc(100% / 7) [day-6] calc(100% / 7)'
  },
  dayRoot: {
    borderLeft: '1px solid black'
  },
  differentMonth: {
    opacity: 0.6
  }
})

/**
 * Row of days to represent a week on a calendar
 * @param {object} props - Component properties
 * @param {number} props.date - Date in the week to render
 * @param {React.Component} [props.DayComponent=Day] - Component to render for a day
 * @return {React.Component} - Component
 */
const Week = ({ date, displayForMonth, rootClassName, DayComponent = Day }) => {
  /** Date of Sunday for this week */
  const firstDayOfWeek = startOfWeek(date)

  return (
    <div
      className={`${weekClasses.root} ${rootClassName}`}
      data-component-id={'week'}
    >
      {Array.from({ length: 7 }, (item, idx) =>
        addDays(firstDayOfWeek, idx)
      ).map((item, idx) => {
        const className = isSameMonth(item, displayForMonth)
          ? null
          : weekClasses.differentMonth

        return (
          <DayComponent
            date={item}
            dateLabelClassName={className}
            rootClassName={idx > 0 ? weekClasses.dayRoot : null}
          />
        )
      })}
    </div>
  )
}

// Month //////////////////////////////////////////////////////////////////////

/**
 * Grid to represent a month on a calendar
 * @param {object} props - Component properties
 * @param {Date} props.date - Date
 * @param {React.Component} [props.DayComponent] - Component to render for a day
 * @param {React.Component} [props.WeekComponent=Week] - Component to render for a week
 * @return {React.Component} - Component
 */
const Month = ({ date, DayComponent, WeekComponent = Week }) => {
  const firstDayOfMonth = startOfMonth(date)
  const numberOfWeeksInMonth = getWeeksInMonth(date)
  const monthClasses = createStyles({
    root: {
      border: '1px solid black',
      boxSizing: 'border-box',
      display: 'grid',
      gridTemplateRows: Array.from(
        { length: numberOfWeeksInMonth },
        (item, idx, arr) => `[week-${idx}] calc(100% / ${numberOfWeeksInMonth})`
      ).join(' '),
      height: '100%',
      width: '100%'
    },
    weekRoot: {
      borderTop: '1px solid black'
    }
  })

  return (
    <div className={monthClasses.root}>
      {Array.from({ length: numberOfWeeksInMonth }, (item, idx) => (
        <WeekComponent
          date={startOfWeek(addWeeks(firstDayOfMonth, idx))}
          displayForMonth={firstDayOfMonth}
          rootClassName={idx > 0 ? monthClasses.weekRoot : null}
          DayComponent={DayComponent}
        />
      ))}
    </div>
  )
}

// Header /////////////////////////////////////////////////////////////////////

const monthYearHeadingClasses = createStyles({
  root: {
    textAlign: 'center'
  }
})

/**
 * Heading displaying the month and year for a calendar
 * @param {object} props - Component properties
 * @param {Date} props.date - Date
 * @return {React.Component} - Component
 */
const MonthYearHeading = ({ date }) => (
  <div className={monthYearHeadingClasses.root}>
    <h1>
      {new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric'
      }).format(date)}
    </h1>
  </div>
)

const dayOfWeekLabelRowClasses = createStyles({
  root: {
    display: 'grid',
    gridTemplateColumns:
      '[day-0] calc(100% / 7) [day-1] calc(100% / 7) [day-2] calc(100% / 7) [day-3] calc(100% / 7) [day-4] calc(100% / 7) [day-5] calc(100% / 7) [day-6] calc(100% / 7)'
  },
  text: {
    textAlign: 'center'
  }
})

/**
 * Row of week day labels (eg: 'S M T W T F S')
 * @return {React.Component} - Component
 */
const DayOfWeekLabelRow = () => {
  const firstDayOfWeek = startOfWeek(new Date())

  return (
    <div className={dayOfWeekLabelRowClasses.root}>
      {Array.from({ length: 7 }, (item, idx) => (
        <div className={dayOfWeekLabelRowClasses.text}>
          {Intl.DateTimeFormat('en-US', { weekday: 'narrow' }).format(
            addDays(firstDayOfWeek, idx)
          )}
        </div>
      ))}
    </div>
  )
}

// Main ///////////////////////////////////////////////////////////////////////

const calendarClasses = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxSizing: 'border-box'
  }
})

/**
 * Calendar
 * @param {object} props - Component properties
 * @param {Date} props.date - Currently selected date
 * @param {React.Component} [props.DayComponent] - Component to render for a day
 * @param {React.Component} [props.WeekComponent] - Component to render for a week
 * @param {React.Component} [props.MonthComponent=Month] - Component to render for a month
 * @return {React.Component} - Component
 */
const Calendar = ({
  DayComponent,
  MonthComponent = Month,
  WeekComponent,
  className,
  date = new Date()
}) => (
  <div className={`${calendarClasses.root} ${className}`}>
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
