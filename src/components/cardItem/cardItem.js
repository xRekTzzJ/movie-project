import { Card, Flex, Rate, Typography } from 'antd';
import { format } from 'date-fns';
import React, { Component } from 'react';

import brokenImage from '../../img/brokenImage.png'; //Картинка сломанного изображения
import { MovieServiceConsumer } from '../movie-service-context';
export default class CardItem extends Component {
  state = {
    rating: this.props.rating,
    isUnrated: false,
  };
  componentDidMount() {
    if (localStorage.getItem(this.props.id)) {
      this.setState({
        rating: Number(localStorage.getItem(this.props.id)),
      });
    }
  }
  render() {
    const { title, score, date, desc, image, genres } = this.props;
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
    return this.state.isUnrated ? null : (
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

            <MovieServiceConsumer>
              {(genresIds) => {
                return (
                  <Flex align="start" gap={8} className="card__genres">
                    {genres.map((i) => {
                      try {
                        return (
                          <Typography.Text className="card__genre" key={i}>
                            {genresIds.find((el) => el.id === i).name}
                          </Typography.Text>
                        );
                      } catch (error) {
                        return null;
                      }
                    })}
                  </Flex>
                );
              }}
            </MovieServiceConsumer>
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
              onChange={(e) => {
                if (e === 0) {
                  this.props.onDeleteRating(this.props.id);
                  if (this.props.isRatedList) {
                    this.setState({
                      rating: e,
                      isUnrated: true,
                    });
                  } else {
                    this.setState({
                      rating: e,
                    });
                  }
                } else {
                  this.props.onAddRating(this.props.id, e);
                  this.setState({
                    rating: e,
                  });
                }
              }}
            />
          </Flex>
        </Flex>
      </Card>
    );
  }
}
