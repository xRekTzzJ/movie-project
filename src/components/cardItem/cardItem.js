import { Card, Flex, Rate, Typography } from 'antd';
import React, { Component } from 'react';

export default class CardItem extends Component {
  render() {
    const { title, score, date, desc, image } = this.props;
    return (
      <Card>
        <Flex gap={20}>
          <img alt="avatar" src={`https://image.tmdb.org/t/p/w500/${image}`} className="card__image" />
          <Flex vertical="true" gap={7} className="card__info">
            <Flex align="center" justify="space-between">
              <Typography.Text className="card__title">{title}</Typography.Text>
              <Typography.Text className="card__score">{score}</Typography.Text>
            </Flex>
            <Typography.Text className="card__date">{date}</Typography.Text>
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
              {desc}
            </Typography.Paragraph>
            <Rate allowHalf={true} count={10} />
          </Flex>
        </Flex>
      </Card>
    );
  }
}
