import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: ""
  });

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const placeOrder = async () => {
    try {
      if (!cartItems.length) return alert("Cart is empty");

      await API.post("/orders", {
        orderItems: cartItems,
        shippingAddress: address,
        totalPrice: total
      });

      clearCart();
      navigate("/my-orders");
    } catch (err) {
      alert("Please login before placing order");
    }
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen px-6 py-14">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">

        {/* ADDRESS */}
        <div className="bg-white rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-6">Delivery Address</h2>

          <input
            placeholder="Full Name"
            className="w-full border p-3 rounded-xl mb-4"
            onChange={e => setAddress({ ...address, name: e.target.value })}
          />
          <input
            placeholder="Phone Number"
            className="w-full border p-3 rounded-xl mb-4"
            onChange={e => setAddress({ ...address, phone: e.target.value })}
          />
          <input
            placeholder="Street Address"
            className="w-full border p-3 rounded-xl mb-4"
            onChange={e => setAddress({ ...address, street: e.target.value })}
          />
          <input
            placeholder="City"
            className="w-full border p-3 rounded-xl mb-4"
            onChange={e => setAddress({ ...address, city: e.target.value })}
          />
          <input
            placeholder="Pincode"
            className="w-full border p-3 rounded-xl"
            onChange={e => setAddress({ ...address, pincode: e.target.value })}
          />
        </div>

        {/* SUMMARY */}
        <div className="bg-white rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          {cartItems.map(i => (
            <div key={i._id} className="flex justify-between mb-3 text-gray-600">
              <span>{i.name} × {i.qty}</span>
              <span>₹{i.price * i.qty}</span>
            </div>
          ))}

          <div className="border-t mt-6 pt-6 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={placeOrder}
            className="w-full mt-8 bg-black text-white py-4 rounded-xl hover:opacity-90"
          >
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
}