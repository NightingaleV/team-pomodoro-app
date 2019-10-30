// External imports
import React from 'react';
import classNames from 'classnames';

const DEFAULT_BTN_CLASSES = 'waves-effect waves-light';

const BUTTON_SHAPES = {
  defaultBtn: DEFAULT_BTN_CLASSES,
  bigCircular: 'btn-floating btn-large waves-effect waves-light',
  bigBtn: 'waves-effect waves-light btn-large',
};

const ACTION_BUTTONS = {
  play: {
    color: '',
    icon: 'play_arrow',
  },
  pause: {
    color: 'amber',
    icon: 'pause',
  },
  stop: {
    color: 'red',
    icon: 'stop',
  },
  restart: {
    color: 'orange',
    icon: 'replay',
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
  return (
    <button
      className={classNames('btn', color, shapeClasses, className)}
      type={type}
      {...rest}
    >
      {icon && (
        <i className={classNames('material-icons', iconPosition)}>{icon}</i>
      )}
      {children}
    </button>
  );
}
