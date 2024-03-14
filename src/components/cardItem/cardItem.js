import { Card, Flex, Rate, Typography } from 'antd';
import { format } from 'date-fns';
import React, { Component } from 'react';

import brokenImage from './brokenImage.png'; //Картинка сломанного изображения
export default class CardItem extends Component {
  state = {
    rating: this.props.rating,
  };
  render() {
    const { title, score, date, desc, image } = this.props;
    let scoreClasses = 'card__score';
    let imageClasses = 'card__image';
    if (score >= 7) {
      scoreClasses += ' card__score_green';
    }
    if (score >= 5 && score < 7) {
      scoreClasses += ' card__score_yellow';
    }
    if (score > 3 && score < 5) {
      scoreClasses += ' card__score_orange';
    }
    if (score <= 3) {
      scoreClasses += ' card__score_red';
    }
    if (!image) {
      imageClasses += ' card__image_broken';
    }
    return (
      <Card>
        <Flex gap={20}>
          <img
            alt="avatar"
            src={image ? `https://image.tmdb.org/t/p/w500/${image}` : brokenImage}
            className={imageClasses}
          />
          <Flex vertical="true" gap={7} className="card__info">
            <Flex align="center" justify="space-between">
              <Typography.Text className="card__title" ellipsis>
                {title}
              </Typography.Text>
              <Typography.Text className={scoreClasses}>{score}</Typography.Text>
            </Flex>
            <Typography.Text className="card__date">
              {date ? format(new Date(date), 'MMMM dd, yyyy') : 'The release date is not specified.'}
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
              {desc ? desc : 'There is no description yet.'}
            </Typography.Paragraph>
            <Rate
              allowHalf={true}
              value={this.state.rating}
              count={10}
              defaultValue={this.props.rating}
              onChange={(e) => {
                this.props.onAddRating(this.props.id, e);
                this.setState({
                  rating: e,
                });
              }}
            />
          </Flex>
        </Flex>
      </Card>
    );
  }
}
