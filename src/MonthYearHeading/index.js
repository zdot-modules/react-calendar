// @flow

/** @fileoverview Month/Year heading, eg: March 2020 */

import * as React from 'react'
import './styles.css'

export type Props = {
  date: Date
}

/**
 * Heading displaying the month and year for a calendar
 * @param {object} props - Component properties
 * @param {Date} props.date - Date
 * @return {React.Component} - Component
 */
export const MonthYearHeading = ({ date }: Props): React.Element<'div'> => {
  return (
    <div className={`${CLASSNAME}-myh-root`}>
      <h1>
        {new Intl.DateTimeFormat('en-US', {
          month: 'long',
          year: 'numeric'
        }).format(date)}
      </h1>
    </div>
  )
}
