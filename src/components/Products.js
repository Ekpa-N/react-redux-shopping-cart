/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

export default class Products extends Component {
       
    render() {
        // const { _id, image, 
        //     title, description,
        // availableSizes, price } = this.props.product;
        return (
            
                <div className="product">
                    <a href={"#" + this.props.product._id} onClick={()=>this.props.openModal(this.props.product)}>
                        <img src={this.props.product.image} alt="product"></img>
                        <p>
                            {this.props.product.title}
                        </p>
                    </a>
                    <div className="product-price">
                        <div>{this.props.product.price}</div>
                        <button onClick={()=>this.props.addToCart(this.props.product)}>
                            Add to cart
                        </button>
                    </div>
                </div>
           
        )
    }
}