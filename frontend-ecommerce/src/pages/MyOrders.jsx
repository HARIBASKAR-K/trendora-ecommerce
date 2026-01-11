import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/myorders");
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  if (!user) return <p className="text-center mt-20 text-xl">Please login to view your orders.</p>;
  if (loading) return <p className="text-center mt-20 text-xl">Loading your orders...</p>;
  if (orders.length === 0) return <p className="text-center mt-20 text-xl">You have not placed any orders yet.</p>;

  return (
    <div className="bg-[#F3F4F6] min-h-screen px-6 py-14">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10">My Orders</h1>

        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-3xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Order ID: {order._id}</h2>
              <p className="text-gray-600 mb-2">Total: ₹{order.totalPrice}</p>
              <p className="text-gray-600 mb-4">Status: {order.isPaid ? "Paid" : "Pending Payment"}</p>

              <div className="border-t pt-4 space-y-2">
                {order.orderItems.map(item => (
                  <div key={item._id} className="flex justify-between text-gray-700">
                    <span>{item.name} × {item.qty}</span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}