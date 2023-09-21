import React from 'react';
import './NoticationPopup.scss';
import {defaultNotificationPopup, defaultSettings} from '../../const/settings';
import {untilPresent} from '../../helpers/utils/formatFullTime';
import PropTypes from 'prop-types';
const NotificationPopup = ({
  notification = defaultNotificationPopup,
  truncateProductName = defaultSettings.truncateProductName,
  hideTimeAgo = defaultSettings.hideTimeAgo
}) => {
  return (
    <div className="Avava-SP__Wrapper fadeInUp animated">
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${notification.productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={`Avada-SP__Title ${truncateProductName && 'truncate__title'}`}>
                {notification.firstName} in {notification.city}, {notification.country}
              </div>
              <div className={`Avada-SP__Subtitle ${truncateProductName && 'truncate__subtitle'}`}>
                purchased {notification.productName}
              </div>
              <div className={'Avada-SP__Footer '}>
                <div>{hideTimeAgo || untilPresent(notification.timestamp)}</div>
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

NotificationPopup.propTypes = {
  notification: PropTypes.object,
  truncateProductName: PropTypes.bool,
  hideTimeAgo: PropTypes.bool
};

export default NotificationPopup;
