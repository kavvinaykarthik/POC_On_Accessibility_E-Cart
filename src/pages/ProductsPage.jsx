import React, { Component } from "react";

class ProductsPage extends Component {
  state = {
    products: [
      { id: 1, name: "Wireless Headphones", price: 120 },
      { id: 2, name: "Smart Watch", price: 180 },
      { id: 3, name: "Bluetooth Speaker", price: 90 }
    ],
    cart: [],
    currentFocusIndex: 0,
    cartFocusIndex: 0 // New state for cart focus
  };

  // Add new refs array to store references to product cards
  productRefs = [];
  // Add new refs array to store references to cart items
  cartRefs = [];

  componentDidMount() {
    // Initialize refs array based on products length
    this.productRefs = this.state.products.map(() => React.createRef());
    this.cartRefs = this.state.cart.map(() => React.createRef()); // Initialize cart refs
  }

  handleKeyDown = (e) => {
    const { products, cart } = this.state;
    let newIndex = this.state.currentFocusIndex;

    switch (e.key) {
      case 'ArrowRight':
        newIndex = (this.state.currentFocusIndex + 1) % products.length;
        break;
      case 'ArrowLeft':
        newIndex = (this.state.currentFocusIndex - 1 + products.length) % products.length;
        break;
      case 'ArrowDown':
        if (cart.length > 0) {
          newIndex = (this.state.cartFocusIndex + 1) % cart.length;
          this.setState({ cartFocusIndex: newIndex }, () => {
            this.cartRefs[newIndex].current.focus();
          });
        }
        return;
      case 'ArrowUp':
        if (cart.length > 0) {
          newIndex = (this.state.cartFocusIndex - 1 + cart.length) % cart.length;
          this.setState({ cartFocusIndex: newIndex }, () => {
            this.cartRefs[newIndex].current.focus();
          });
        }
        return;
      default:
        return;
    }

    this.setState({ currentFocusIndex: newIndex }, () => {
      this.productRefs[newIndex].current.focus();
    });
  };

  addToCart = (product) => {
    const existingProduct = this.state.cart.find(item => item.id === product.id);
    if (existingProduct) {
      this.setState(prevState => ({
        cart: prevState.cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }));
    } else {
      this.setState({ cart: [...this.state.cart, { ...product, quantity: 1 }] });
    }
  };

  removeFromCart = (productId) => {
    this.setState(prevState => ({
      cart: prevState.cart.filter(item => item.id !== productId)
    }));
  };

  calculateTotal = () => {
    return this.state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  render() {
    return (
      <div className="products" role="main">
        <h1>Products</h1>
        <div 
          className="products-grid" 
          role="grid"
          onKeyDown={this.handleKeyDown}
        >
          {this.state.products.map((p, index) => (
            <div 
              key={p.id} 
              className="card" 
              tabIndex="0"
              ref={this.productRefs[index]}
              aria-label={`Product: ${p.name}, Price: $${p.price}`}
            >
              <h3>{p.name}</h3>
              <p>${p.price}</p>
              <button 
                onClick={() => this.addToCart(p)} 
                className="btn primary" 
                aria-label={`Add ${p.name} to cart`}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="cart" aria-live="polite">
          <h2>Your Cart ({this.state.cart.length})</h2>
          {this.state.cart.map((item, index) => (
            <div 
              key={item.id} 
              className="cart-item" 
              tabIndex="0" 
              ref={this.cartRefs[index]} // Assign ref to cart items
              aria-label={`Cart item: ${item.name}, Quantity: ${item.quantity}`}
            >
              <p>🛒 {item.name} (x{item.quantity})</p>
              <button 
                onClick={() => this.removeFromCart(item.id)} 
                className="btn secondary" 
                aria-label={`Remove ${item.name} from cart`}
              >
                Remove
              </button>
            </div>
          ))}
          <h3>Total: ${this.calculateTotal()}</h3>
        </div>
      </div>
    );
  }
}

export default ProductsPage;
