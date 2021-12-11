import React, { Component} from 'react';

export default class Cart extends Component {
    render() {
        const { item, removeFromCart } = this.props;
        return (
            <div>
            <div>
                <img src={item.image} alt={item.title}></img>
            </div>
            <div>
            <div>{item.title}</div>
            <button onClick={() => removeFromCart(item)}>Remove</button>
            </div>
            </div>
        )           
    }
}