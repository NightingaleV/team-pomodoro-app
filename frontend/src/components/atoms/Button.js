// External imports
import React from 'react';
import classNames from 'classnames';

//TODO REMOVE COLOR FROM DEFAULT CLASSES
const DEFAULT_BTN_CLASSES = 'waves-effect waves-light amber';

const BUTTON_SHAPES = {
  defaultBtn: DEFAULT_BTN_CLASSES,
  bigCircular: 'btn-floating btn-large waves-effect waves-light',
  bigBtn: 'waves-effect waves-light btn-large btn-floating',
};

const ACTION_BUTTONS = {
  play: {
    color: '',
    icon: 'play_arrow',
  },
  pause: {
    color: '',
    icon: 'pause',
  },
  stop: {
    color: '',
    icon: 'stop',
  },
  restart: {
    color: '',
    icon: 'loop',
  },

  dropdown: {
    color: 'amber',
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
