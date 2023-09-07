import React from 'react';
import PropTypes from 'prop-types';
import './DesktopPositionInput.scss';
import {Labelled, Stack} from '@shopify/polaris';

const defaultOptions = [
  {label: 'Bottom left', value: 'bottom-left'},
  {label: 'Bottom right', value: 'bottom-right'},
  {label: 'Top left', value: 'top-left'},
  {label: 'Top right', value: 'top-right'}
];

const DesktopPositionInput = ({label, helpText, position, setInput}) => {
  function onChange(positionCurrent) {
    setInput(prev => ({...prev, position: positionCurrent}));
  }
  return (
    <Labelled label={label} helpText={helpText}>
      <Stack>
        {defaultOptions.map(option => (
          <div
            key={option.value}
            className={`Avada-DesktopPosition ${
              position === option.value ? 'Avada-DesktopPosition--selected' : ''
            }`}
            onClick={() => onChange(option.value)}
          >
            <div
              className={`Avada-DesktopPosition__Input Avada-DesktopPosition__Input--${option.value}`}
            ></div>
          </div>
        ))}
      </Stack>
    </Labelled>
  );
};

DesktopPositionInput.propTypes = {
  label: PropTypes.string,
  position: PropTypes.string,
  setInput: PropTypes.func,
  helpText: PropTypes.string
};

export default DesktopPositionInput;
