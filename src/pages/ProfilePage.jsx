import React, { Component } from "react";

class ProfilePage extends Component {
  navItems = [
    { key: "profile", label: "Profile Details" },
    { key: "orders", label: "Order History" },
    { key: "wishlist", label: "Wishlist" }
  ];

  // will hold DOM nodes via callback refs
  navRefs = [];

  state = {
    user: {
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      address: localStorage.getItem("address") || "",
      phone: localStorage.getItem("phone") || ""
    },
    orders: [
      { id: 1, date: "2023-10-21", status: "Delivered", total: 299 },
      { id: 2, date: "2023-10-15", status: "In Transit", total: 150 }
    ],
    activeTab: "profile",
    saved: false
  };

  handleChange = (e) => {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value }
    });
  };

  handleSave = () => {
    const { user } = this.state;
    Object.keys(user).forEach(key => {
      localStorage.setItem(key, user[key]);
    });
    this.setState({ saved: true });
    setTimeout(() => this.setState({ saved: false }), 2000);
  };

  handleNavKeyDown = (e) => {
    const { key } = e;
    const idx = this.navRefs.indexOf(document.activeElement);
    if (idx === -1) return;

    let newIdx = idx;
    if (key === "ArrowRight") {
      e.preventDefault();
      newIdx = (idx + 1) % this.navRefs.length;
    } else if (key === "ArrowLeft") {
      e.preventDefault();
      newIdx = (idx - 1 + this.navRefs.length) % this.navRefs.length;
    } else if (key === "Home") {
      e.preventDefault();
      newIdx = 0;
    } else if (key === "End") {
      e.preventDefault();
      newIdx = this.navRefs.length - 1;
    } else {
      return;
    }

    const nextKey = this.navItems[newIdx].key;
    this.setState({ activeTab: nextKey }, () => {
      const node = this.navRefs[newIdx];
      if (node && typeof node.focus === "function") node.focus();
    });
  };

  render() {
    const { user, orders, activeTab } = this.state;

    return (
      <div className="profile-page" role="main" aria-label="Profile Settings">
        <div
          className="profile-nav"
          role="tablist"
          aria-label="Profile Sections"
          onKeyDown={this.handleNavKeyDown}
        >
          {this.navItems.map((item, index) => (
            <button
              key={item.key}
              id={`tab-${item.key}`}
              role="tab"
              aria-selected={activeTab === item.key}
              aria-controls={`${item.key}-panel`}
              aria-label={`${item.label} section`}
              className={`tab ${activeTab === item.key ? "active" : ""}`}
              onClick={() => this.setState({ activeTab: item.key })}
              ref={el => (this.navRefs[index] = el)}
              tabIndex={activeTab === item.key ? 0 : -1}
            >
              {item.label}
            </button>
          ))}
        </div>

        {activeTab === "profile" && (
          <div
            id="profile-panel"
            role="tabpanel"
            aria-labelledby="tab-profile"
            className="profile-form"
          >
            <h2>Profile Details</h2>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                value={user.name}
                onChange={this.handleChange}
                aria-label="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={this.handleChange}
                aria-label="Your email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                value={user.phone}
                onChange={this.handleChange}
                aria-label="Your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Shipping Address</label>
              <textarea
                id="address"
                name="address"
                value={user.address}
                onChange={this.handleChange}
                aria-label="Your shipping address"
              />
            </div>

            <button 
              onClick={this.handleSave} 
              className="btn primary"
              aria-label="Save profile changes"
            >
              Save Changes
            </button>
            {this.state.saved && (
              <p className="success" role="alert" aria-live="polite">
                ✅ Profile updated successfully!
              </p>
            )}
          </div>
        )}

        {activeTab === "orders" && (
          <div
            id="orders-panel"
            role="tabpanel"
            aria-labelledby="tab-orders"
            className="orders-section"
          >
            <h2>Order History</h2>
            <div className="orders-list">
              {orders.map(order => (
                <div 
                  key={order.id} 
                  className="order-card"
                  role="article"
                  aria-label={`Order ${order.id} from ${order.date}`}
                >
                  <div className="order-header">
                    <span>Order #{order.id}</span>
                    <span 
                      className={`status ${order.status.toLowerCase()}`}
                      role="status"
                      aria-label={`Order status: ${order.status}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <p>Date: {order.date}</p>
                    <p>Total: ${order.total}</p>
                  </div>
                  <button 
                    className="btn secondary"
                    aria-label={`View details for order ${order.id}`}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "wishlist" && (
          <div
            id="wishlist-panel"
            role="tabpanel"
            aria-labelledby="tab-wishlist"
            className="orders-section"
          >
            <h2>Wishlist</h2>
            <p>Your wishlist is empty.</p>
          </div>
        )}
      </div>
    );
  }
}

export default ProfilePage;
