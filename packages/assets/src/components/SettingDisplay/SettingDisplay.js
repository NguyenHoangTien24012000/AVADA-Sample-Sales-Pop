import React from 'react';
import DesktopPositionInput from '../DesktopPositionInput/DesktopPositionInput';
import {Card, Checkbox} from '@shopify/polaris';
import './SettingDisplay.scss';
import SettingTiming from '../SettingTiming/SettingTiming';
import PropTypes from 'prop-types';

export default function SettingDisplay({input, setInput}) {
  const handleChange = (value, key) => {
    setInput(prev => ({...prev, [key]: value}));
  };

  return (
    <>
      <Card.Section title="APPEARANCE" sectioned>
        <DesktopPositionInput
          label={'Desktop position'}
          helpText={'The display position of the pop on your website'}
          position={input.position}
          setInput={setInput}
        ></DesktopPositionInput>
        <Checkbox
          id="hideTimeAgo"
          label="Hidden time ago"
          checked={input['hideTimeAgo']}
          onChange={handleChange}
        />
        <Checkbox
          id="truncateProductName"
          label="Truncate context text"
          checked={input['truncateProductName']}
          helpText="If your product name is long for one line, it will be truncated to 'Product nam..."
          onChange={handleChange}
        />
      </Card.Section>
      <Card.Section title="timing">
        <SettingTiming input={input} setInput={setInput} />
      </Card.Section>
    </>
  );
}

SettingDisplay.propTypes = {
  input: PropTypes.object,
  setInput: PropTypes.func
};
