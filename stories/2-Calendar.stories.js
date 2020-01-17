import Calendar, { Day } from '../src/index.js'
import React from 'react'
import createStyles from 'simplestyle-js'
import { action } from '@storybook/addon-actions'
import {
  addDays,
  addMonths,
  isBefore,
  isSameDay,
  subDays,
  subMonths
} from 'date-fns'
import {
  createMuiTheme,
  makeStyles,
  responsiveFontSizes,
  ThemeProvider
} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import PrevIcon from '@material-ui/icons/ChevronLeft'
import NextIcon from '@material-ui/icons/ChevronRight'

export default {
  title: 'Calendar',
  component: Calendar
}

export const Default = () => <Calendar />

const withNavigationClasses = createStyles({
  root: {
    width: '256px',
    marginTop: '26px'
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '-46px'
  },
  navigationButton: {
    cursor: 'pointer',
    zIndex: 1
  }
})

export const WithNavigation = props => {
  const [selectedMonth, setSelectedMonth] = React.useState(new Date())

  const SimpleNavigation = ({ onNextClick, onPrevClick }) => (
    <div className={withNavigationClasses.navigation}>
      <div
        className={withNavigationClasses.navigationButton}
        onClick={onPrevClick}
      >
        {'<'}
      </div>
      <div
        className={withNavigationClasses.navigationButton}
        onClick={onNextClick}
      >
        {'>'}
      </div>
    </div>
  )

  const Navigation = props.NavigationComponent || SimpleNavigation

  return (
    <div className={`${withNavigationClasses.root} ${props.rootClassName}`}>
      <Navigation
        onNextClick={() => setSelectedMonth(addMonths(selectedMonth, 1))}
        onPrevClick={() => setSelectedMonth(subMonths(selectedMonth, 1))}
      />
      <Calendar {...props} date={selectedMonth} />
    </div>
  )
}

const withEventsClasses = createStyles({
  dayWithEvents: {
    cursor: 'pointer'
  },
  events: {
    alignSelf: 'end',
    backgroundColor: 'green',
    borderRadius: '100%',
    height: '8px',
    marginTop: '-8px',
    width: '8px'
  }
})

export const WithEvents = props => {
  const curDate = new Date()
  const events = [
    {
      id: '0',
      date: new Date(),
      name: 'Groceries'
    },
    {
      id: '1',
      date: addDays(curDate, 2),
      name: 'Date Night'
    },
    {
      id: '2',
      date: new Date(),
      name: 'Birthday'
    },
    {
      id: '3',
      date: subDays(curDate, 1),
      name: 'Doctor'
    },
    {
      id: '4',
      date: subDays(curDate, 7),
      name: 'Dentist'
    },
    {
      id: '5',
      date: addDays(curDate, 20),
      name: 'baby!?!?'
    }
  ]

  const eventObjToText = evtObj => `
	${evtObj.name} ${Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  }).format(evtObj.date)}
	`

  return (
    <div>
      <WithNavigation
        {...props}
        DayComponent={props => {
          const dayEvents = events.filter(evt =>
            isSameDay(evt.date, props.date)
          )
          const hasEvents = dayEvents.length > 0

          return (
            <Day
              {...props}
              rootClassName={`${props.rootClassName} ${
                hasEvents ? withEventsClasses.dayWithEvents : null
              }`}
              onClick={() =>
                alert(`${props.date}\n${dayEvents.map(eventObjToText).join('')}
							`)
              }
            >
              {hasEvents ? (
                <div
                  className={withEventsClasses.events}
                  style={{
                    opacity:
                      isBefore(props.date, curDate) &&
                      !isSameDay(props.date, curDate)
                        ? 0.6
                        : 1
                  }}
                />
              ) : null}
            </Day>
          )
        }}
      />
    </div>
  )
}

const styledClasses = createStyles({
  root: {
    width: '360px'
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '-68px'
  }
})

export const LightlyStyled = props => {
  let theme = createMuiTheme()
  theme = responsiveFontSizes(theme)

  const Navigation = ({ onPrevClick, onNextClick }) => (
    <div className={styledClasses.navigation}>
      <IconButton aria-label="previous month">
        <PrevIcon onClick={onPrevClick} />
      </IconButton>
      <IconButton aria-label="next month">
        <NextIcon onClick={onNextClick} />
      </IconButton>
    </div>
  )

  return (
    <ThemeProvider theme={theme}>
      <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <Typography>
          <WithEvents
            NavigationComponent={Navigation}
            rootClassName={styledClasses.root}
          />
        </Typography>
      </div>
    </ThemeProvider>
  )
}
