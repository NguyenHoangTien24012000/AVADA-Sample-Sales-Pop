import {
  Card,
  Layout,
  Page,
  Pagination,
  ResourceItem,
  ResourceList,
  Stack,
  TextContainer,
  TextStyle
} from '@shopify/polaris';
import React, {useState} from 'react';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import '../../styles/pages/notification.scss';
import {formatDateMonthYear} from '../../helpers/utils/formatFullTime';
import useFetchApi from '../../hooks/api/useFetchApi';
import {Loading} from '@shopify/polaris';
import {defaultDataNotifications} from '../../const/settings/defaultDataNotification';

const DATE_MODIFIED_DESC = 'DATE_MODIFIED_DESC';
const DATE_MODIFIED_ASC = 'DATE_MODIFIED_ASC';
//todo tải Spell Checker về nhé sai chính tả rồi

export default function Notifcations() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState(DATE_MODIFIED_ASC);
//todo clean lại code 1 lần nữa biến + log + file, folder không cần thiết thì xóa đi
  const {loading, data: notification, setData: setNotification} = useFetchApi({
    url: '/notifications',
    defaultData: defaultDataNotifications
  });
  if (loading) return <Loading />;
  return (
    <Page title="Notification" fullWidth subtitle="List of sales notification from Shopify">
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              idForItem={item => item.productId}
              resourceName={{singular: 'notification', plural: 'notifications'}}
              items={notification}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              selectable
              sortValue={sortValue}
              sortOptions={[
                {label: 'Newest update', value: DATE_MODIFIED_ASC},
                {label: 'Oldest update', value: DATE_MODIFIED_DESC}
              ]}
              onSortChange={selected => {
                setSortValue(selected);
              }}
              renderItem={notification => {
                const {productId, timestamp} = notification;
                const {date, month, year} = formatDateMonthYear(timestamp);
                console.log(productId);
                return (
                  <ResourceItem id={productId}>
                    <Stack distribution="equalSpacing">
                      <Stack.Item fill>
                        <NotificationPopup dataNotification={notification} />
                      </Stack.Item>
                      <Stack.Item>
                        <TextContainer>
                          <TextStyle>From {month + ' ' + date},</TextStyle>
                        </TextContainer>
                        <TextStyle>{year}</TextStyle>
                      </Stack.Item>
                    </Stack>
                  </ResourceItem>
                );
              }}
            />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Stack distribution="center">
            <Pagination
              hasPrevious
              onPrevious={() => {
                console.log('Previous');
              }}
              hasNext
              onNext={() => {
                console.log('Next');
              }}
            />
          </Stack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
