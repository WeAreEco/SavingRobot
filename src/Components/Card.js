import React, { Component } from 'react';

class Card extends Component {
	render() {
		const { image} = this.props.card;
		return (
			<div className='card-wrapper'
				style={{backgroundImage: `url(${image})`,backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat"}}
			>
			</div>
		)
	}
}

export default Card;