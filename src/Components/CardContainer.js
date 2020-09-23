import React, { Component } from 'react';
import Card from './Card';

class CardContainer extends Component {

	state = {
		selected: {},
		selectedCard: {}
	};

	onClick = (card) => {
		const {name} = card;
		this.props.addMessage({
			type: 'user',
			message:name
		});
	};
	getCards() {
		const { cards } = this.props;
		const allCards =  cards.map((card, i) => {
			return <Card onClick={this.onClick} card={card}/>;
		});
		allCards.push(<div className='padding-adjust' id={69}/>);
		return allCards;
	}

	render() {
		return (
			<div className='cards-container'>
				<hr/>
				<div className="cards-inner-container">
					{this.getCards()}
				</div>
			</div>
		)
	}
}

export default CardContainer;