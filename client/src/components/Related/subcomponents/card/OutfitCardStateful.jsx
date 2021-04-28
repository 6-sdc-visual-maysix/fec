/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unknown-property */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import styles from '../../styled.js';
import Stars from './Stars.jsx';

class OutfitCardStateful extends React.Component {
  constructor(props) {
    super(props);

    this.calculateReviews = this.calculateReviews.bind(this);

    this.state = {
      starMap: [],
    };
  }

  componentDidMount() {
    this.calculateReviews();
  }

  calculateReviews() {
    const { reviews } = this.props;
    let sum = 0;
    for (let i = 0; i < reviews.length; i += 1) {
      sum += reviews[i].rating;
    }
    const average = sum / reviews.length;
    const rawDecimal = average - Math.floor(average);
    const whole = average - rawDecimal;
    // eslint-disable-next-line radix
    const decimal = parseFloat(rawDecimal.toFixed(2));
    const newStarMap = [];
    let decimalPushed = false;
    for (let i = 0; i < 5; i += 1) {
      if (i < whole) {
        newStarMap.push(1);
      } else if (i === whole && decimalPushed === false) {
        newStarMap.push(decimal);
        decimalPushed = true;
      } else if (decimalPushed === true) {
        newStarMap.push(0);
      }
    }
    // if (newStarMap.length === 0) {
    //   newStarMap = [0, 0, 0, 0, 0];
    // }
    this.setState({
      starMap: newStarMap,
      reviewCount: reviews.length,
    });
  }

  render() {
    const {
      name,
      category,
      defaultPrice,
      salePrice,
      image,
      id,
      removeFromOutfit,
    } = this.props;

    const {
      starMap, reviewCount,
    } = this.state;
    return (
      <styles.outfitCardComponentDiv>
        <i className="far fa-times-circle fa-5x" id="removeOutfitButton" onClick={() => { removeFromOutfit(id); }}></i>
        <br />
        <a href={`/products/${id}/`}>
          <span>{name}</span>
          <br />
          {salePrice ? (
            <div id="salePriceText">
              <styles.salePrice>{`$${salePrice}`}</styles.salePrice>
              <styles.defaultPriceStrike>{`$${defaultPrice}`}</styles.defaultPriceStrike>
            </div>
          ) : <span>{`$${defaultPrice}`}</span>}
          <styles.cardImg src={image} alt="" />
          <br />
        </a>
        {starMap.length > 0 ? (
          <Stars
            starMap={starMap}
            reviewCount={reviewCount}
            id={id}
          />
        ) : null}
        <span>{category}</span>
      </styles.outfitCardComponentDiv>
    );
  }
}
export default OutfitCardStateful;
