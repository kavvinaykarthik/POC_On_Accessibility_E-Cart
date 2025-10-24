import React, { Component } from "react";
import '../styles/HomePage.css';
class HomePage extends Component {
  state = {
    featuredProducts: [
      { id: 1, name: "Wireless Headphones", price: 120, image: "headphones.jpg", discount: 15 },
      { id: 2, name: "Smart Watch", price: 180, image: "smartwatch.jpg", discount: 20 },
      { id: 3, name: "Bluetooth Speaker", price: 90, image: "speaker.jpg", discount: 10 }
    ],
    categories: [
      { id: 1, name: "Electronics", icon: "💻" },
      { id: 2, name: "Audio", icon: "🎧" },
      { id: 3, name: "Wearables", icon: "⌚" },
      { id: 4, name: "Accessories", icon: "🎮" }
    ]
  };

  render() {
    return (
      <div className="home">
        <section className="hero">
          <h1>Welcome to TechStore</h1>
          <p>Your one-stop shop for premium electronics</p>
          <button className="btn primary">Shop Now</button>
        </section>

        <section className="categories">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            {this.state.categories.map(category => (
              <div key={category.id} className="category-card">
                <span className="category-icon">{category.icon}</span>
                <h3>{category.name}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="featured">
          <h2>Featured Products</h2>
          <div className="featured-grid">
            {this.state.featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="discount-badge">{product.discount}% OFF</div>
                <h3>{product.name}</h3>
                <p className="price">
                  <span className="original">${product.price}</span>
                  <span className="discounted">
                    ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </span>
                </p>
                <button className="btn secondary">View Details</button>
              </div>
            ))}
          </div>
        </section>

        <section className="benefits">
          <h2>Why Choose Us?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <span>🚚</span>
              <h3>Free Shipping</h3>
              <p>On orders over $50</p>
            </div>
            <div className="benefit-card">
              <span>🔄</span>
              <h3>Easy Returns</h3>
              <p>30-day return policy</p>
            </div>
            <div className="benefit-card">
              <span>🔒</span>
              <h3>Secure Payments</h3>
              <p>100% secure checkout</p>
            </div>
          </div>
        </section>

        <section className="newsletter">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for exclusive deals and updates</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button className="btn primary">Subscribe</button>
          </div>
        </section>
      </div>
    );
  }
}

export default HomePage;
