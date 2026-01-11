import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return <p className="text-center mt-20 text-xl">Loading Product...</p>;

  if (!product)
    return <p className="text-center mt-20 text-xl text-red-500">Product not found</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">

        {/* IMAGE */}
        <div className="bg-gray-50 rounded-3xl p-8 flex justify-center items-center shadow-lg hover:shadow-2xl transition duration-300">
          <img
            src={product?.image}
            alt={product?.name}
            className="h-[400px] md:h-[450px] object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              {product?.name}
            </h1>

            <p className="text-gray-500 mt-4 leading-relaxed">
              {product?.description}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <span className="text-3xl md:text-4xl font-bold text-green-600">
                ₹{product?.price}
              </span>
              <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                In Stock
              </span>
            </div>

            <ul className="mt-6 space-y-2 text-gray-600">
              <li>✔ Premium Quality</li>
              <li>✔ Cash On Delivery Available</li>
              <li>✔ 7 Days Easy Return</li>
              <li>✔ Free Delivery</li>
            </ul>
          </div>

          {/* ACTIONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              disabled={!product}
              onClick={() => addToCart(product)}
              className="flex-1 bg-black text-white py-4 rounded-2xl hover:bg-gray-900 transition-all font-semibold disabled:opacity-50"
            >
              Add To Cart
            </button>

            <button className="flex-1 border border-black py-4 rounded-2xl hover:bg-black hover:text-white transition-all font-semibold">
              Buy Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}