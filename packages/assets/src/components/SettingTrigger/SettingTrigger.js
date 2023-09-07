import {Card, Select, Stack, TextField} from '@shopify/polaris';
import React, {useCallback, useState} from 'react';

export default function SettingTrigger({input, setInput, trigger, setTrigger}) {
  const handleSelectChange = useCallback(value => setTrigger(value), []);

  const {includedUrls, excludedUrls} = input;

  const options = [
    {label: 'All Pages', value: '1'},
    {label: 'Specific Pages', value: '2'}
  ];

  const handleChange = (newValue, key) => {
    setInput(prev => ({...prev, [key]: newValue}));
  };
  return (
    <Card.Section title="PAGES RESTRICTION" sectioned>
      <Stack vertical>
        <Select options={options} onChange={handleSelectChange} value={trigger} />
        {trigger === '2' && (
          <TextField
            id="includedUrls"
            label="Included pages"
            helpText="Page URLs to show the pop-up (Separated by new lines)"
            value={includedUrls}
            onChange={handleChange}
            multiline={4}
            autoComplete="off"
          />
        )}
        <TextField
          id="excludedUrls"
          label="Excluded pages"
          helpText="Page URLs NOT to show the pop-up (Separated by new lines)"
          value={excludedUrls}
          onChange={handleChange}
          multiline={4}
          autoComplete="off"
        />
      </Stack>
    </Card.Section>
  );
}
