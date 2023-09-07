import React from 'react';
import './NoticationPopup.scss';
import {defaultNotificationPopup, defaultSettings} from '../../const/settings';
import {untilPresent} from '../../helpers/utils/formatFullTime';
const a = {
  id: 1,
  firstName: 'John Doe',
  city: 'New York',
  country: 'United States',
  productName: 'Puffer Jacket ',
  timestamp: '2023-08-30T03:33:22.487Z',
  productImage: 'https://boostsales.apps.avada.io/42b7c27ec4d0b67163b3d2adc1f1221e.png'
};
const NotificationPopup = ({data = defaultNotificationPopup, input = defaultSettings}) => {
  return (
    <div className="Avava-SP__Wrapper fadeInUp animated">
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${data.productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={`Avada-SP__Title ${input.truncateProductName && 'truncate__title'}`}>
                {data.firstName} in {data.city}, {data.country}
              </div>
              <div
                className={`Avada-SP__Subtitle ${input.truncateProductName &&
                  'truncate__subtitle'}`}
              >
                purchased {data.productName}
              </div>
              <div className={'Avada-SP__Footer '}>
                <div>{input.hideTimeAgo || untilPresent(data.timestamp)}</div>
                <span className="uni-blue">
                  <i className="fa fa-check" aria-hidden="true">
                    &#x2713;
                  </i>{' '}
                  by AVADA
                </span>
              </div>
              <div className="Avada-SP__Cancel">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="13"
                  height="13"
                  viewBox="0 0 50 50"
                >
                  <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {};

export default NotificationPopup;
