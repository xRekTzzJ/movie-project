import { Card, Flex, Rate, Typography } from 'antd';
import React, { Component } from 'react';

import logo from '../../image/logo.png';
export default class App extends Component {
  render() {
    return (
      <section className="page">
        <Card>
          <Flex gap={20}>
            <img alt="avatar" src={logo} className="card__image" />
            <Flex vertical="true" gap={7}>
              <Flex align="center" justify="space-between">
                <Typography.Text className="card__title">The way back</Typography.Text>
                <Typography.Text className="card__score">6.6</Typography.Text>
              </Flex>
              <Typography.Text className="card__date">March 5, 2020</Typography.Text>
              <Flex align="start" gap={8}>
                <Typography.Text className="card__genre">Action</Typography.Text>
                <Typography.Text className="card__genre">Drama</Typography.Text>
              </Flex>
              <Typography.Paragraph
                className="card__description"
                ellipsis={{
                  rows: 6,
                }}
              >
                A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction
                attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high. A
                former basketball all-star, who has lost his wife and family foundation in a struggle with addiction
                attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high
              </Typography.Paragraph>
              <Rate allowHalf={true} count={10} />
            </Flex>
          </Flex>
        </Card>
      </section>
    );
  }
}
