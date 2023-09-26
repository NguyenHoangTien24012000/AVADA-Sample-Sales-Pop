import {Card, Select, Stack, TextField} from '@shopify/polaris';
import React, {useState} from 'react';
import PropTypes from 'prop-types';

export default function SettingTrigger({
  includedUrls,
  excludedUrls,
  setInput,
  input,
  setSaveAction
}) {
  const handleSelectChange = value => {
    setInput(prev => ({...prev, allowShow: value}));
    if (input.allowShow === 'specific' && input.includedUrls === '') {
      setSaveAction(false);
      return;
    }
    setSaveAction(true);
  };
  const options = [
    {label: 'All Pages', value: 'all'},
    {label: 'Specific Pages', value: 'specific'}
  ];
  const [error, setError] = useState({
    includedUrls: '',
    excludedUrls: ''
  });
  const handleChange = (newValue, key) => {
    setInput(prev => ({...prev, [key]: newValue}));
    if (newValue.trim() === '' && input.allowShow === 'all') {
      setError(prev => ({...prev, [key]: ''}));
      setSaveAction(false);
      return;
    }
    const urlCheck = 'https://' + input.shopifyDomain;
    if (newValue.includes(urlCheck)) {
      setError(prev => ({...prev, [key]: ''}));
      setSaveAction(false);
      return;
    }
    setError(prev => ({...prev, [key]: 'Urls invalid!!!'}));
    setSaveAction(true);
  };
  return (
    <Card.Section title="PAGES RESTRICTION" sectioned>
      <Stack vertical>
        <Select options={options} onChange={handleSelectChange} value={input.allowShow} />
        {input.allowShow === 'specific' && (
          <TextField
            id="includedUrls"
            label="Included pages"
            helpText="Page URLs to show the pop-up (Separated by new lines)"
            value={includedUrls}
            onChange={handleChange}
            multiline={4}
            autoComplete="off"
            error={error.includedUrls}
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
          error={error.excludedUrls}
        />
      </Stack>
    </Card.Section>
  );
}

SettingTrigger.propTypes = {
  includedUrls: PropTypes.string,
  excludedUrls: PropTypes.string,
  setInput: PropTypes.func,
  input: PropTypes.object,
  setSaveAction: PropTypes.func
};
