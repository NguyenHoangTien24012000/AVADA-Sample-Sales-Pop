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

const DATE_MODIFIED_DESC = 'DATE_MODIFIED_DESC';
const DATE_MODIFIED_ASC = 'DATE_MODIFIED_ASC';
const defaultNotifications = [
  {
    id: 1,
    firstName: 'John Doe',
    city: 'New York',
    country: 'United States',
    productName: 'Puffer Jacket ',
    timestamp: '2023-08-30T03:33:22.487Z',
    productImage: 'https://boostsales.apps.avada.io/42b7c27ec4d0b67163b3d2adc1f1221e.png'
  },
  {
    id: 2,
    firstName: 'John Doe',
    city: 'New York',
    country: 'United States',
    productName: 'Puffer Jacket ',
    timestamp: '2023-08-30T03:33:22.487Z',
    productImage: 'https://boostsales.apps.avada.io/42b7c27ec4d0b67163b3d2adc1f1221e.png'
  },
  {
    id: 3,
    firstName: 'John Doe',
    city: 'New York',
    country: 'United States',
    productName: 'Puffer Jacket ',
    timestamp: '2023-08-30T03:33:22.487Z',
    productImage: 'https://boostsales.apps.avada.io/42b7c27ec4d0b67163b3d2adc1f1221e.png'
  }
];

export default function Notifcations() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState(DATE_MODIFIED_ASC);

  return (
    <Page title="Notification" fullWidth subtitle="List of sales notification from Shopify">
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={{singular: 'notification', plural: 'notifications'}}
              items={defaultNotifications}
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
                console.log(`Sort option changed to ${selected}.`);
              }}
              renderItem={notification => {
                const {id, timestamp} = notification;
                const {date, month, year} = formatDateMonthYear(timestamp);
                return (
                  <ResourceItem id={id}>
                    <Stack distribution="equalSpacing">
                      <Stack.Item fill>
                        <NotificationPopup />
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
