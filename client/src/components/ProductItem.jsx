import React from 'react'

export default function ProductItem({ product }) {
  return (
    <div className='col-md-4'>
      <div className="card" style={{ width: '18rem' }}>
        <img  src={`http://localhost:5000/${product?.image}`} className="img-fluid card-img-top" alt="image" />
        <div className="card-body">
          <h5 className="card-title">{product?.name}</h5>
          <p className="card-text">{product?.price}</p>
        </div>
      </div>

    </div>
  )
}
