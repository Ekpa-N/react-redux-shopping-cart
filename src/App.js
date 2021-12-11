import React, { Component} from 'react';
import data from "./data.json"
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import Form from './components/Form'
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom'

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems") ? 
      JSON.parse(localStorage.getItem("cartItems")):[],
      size:"",
      sort:"",
      total: JSON.parse(localStorage.getItem("cartItems")).map((item) => {
        return item.total
      }),
      showCheckout: false,
      activeProduct: null,
    }
  }
  createOrder = (order) => {
    alert("Need to create order for "+ order.name)
  }


  retriever = () => {
    return JSON.parse(localStorage.getItem("cartItems"))
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems;
    const newCartItems = cartItems.filter((item) => (
       item._id !== product._id
    ))
    const newTotal = newCartItems.map((item) => {
      return item.total
    })
    localStorage.setItem("cartItems", JSON.stringify(newCartItems))
    this.setState({...this.state, cartItems: this.retriever(), total: newTotal})

  }

  totalCreator = (a, b) => {
    return a + b
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems
    const currentProduct = cartItems.find(item => {
      return item._id === product._id
    })
    // debugger
    let newCart = currentProduct ?      
      cartItems.map(item => {
        let total = item.count * item.price
        return item._id === product._id ?
        {...item, count: item.count+1, total: total + item.price} : item
      }) 
     : cartItems.concat({...product, count: 1, total: product.price})
    
    const newTotal = newCart.map((item) => {
      return item.total
    })
    localStorage.setItem("cartItems", JSON.stringify(newCart))
    this.setState({...this.state, cartItems: this.retriever(), total: newTotal})
    console.log(".")
  }

  filterProducts = (event) => {
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({
        size: event.target.value,
        products: data.products,
      })
    } else {

      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };

  sumTotal = (a, b) => {
    return a + b
  }


  sortProducts = (event) => {
    const sort = event.target.value;
    console.log(event.target.value)
    this.setState((state) => ({
      sort: sort,
      products: this.state.products.slice().sort((a, b)=> (
        sort === "lowest" ?
        a.price - b.price : sort === "highest" ?
        b.price - a.price : a._id - b._id
      ))
    }));
  }

  openModal = (product) => {
    this.setState({...this.state, activeProduct: product})
  }

  closeModal = () => {
    this.setState({...this.state, activeProduct: null})
  }
  
  addClose = async (product) => {
    await this.addToCart(product)
    this.closeModal()
  }

  render() {
    
    return (
      <div className="container">
        <header className="App-header">
          <a href ="/"> React Shopping Cart </a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <div>
                <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
                />
                <ul className="products">
                  {this.state.products.map(product => (
                    <li key ={product._id}>
                      <Products product={product} addToCart={this.addToCart} openModal={this.openModal} />
                    </li>
                  ))}
                </ul>
                {this.state.activeProduct && (
                  <Modal isOpen={true}>
                    <Zoom>
                      <button className="close-modal" onClick={this.closeModal}>
                        X
                      </button>
                      <div className="product-details">
                        <img src={this.state.activeProduct.image} alt=""></img>
                        <div className="product-details-description">
                          <p>
                            <strong>{this.state.activeProduct.title}</strong>
                          </p>
                          <p>
                            {this.state.activeProduct.description}
                          </p>
                          <p>
                            Available Sizes: {" "}
                            {this.state.activeProduct.availableSizes.map((size, index) => {
                              return <span key={index}>
                                {" "}
                                <button className="button">{size}</button>
                              </span>
                            })}
                          </p>
                          <div className="product-price">
                            <div>
                              {this.state.activeProduct.price}
                            </div>
                            <button className="button primary" onClick={(e) => this.addClose(this.state.activeProduct)}>
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </Zoom>
                  </Modal>
                )}
              </div>
            </div>
            <div className="sidebar">
            <div>
                {this.state.cartItems.length === 0 ?
                (<div className="cart cart-header">
                    Cart is empty
                </div>) : 
                (<div className="cart cart-header">
                    You have {this.state.cartItems.length} items in the cart{""}
                </div>) }
            </div>
            <div className="cart">
              <ul className="cart-items">
                {this.state.cartItems.map((item)=> {
                  return <li key = {item._id}>
                    <Cart item={item} removeFromCart={this.removeFromCart} />
                  </li>
                  })}
              </ul>
            </div>  
            <div className="cart">
              <div className="total">
                <div>
                  Total:{""}
                  {this.state.total.length ?
                  this.state.total.reduce(this.sumTotal) :
                  ""}
                </div>
                <button onClick={() => {
                  this.setState({...this.state, showCheckout: true })
                }} className="button primary">
                  Proceed
                  </button>
              </div>
              {this.state.showCheckout && (
                <Form cartItems={this.state.cartItems} createOrder={this.createOrder} />
              )}
            </div>          
            </div>
          </div>
        </main>
        <footer>
          All Rights Reserved.
        </footer>
      </div>
    );
  }
}

export default App;
