/**
 * @fileoverview Basic calendar
 */

import * as React from 'react'
import { createUseStyles, JssProvider } from 'react-jss'
import pkg from '../package.json'
import {addDays, addWeeks, startOfWeek, startOfMonth, isSameMonth, getWeeksInMonth} from './util.js'

// Types/Constants ////////////////////////////////////////////////////////////

/** Basis for spacing width */
const spacingWidth = 8

// Styling ////////////////////////////

/**
 * Setup counter for classname generator function
 * @see: https://cssinjs.org/react-jss?v=v10.0.3#class-name-generator-options
 * @see: https://cssinjs.org/jss-api?v=v10.0.3#generate-your-class-names
 * @return {Function} - Function to generate classnames
 */
const createGenerateId = () => {
  let counter = 0

  return (rule, sheet) => `${pkg.name}:${pkg.version}--${rule.key}-${counter++}`
}

/** The classname generator function */
const generateId = createGenerateId()

// Day ////////////////////////////////////////////////////////////////////////

/** Styling classes for day component */
const createDayClasses = createUseStyles({
  root: {
    display: 'inline-block',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box'
  },
  content: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    height: 'inherit',
    padding: `${spacingWidth / 2}px`
  },
  dateLabel: {
    alignSelf: 'flex-start',
    marginTop: 0
  }
})

/**
 * Component to represent a day on the calendar
 * @param {object} props - Component properties
 * @param {React.Children} props.children - Things to display in day
 * @param {string} props.contentClassName - CSS class names for the date component's content
 * @param {Date} props.date - Date
 * @param {string} props.dateLabelClassName - CSS class names for the date label
 * @param {Function} props.onClick - Callback for click event
 * @param {string} props.rootClassName - CSS class names for the root element
 * @return {React.Component} - Day Component
 */
export const Day = ({
  children,
  contentClassName,
  date,
  dateLabelClassName,
  onClick,
  rootClassName
}) => {
  const classes = createDayClasses()
  return (
    <div
      className={`${classes.root} ${rootClassName}`}
      onClick={onClick}
      title={Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date)}
    >
      <div className={`${classes.content} ${contentClassName}`}>
        <h6 className={`${classes.dateLabel} ${dateLabelClassName}`}>
          {Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date)}
        </h6>
        {children}
      </div>
    </div>
  )
}

// Week ///////////////////////////////////////////////////////////////////////

/** Styling classes for week component */
const createWeekClasses = createUseStyles({
  root: {
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
 * @param {Date} props.date - Date in the week to render
 * @param {Date} props.displayForMonth - Date of month this week is for (to determine which days to fade out)
 * @param {string} rootClassName - Class name for root element
 * @param {React.Component} [props.DayComponent=Day] - Component to render for a day
 * @return {React.Component} - Component
 */
const Week = ({ date, displayForMonth, rootClassName, DayComponent = Day }) => {
  const classes = createWeekClasses()
  const firstDayOfWeek = startOfWeek(date)

  return (
    <div className={`${classes.root} ${rootClassName}`}>
      {Array.from({ length: 7 }, (item, idx) =>
        addDays(firstDayOfWeek, idx)
      ).map((item, idx) => {
        const className = isSameMonth(item, displayForMonth)
          ? null
          : classes.differentMonth

        return (
          <DayComponent
            date={item}
            dateLabelClassName={className}
            rootClassName={idx > 0 ? classes.dayRoot : null}
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
  const createMonthClasses = createUseStyles({
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

  const classes = createMonthClasses()

  return (
    <div className={classes.root}>
      {Array.from({ length: numberOfWeeksInMonth }, (item, idx) => (
        <WeekComponent
          DayComponent={DayComponent}
          date={startOfWeek(addWeeks(firstDayOfMonth, idx))}
          displayForMonth={firstDayOfMonth}
          rootClassName={idx > 0 ? classes.weekRoot : null}
        />
      ))}
    </div>
  )
}

// Header /////////////////////////////////////////////////////////////////////

/** Styling classes for month/year haeding component */
const createMonthYearHeadingClasses = createUseStyles({
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
const MonthYearHeading = ({ date }) => {
  const classes = createMonthYearHeadingClasses()
  return (
    <div className={classes.root}>
      <h1>
        {new Intl.DateTimeFormat('en-US', {
          month: 'long',
          year: 'numeric'
        }).format(date)}
      </h1>
    </div>
  )
}

/** Styling classes for for the day of week component */
const createDayOfWeekLabelRowClasses = createUseStyles({
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
  const classes = createDayOfWeekLabelRowClasses()
  const firstDayOfWeek = startOfWeek(new Date())

  return (
    <div className={classes.root}>
      {Array.from({ length: 7 }, (item, idx) => (
        <div className={classes.text}>
          {Intl.DateTimeFormat('en-US', { weekday: 'narrow' }).format(
            addDays(firstDayOfWeek, idx)
          )}
        </div>
      ))}
    </div>
  )
}

// Main ///////////////////////////////////////////////////////////////////////

const createCalendarClasses = createUseStyles({
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  }
})

/**
 * Calendar
 * @param {object} props - Component properties
 * @param {Date} props.date - Currently selected date
 * @param {React.Component} [props.DayComponent] - Component to render for a day
 * @param {React.Component} [props.MonthComponent=Month] - Component to render for a month
 * @param {React.Component} [props.WeekComponent] - Component to render for a week
 * @param {string} [className] - Class name to apply to root element
 * @return {React.Component} - Component
 */
const Calendar = ({
  DayComponent,
  MonthComponent = Month,
  WeekComponent,
  className,
  date = new Date()
}) => {
  const Test = () => {
    const classes = createCalendarClasses()
    return (
      <div className={`${classes.root} ${className}`}>
        <MonthYearHeading date={date} />
        <DayOfWeekLabelRow />
        <MonthComponent
          date={date}
          WeekComponent={WeekComponent}
          DayComponent={DayComponent}
        />
      </div>
    )
  }
  return (
    <JssProvider generateId={generateId}>
      <Test />
    </JssProvider>
  )
}

export default Calendar
