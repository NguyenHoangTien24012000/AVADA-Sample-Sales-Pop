import React, {useState} from 'react';
import {Layout, Page, SettingToggle, TextContainer, TextStyle} from '@shopify/polaris';
// import {api} from '../../helpers';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Page title="Home" fullWidth>
      <Layout>
        <Layout.Section>
          <SettingToggle
            action={{
              content: enabled ? 'Disable' : 'Enable',
              onAction() {
                setEnabled(prev => !prev);
              }
            }}
            enabled={enabled}
          >
            <TextContainer>
              <TextStyle>App status is </TextStyle>
              <TextStyle variation="strong">{enabled ? 'enabled' : 'disabled'}</TextStyle>
            </TextContainer>
          </SettingToggle>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
