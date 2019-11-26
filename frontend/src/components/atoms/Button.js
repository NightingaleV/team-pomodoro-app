// External imports
import React from 'react';
import classNames from 'classnames';

//TODO REMOVE COLOR FROM DEFAULT CLASSES
const DEFAULT_BTN_CLASSES = 'waves-effect waves-light';
const DEFAULT_COLOR = 'amber';

const BUTTON_SHAPES = {
  defaultBtn: DEFAULT_BTN_CLASSES,
  circular: 'btn-floating waves-effect waves-light',
  bigCircular: 'btn-floating btn-large waves-effect waves-light',
  bigBtn: 'btn-large waves-effect waves-light',
};

const ACTION_BUTTONS = {
  play: {
    color: '',
    icon: 'play_arrow',
  },
  pause: {
    color: 'blue lighten-2',
    icon: 'pause',
  },
  stop: {
    color: '',
    icon: 'stop',
  },
  restart: {
    color: 'blue lighten-2',
    icon: 'loop',
  },

  dropdown: {
    color: 'blue lighten-2',
    icon: 'more_vert',
  },
};

export function Button({
  children,
  type = 'button',
  shape,
  color,
  icon,
  actionButton,
  className,
  iconPosition,
  id,
  href = '',
  ...rest
}) {
  const shapeClasses = BUTTON_SHAPES[shape] || DEFAULT_BTN_CLASSES;
  if (actionButton) {
    color = color || ACTION_BUTTONS[actionButton].color;
    icon = icon || ACTION_BUTTONS[actionButton].icon;
  } else {
    color = color || '';
    icon = icon || '';
  }

  const button = (
    <button
      className={classNames(
        'btn',
        color || DEFAULT_COLOR,
        shapeClasses,
        className,
        id,
      )}
      type={type}
      {...rest}
    >
      {icon && (
        <i className={classNames('material-icons', iconPosition)}>{icon}</i>
      )}
      {children}
    </button>
  );

  const linkButon = (
    <a
      href={href}
      className={classNames(
        'btn',
        color || DEFAULT_COLOR,
        shapeClasses,
        className,
        id,
      )}
      {...rest}
    >
      {icon && (
        <i className={classNames('material-icons', iconPosition)}>{icon}</i>
      )}
      {children}
    </a>
  );

  // if href prop is present, return link, otherwise button
  return href ? linkButon : button;
}
