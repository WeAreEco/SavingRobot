import React, { Component } from 'react';
import Card from './Card';

class CardContainer extends Component {

	state = {
		selected: {},
		selectedCard: {}
	};
	componentDidMount(){
		//this.props.getBotMessageGroup();
	}
	getCards() {
		const { cards } = this.props;
		const allCards =  cards.map((card, i) => {
			return <Card card={card}/>;
		});
		return allCards;
	}

	render() {
		return (
			<div className='cards-container'>
				{this.getCards()}	
			</div>
		)
	}
}

export default CardContainer;