import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then(res => setProducts(res.data));
  }, []);

  return (
    <div className="bg-[#F3F4F6] min-h-screen py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Shop Premium</h1>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}