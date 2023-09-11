import {Card, Select, Stack, TextField} from '@shopify/polaris';
import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

export default function SettingTrigger({
  includedUrls,
  excludedUrls,
  setInput,
  trigger,
  setTrigger
}) {
  const handleSelectChange = useCallback(value => setTrigger(value), []);
//todo để value thường giống với tên label. Để 1 với 2 đọc code tối nghĩa quá
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

SettingTrigger.propTypes = {
  includedUrls: PropTypes.string,
  excludedUrls: PropTypes.string,
  setInput: PropTypes.func,
  trigger: PropTypes.string,
  setTrigger: PropTypes.func
};
