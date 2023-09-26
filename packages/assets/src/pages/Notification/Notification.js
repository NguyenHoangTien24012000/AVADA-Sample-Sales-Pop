import {
  Card,
  Layout,
  Loading,
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
import usePaginate from '../../hooks/api/usePaginate';
import {defaultNotificationsData} from '../../const/settings/defaultNotificationsData';

const DATE_MODIFIED_DESC = 'createdAt:desc';
const DATE_MODIFIED_ASC = 'createdAt:asc';

export default function Notification() {
  const [selectedItems, setSelectedItems] = useState([]);
  const {
    prevPage,
    nextPage,
    onQueryChange,
    data: notificationsData,
    loading: isLoading,
    sort,
    fetched: isFetched,
    pageInfo
  } = usePaginate({
    url: '/notifications',
    defaultData: defaultNotificationsData,
    defaultLimit: 5,
    defaultSort: DATE_MODIFIED_DESC
  });
  const sortByDate = async sort => {
    onQueryChange('sort', sort, true);
  };

  if (!isFetched) return <Loading />;

  return (
    <Page title="Notification" fullWidth subtitle="List of sales notification from Shopify">
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              loading={isLoading}
              idForItem={item => item.productId}
              resourceName={{singular: 'notification', plural: 'notifications'}}
              items={notificationsData}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              selectable
              sortValue={sort}
              sortOptions={[
                {label: 'Newest update', value: DATE_MODIFIED_DESC},
                {label: 'Oldest update', value: DATE_MODIFIED_ASC}
              ]}
              onSortChange={sortByDate}
              renderItem={notification => {
                const {productId, timestamp} = notification;
                const {date, month, year} = formatDateMonthYear(timestamp);
                return (
                  <ResourceItem id={productId}>
                    <Stack distribution="equalSpacing">
                      <Stack.Item fill>
                        <NotificationPopup {...notification} />
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
              hasPrevious={pageInfo?.hasPre}
              hasNext={pageInfo?.hasNext}
              onPrevious={prevPage}
              onNext={nextPage}
            />
          </Stack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
