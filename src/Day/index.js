// @flow

/** @fileoverview Day Component */

import './styles.css'
import * as React from 'react'

export type Props = {
  children?: React.Node,
  contentClassName?: string,
  date: Date,
  dateLabelClassName?: string,
  onClick?: Function,
  rootClassName?: string
}

/**
 * Component to represent a day on the calendar
 * @param {object} props - Component properties
 * @param {React.Children} props.children - Things to display in day
 * @param {string} props.contentClassName - CSS class names for the date component's content
 * @param {Date} props.date - Date
 * @param {string} [props.dateLabelClassName] - CSS class names for the date label
 * @param {Function} [props.onClick] - Callback for click event
 * @param {string} [props.rootClassName] - CSS class names for the root element
 * @return {React.Component} Day Component
 */
export const Day = ({
  children,
  contentClassName,
  date,
  dateLabelClassName,
  onClick,
  rootClassName
}: Props): React.Element<'div'> => (
  <div
    className={`${CLASSNAME}-day-root ${rootClassName || ''}`}
    onClick={onClick}
    title={Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date)}
  >
    <div className={`${CLASSNAME}-day-content ${contentClassName || ''}`}>
      <h6 className={`${CLASSNAME}-day-date-label ${dateLabelClassName || ''}`}>
        {Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date)}
      </h6>
      {children}
    </div>
  </div>
)
