import React, { Component } from 'react';

export default class Form extends Component {
    constructor() {
        super();
        this.state = {
          name : "",
          address: "",
          email: "",
        }
      }

      initialCheckoutForm = {
        name: "",
        email: "",
        address: ""
      }
    
      handleFormChange = (e) => {
        this.setState({...this.state,
            [e.target.name]:e.target.value})
      }

      createOrder = (e) => {
        //   debugger
          e.preventDefault();
          const order = {
              name: this.state.name,
              email: this.state.email,
              address: this.state.address,
              cartItems: this.props.cartItems,              
          }
         this.props.createOrder(order)
      }
    render() {
        const formHandler= this.handleFormChange
        return (
            <div className="cart">
                  <form onSubmit={this.createOrder}>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input name="email" 
                        value={this.state.email}
                        type="email" required
                        onChange={formHandler}></input>
                      </li>
                      <li>
                        <label>Name</label>
                        <input name="name" type="text" required onChange={formHandler}></input>
                      </li>
                      <li>
                        <label>Address</label>
                        <input name="address" type="text" required onChange={formHandler}></input>
                      </li>
                      <li>
                          <button className="button primary" type="submit">
                              Checkout
                          </button>
                      </li>
                    </ul>
                  </form>
                </div>
        )
    }
}