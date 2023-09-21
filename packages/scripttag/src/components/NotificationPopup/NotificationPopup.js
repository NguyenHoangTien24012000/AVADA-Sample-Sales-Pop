import React from 'react';
import './NoticationPopup.scss';
import PropTypes from 'prop-types';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket ',
  timestamp = '6 days ago',
  productImage = 'https://boostsales.apps.avada.io/42b7c27ec4d0b67163b3d2adc1f1221e.png',
  position = 'bottom-left',
  hideTimeAgo = false,
  truncateProductName = false,
  onClosePopup = () => {}
}) => {
  let style = {bottom: '35px', left: '85px'};
  switch (position) {
    case 'bottom-right': {
      style = {bottom: '35px', right: '85px'};
      break;
    }
    case 'top-left': {
      style = {top: '35px', left: '85px'};
      break;
    }
    case 'top-right': {
      style = {top: '35px', right: '85px'};
      break;
    }
    default:
      break;
  }
  return (
    <div className="Avava-SP__Wrapper fadeInUp animated" style={style}>
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={`Avada-SP__Title ${truncateProductName && 'truncate__title'}`}>
                {firstName} in {city}, {country}
              </div>
              <div className={`Avada-SP__Subtitle ${truncateProductName && 'truncate__subtitle'}`}>
                purchased {productName}
              </div>
              <div className={'Avada-SP__Footer '}>
                <div className="Avada-SP__Footer--left">{hideTimeAgo || timestamp}</div>
                <div className="Avada-SP__Footer--right">
                  <span className="uni-blue">
                    <i className="fa fa-check" aria-hidden="true">
                      &#x2713;
                    </i>{' '}
                    by AVADA
                  </span>
                </div>
              </div>
              <div className="Avada-SP__Cancel" onClick={onClosePopup}>
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
  firstName: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  productName: PropTypes.string,
  timestamp: PropTypes.string,
  productImage: PropTypes.string,
  position: PropTypes.string,
  hideTimeAgo: PropTypes.bool,
  truncateProductName: PropTypes.bool,
  onClosePopup: PropTypes.func
};

export default NotificationPopup;
