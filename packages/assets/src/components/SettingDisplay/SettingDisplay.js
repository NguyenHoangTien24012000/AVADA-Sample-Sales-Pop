import React from 'react';
import DesktopPositionInput from '../DesktopPositionInput/DesktopPositionInput';
import {Card, Checkbox, Subheading} from '@shopify/polaris';
import './SettingDisplay.scss';
import DesktopPositionRange from '../DesktopPositionRange/DesktopPositionRange';
import PropTypes from 'prop-types';

const defaultSelect = [
  {
    label: 'Hidden time ago',
    value: 'hideTimeAgo',
    helpText: ' '
  },
  {
    label: 'Truncate context text',
    value: 'truncateProductName',
    helpText: "If your product name is long for one line, it will be truncated to 'Product nam...'"
  }
];

export default function SettingDisplay({input, setInput}) {
  const handleChange = (value, key) => {
    setInput(prev => ({...prev, [key]: value}));
  };
  const renderCheckBox = () => {
    return defaultSelect.map(item => (
      <Checkbox
        key={item.value}
        id={item.value}
        label={item.label}
        checked={input[item.value]}
        helpText={item.helpText}
        onChange={handleChange}
      />
    ));
  };

  return (
    <Card.Section title="APPEARANCE" sectioned>
      <DesktopPositionInput
        label={'Desktop position'}
        helpText={'The display position of the pop on your website'}
        position={input.position}
        setInput={setInput}
     />
      {renderCheckBox()}
      <Subheading>TIMING</Subheading>
      <DesktopPositionRange input={input} setInput={setInput} />
    </Card.Section>
  );
}

SettingDisplay.propTypes = {
  input: PropTypes.object,
  setInput: PropTypes.func
};
