import React, { Component } from 'react';

class Card extends Component {
	render() {
		const { image} = this.props.card;
		const { index,  onClick} = this.props;
		return (
			<div className='card-wrapper' onClick={() => {onClick(this.props.card)}}
				style={{backgroundImage: `url(${image})`,backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat"}}
			>
			</div>
		)
	}
}

export default Card;