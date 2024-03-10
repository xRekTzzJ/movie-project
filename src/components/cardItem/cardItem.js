import { Card, Flex, Rate, Typography } from 'antd';
import { format } from 'date-fns';
import React, { Component } from 'react';
export default class CardItem extends Component {
  render() {
    const { title, score, date, desc, image } = this.props;
    let scoreClasses = 'card__score';
    if (score >= 7) {
      scoreClasses += ' card__score_green';
    }
    if (score < 4) {
      scoreClasses += ' card__score_red';
    }
    return (
      <Card>
        <Flex gap={20}>
          <img alt="avatar" src={`https://image.tmdb.org/t/p/w500/${image}`} className="card__image" />
          <Flex vertical="true" gap={7} className="card__info">
            <Flex align="center" justify="space-between">
              <Typography.Text className="card__title" ellipsis>
                {title}
              </Typography.Text>
              <Typography.Text className={scoreClasses}>{score}</Typography.Text>
            </Flex>
            <Typography.Text className="card__date">
              {date ? format(new Date(date), 'MMMM dd, yyyy') : 'Invalid date'}
            </Typography.Text>
            <Flex align="start" gap={8}>
              <Typography.Text className="card__genre">Action</Typography.Text>
              <Typography.Text className="card__genre">Drama</Typography.Text>
            </Flex>
            <Typography.Paragraph
              className="card__description"
              ellipsis={{
                rows: 5,
              }}
            >
              {desc}
            </Typography.Paragraph>
            <Rate allowHalf={true} count={10} defaultValue={Math.round(score * 2) / 2} />
          </Flex>
        </Flex>
      </Card>
    );
  }
}
