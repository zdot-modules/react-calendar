// @flow

/** @fileoverview Day of week column headers */

import './styles.css'
import * as React from 'react'
import { addDays, startOfWeek } from '../util/date-time'

/**
 * Row of day of week headers
 * @return {React.Element<'div'>} Component
 * @example () => <div>M T W T F S S</div>
 */
export const DayOfWeekLabelRow = (): React.Element<'div'> => {
  const firstDayOfWeek = startOfWeek(new Date())

  return (
    <div className={`${CLASSNAME}-dowlr-root`}>
      {Array.from({ length: 7 }, (item, idx) => (
        <div className={`${CLASSNAME}-dowlr-text`}>
          {Intl.DateTimeFormat('en-US', { weekday: 'narrow' }).format(
            addDays(firstDayOfWeek, idx)
          )}
        </div>
      ))}
    </div>
  )
}
