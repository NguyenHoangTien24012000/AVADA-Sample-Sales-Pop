import {FormLayout, RangeSlider, TextField} from '@shopify/polaris';
import React from 'react';
import './DesktopPositionRange.scss';
import PropTypes from 'prop-types';

const arrRange = [
  {
    name: 'displayDuration',
    label: 'Display duration',
    helpText: 'How long each pop will display on your page',
    min: 0,
    max: 100
  },
  {
    name: 'firstDelay',
    label: 'Time before the first pop',
    helpText: 'The delay time before the first notification',
    min: 0,
    max: 100
  },
  {
    name: 'popsInterval',
    label: 'Gap time between to pops',
    helpText: 'The time interval between to popup notifications',
    min: 0,
    max: 100
  },
  {
    name: 'maxPopsDisplay',
    label: 'Maximum of popups',
    helpText:
      'The maximum number of popups are allowed to show after page loading. Maximum number is 80',
    min: 0,
    max: 80
  }
];

const GROUP_1 = 'GROUP_1';
const GROUP_2 = 'GROUP_2';

export default function DesktopPositionRange({input, setInput}) {
  const handleRangeSliderChange = (value, name, min = 0, max = 100) => {
    if (!/^[0-9]+$/g.test(value)) {
      setInput(prev => ({...prev, [name]: min}));
      return;
    }
    const valueParse = Number.parseInt(value);
    if (valueParse < min) {
      setInput(prev => ({...prev, [name]: min}));
      return;
    } else if (valueParse > max) {
      setInput(prev => ({...prev, [name]: max}));
      return;
    }
    setInput(prev => ({...prev, [name]: value}));
  };

  const renderRange = group => {
    let newArrRange = [];
    if (group === GROUP_1) {
      newArrRange = arrRange.slice(0, 2);
    } else if (group === GROUP_2) {
      newArrRange = arrRange.slice(2, 4);
    }
    return newArrRange.map((item, index) => {
      return (
        <RangeSlider
          min={item.min}
          max={item.max}
          key={index}
          label={item.label}
          helpText={item.helpText}
          value={input[item.name]}
          onChange={value => handleRangeSliderChange(value, item.name)}
          output
          suffix={
            <div className="desktop-range--child">
              <TextField
                suffix="second(s)"
                value={input[item.name].toString()}
                onChange={value => {
                  handleRangeSliderChange(value, item.name, item.min, item.max);
                }}
              ></TextField>
            </div>
          }
        />
      );
    });
  };

  return (
    <FormLayout>
      <FormLayout.Group>{renderRange(GROUP_1)}</FormLayout.Group>
      <FormLayout.Group>{renderRange(GROUP_2)}</FormLayout.Group>
    </FormLayout>
  );
}

DesktopPositionRange.propTypes = {
  input: PropTypes.object,
  setInput: PropTypes.func
};
