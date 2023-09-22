import React, {useState} from 'react';
import {Card, Layout, Page, Tabs, Loading} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import '../../styles/pages/setting.scss';
import SettingDisplay from '../../components/SettingDisplay/SettingDisplay';
import SettingTrigger from '../../components/SettingTrigger/SettingTrigger';
import {useFetchApi, useEditApi} from '../../hooks/api';
import defaultSettings from '../../const/settings/defaultSetting';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = selectedTabIndex => setSelected(selectedTabIndex);

  const {loading, data: input, setData: setInput} = useFetchApi({
    url: '/settings',
    defaultData: defaultSettings
  });
  console.log(input);
  const tabs = [
    {
      id: 'display',
      content: 'Display',
      bodyContent: <SettingDisplay input={input} setInput={setInput} />
    },
    {
      id: 'trigger',
      content: 'Trigger',
      bodyContent: (
        <SettingTrigger
          excludedUrls={input.excludedUrls}
          includedUrls={input.includedUrls}
          input={input}
          setInput={setInput}
        />
      )
    }
  ];

  const {editing, handleEdit} = useEditApi({url: '/settings'});

  if (loading) return <Loading />;
  return (
    <Page
      subtitle="Decide how your notifications will display"
      fullWidth
      title="Settings"
      primaryAction={{
        content: 'Save',
        loading: editing,
        onAction: () => {
          handleEdit(input);
        }
      }}
    >
      <Layout>
        <Layout.Section secondary>
          <NotificationPopup
            hideTimeAgo={input.hideTimeAgo}
            truncateProductName={input.truncateProductName}
          />
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              {tabs[selected].bodyContent}
            </Tabs>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
