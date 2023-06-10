import { useEffect, useState } from "react";
import api from "../boot/axios";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState("");


  

  
  const [user, setUser] = useState("");
  const [code, setCode] = useState("");
  const [orders, setOrders] = useState([]);
  const [productTitle, setProductTitle] = useState([]);
  const [productId, setProductId] = useState([]);
  const [productImg, setProductImg] = useState([]);
  const [productPrice, setProductPrice] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(code);
  const token = localStorage.getItem("token");
  let navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const validationCode = {
    "settings.validation_email_token": code,
  };

  const validateEmail = () => {
    api.post(`/users/validate`, validationCode, config).then((res) => {
      const user = res.data;
      setUser(user);
      console.log(user);
    });
    // window.location.reload(true)

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Title :",title,"Image :", image, "desc :",description, "Cat :",category, "Price :",parseInt(price), "Size :",size, "Color :",color, "QUant :",quantity);
    api.post(`/produits`, { 
      "title": title,
      "description": description,
      "category": [category],
      "price": parseInt(price),
      "image": image,
      "size": size,
      "color": color,
      "quantity": parseInt(quantity)
     },config).then((res) => {
      alert("Product Created Successfully");
      window.location.reload(true)
      console.log(res);
    }).catch((err) => {
      console.log("Error Creating New Product: ", err);
    }
    )
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
		localStorage.removeItem("token");
      	navigate("/login");
    } else {
    const getProfile = async () =>{
		setLoading(true);
      api.get("/users/me", config).then((res) => {
        
        // if (res.status === 401) {
        //   localStorage.removeItem("token");
        //   navigate("/login");
        // }

        const user = res.data;
        
		setUser(user);
        console.log("user : ",user);
        api.get(`/orders/${user.id}`, config).then((res) => {
          const orders = res.data;
		  setOrders(res.data);
          console.log(res.data);
		  
		  orders.forEach((order =>{
        
			  order.products.forEach(async (product) => {
          const request  = []
			  request.push(api.get(
			`http://localhost:5002/api/v1/produits/${product.productId}`
		  ))
      const result = await Promise.all(request)
      result.forEach((result) => {
      const produits = result.data;
      console.log("Produit:", produits);
      productId.push(produits._id);
      productTitle.push(produits.title);
      productImg.push(produits.image); 
      productPrice.push(produits.price);
      

      })
      })}))})}).catch((err) => {
        if(err.response.data == "Authentication Error"){
          localStorage.removeItem("token");
          navigate("/login");
        }
    });}
      setTimeout(() => {
        setLoading(false);
      }, 2000);
   getProfile();
	
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            My Profile
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div class="p-16">
            <div class="p-8 bg-white shadow mt-24">
              <div class="grid grid-cols-1 md:grid-cols-3">
                <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"></div>{" "}
                <div class="relative">
                  <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-24 w-24"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div class="text-center mt-16"></div>
              </div>
              <div class="mt-20 text-center border-b pb-12">
                <h1 class="text-4xl font-medium text-gray-700">
                  {user.name}
                  <span class="font-light text-gray-500"></span>
                </h1>
                {user.isVerified ? (
                  <>
                    <p class="font-light text-gray-600 mt-3">
                      {user.email}{" "}
                      <p class="font-light text-green-500 mt-3">Verified</p>
                    </p>
                    {user.role === "admin" ? (
                      <>
                      <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded">
        <h1 className="text-2xl font-semibold mb-6 text-gray-700">
          Add Product
        </h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-full"
            required
          />
          
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-full"
            required
          />
          
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Color
          </label>
          <input
            type="text"
            id="color"
            name="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-full"
            required
          />
          
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Size
          </label>
          <input
            type="text"
            id="size"
            name="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-full"
            required
          />
          
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Quantity
          </label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-full"
            required
          />
          
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-full"
            required
          />
          
        </div>
        
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Image
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-gray-700 font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-full"
            rows={4}
            required
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
                      </>
                    ) : (
                      <>
                      
                        </>
                    )}
                  </>
                ) : (
                  <>
                    <p class="font-light text-gray-600 mt-3">
                      {user.email}{" "}
                      <p class="font-light text-red-600 mt-3">Not Verified</p>
                    </p>
                    

                    <form class="w-full max-w-sm py-2 px-4 ">
                      <div class="flex items-center border-b   border-indigo-500 py-2">
                        <input
                          class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="text"
                          placeholder="Validation Code"
                          onChange={(e) => setCode(e.target.value)}
                          required
                        />
                        <button
                          class="text-indigo-500 py-2 px-4  font-medium mt-4"
                          onClick={validateEmail}
                        >
                          {" "}
                          Verify
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
              <div class="mt-16">
                My orders list
                {orders.map((order, index) => (
                  <div
                    key={index}
                    class="flex justify-between items-center mt-6 pt-6 border-t"
                  >
                    <div class="grid grid-cols gap-6">
                      <div> address: {order.address}</div>
                      <div>Price: {order.amount}</div>
                      <div> Status: {order.status}</div>
                      <div>orderDate: {order.createdAt}</div>
                    </div>
                    {order.products.map((product, index) => (
                      <div key={index} class="grid grid-cols-5 gap-6">
                        <div>ProductId : {product.productId}</div>
                      </div>
                    ))}

                    {productTitle[index]}
                    
					<img  class="w-20" src={productImg[index]} alt="product" onClick={() => navigate("/product/" + productId[index])} />
          <br/> Click the image to see product details
          

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
