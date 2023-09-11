import React, {useCallback, useState} from 'react';
import {Button, Card, Layout, Page, Tabs, Loading} from '@shopify/polaris';
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
  // todo state này ko cần dùng ở ngoài này . Nên cho vào gói gọn trong component nhé
  const [trigger, setTrigger] = useState('1');

  const handleTabChange = useCallback(selectedTabIndex => setSelected(selectedTabIndex), []);

  const {loading, data: input, setData: setInput} = useFetchApi({
    url: '/settings',
    defaultData: defaultSettings
  });

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
          setInput={setInput}
          trigger={trigger}
          setTrigger={setTrigger}
        />
      )
    }
  ];

  const {editing, handleEdit} = useEditApi({url: '/settings'});

  if (loading) return <Loading />;
//todo cái primaryAction nó là button rồi mà nhỉ
  return (
    <Page
      subtitle="Decide how your notifications will display"
      fullWidth
      title="Settings"
      primaryAction={
        <Button primary loading={editing} onClick={() => handleEdit(input)}>
          Save
        </Button>
      }
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
