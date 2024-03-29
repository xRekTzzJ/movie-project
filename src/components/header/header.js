import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
export default class Header extends Component {
  static propTypes = {
    onHeaderButtonClick: PropTypes.func,
    isRatedList: PropTypes.bool,
  };
  static defaultProps = {
    onHeaderButtonClick: () => {},
  };
  render() {
    const { Header } = Layout;
    const { onHeaderButtonClick, isRatedList } = this.props;
    const headerButtons = [
      { key: 1, label: 'Search' },
      { key: 2, label: 'Rated' },
    ];
    return (
      <Header className="header">
        <Menu
          onClick={onHeaderButtonClick}
          mode="horizontal"
          selectedKeys={isRatedList ? ['2'] : ['1']}
          items={headerButtons}
        />
      </Header>
    );
  }
}
