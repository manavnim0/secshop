import { useEffect, useState } from 'react'
import axios from 'axios';

type Product = { id: string; name: string; price: number; };

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/products').then(r => setProducts(r.data.data))
      .catch(() => setProducts([]))
  }, []);


  return (
    <div style={{ padding: 20 }}>
      <h1> Secure Shop - Frontend (Phase 0) </h1>
      <ul>
        {
          products.map(p => (
            <li key={p.id}>{p.name} - ${p.price}</li>
          ))}
      </ul>
    </div >
  );
}

