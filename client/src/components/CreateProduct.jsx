import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function CreateProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  useEffect(() => {
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/v1/products', {
        name,
        price,
        image
      })
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file)
    try {
      const { data } = await axios.post('http://localhost:5000/api/v1/products/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      const { src } = data;
      console.log(src);
      setImage(src);
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  }
  return (
    <div className='container my-4'>
      <form onSubmit={handleCreate}>
        <div className="row">
          <div className="col-md-6 offset-md-3 mb-3">
            <div className="input-group input-group-sm">
              <span className="input-group-text" id="inputGroup-sizing-sm">Name</span>
              <input onChange={e => setName(e.target.value)} className="form-control" type="text" value={name} />

            </div>

          </div>
          <div className="col-md-6 offset-md-3 mb-3">
            <div className="input-group input-group-sm">
              <span className="input-group-text" id="inputGroup-sizing-sm">price:</span>
              <input onChange={e => setPrice(e.target.value)} className="form-control" type="number" value={price} />
            </div>

          </div>
          <div className="col-md-6 offset-md-3 mb-3">
            <div className="input-group input-group-sm">
              <input className="form-control" type="file" accept="image/*" onChange={handleUpload} />
            </div>
          </div>
        </div>
        <div className="row">
        <div className="col-md-6 offset-md-3">
        <div className='d-md-grid d-md-block'>
        <button type='submit' className='btn btn-outline-primary mb-3'>submit</button>
      </div>
        </div>
        </div>
      </form>
    </div>
  )
}


