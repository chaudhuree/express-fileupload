[postman](https://documenter.getpostman.com/view/20773865/2s93RWMqcS)

> in this project i want to create product. so in product i need image and i have saved the image in /public/upload folder. and in response i will get a path.
> and this path wil be stored in the product model image field.

> so in controller i have created two controller one is for image upload and another is for product creation.

> in image upload i will get the image url as the response. then with this url later i will create the product.

> so to create product i have to upload the image first. thats why in react app while createting the product in the image input i have used an onchange handler which will fire when i will chose the image and in response i will get the image url. then in form handler on submit event i will create the product with the image url and ohther necessary data.

## onchage handler for image upload

```
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
```

## onsubmit handler for product creation

```
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
```

> while viewing the product i will get product. in the product i will get the image url. but the url is not completed. the folder is in the server. i have to indicate the server then append the url with that. thats how i will get the proper image.

```
<img  src={`http://localhost:5000/${product?.image}`} className="img-fluid card-img-top" alt="image" />

```
