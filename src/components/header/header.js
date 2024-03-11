import { Layout, Menu } from 'antd';
import React, { Component } from 'react';
export default class Header extends Component {
  render() {
    const { Header } = Layout;
    const headerButtons = [
      { key: 1, label: 'Searched' },
      { key: 2, label: 'Rated' },
    ];
    return (
      <Header className="Header">
        <Menu
          onClick={this.props.onHeaderButtonClick}
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={headerButtons}
        />
      </Header>
    );
  }
}
