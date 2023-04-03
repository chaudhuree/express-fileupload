import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ProductItem from './ProductItem';
export default function ViewProduct() {
  const [products, setProducts] = useState([]);
  const productsRef = useRef(products);
  useEffect(() => {
    fetchProducts();
  }, [productsRef])
  const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:5000/api/v1/products');
    setProducts(data.products);
  }
  console.log(products);

  return (
    <div className='container'>
      <div className="row">
        {products?.map((product) => <ProductItem key={product._id} product={product}/>)}
      </div>
    </div>
  )
}
