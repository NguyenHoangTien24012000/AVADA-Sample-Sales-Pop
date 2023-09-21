import React from 'react';
import {Avatar, Button, Icon, Stack, TextStyle, TopBar} from '@shopify/polaris';
import PropTypes from 'prop-types';
import {MobileCancelMajor, MobileHamburgerMajor} from '@shopify/polaris-icons';
import {LOGO_URL} from '@assets/config/theme';
import '@assets/styles/layout/topbar.scss';

/**
 * @param {boolean} isNavOpen
 * @param {function} toggleOpenNav
 * @return {JSX.Element}
 * @constructor
 */
export default function AppTopBar({isNavOpen, toggleOpenNav}) {
  return (
    <TopBar
      secondaryMenu={
        <div className="Avada-TopBar__Wrapper">
          <div className="Avada-TopBar__Title">
            <Button plain onClick={toggleOpenNav}>
              <Icon source={isNavOpen ? MobileCancelMajor : MobileHamburgerMajor} />
            </Button>
            <img alt="Avada App Name" src={LOGO_URL} width={150} />
          </div>
          <div className="Avada-TopBar__Icons">
            <Stack alignment="center" spacing="tight">
              <Avatar initials="A" name="Woluwayemisi Weun-Jung" />
              <TextStyle variation="strong">Avada</TextStyle>
            </Stack>
          </div>
        </div>
      }
    />
  );
}

AppTopBar.propTypes = {
  isNavOpen: PropTypes.bool,
  toggleOpenNav: PropTypes.func
};
