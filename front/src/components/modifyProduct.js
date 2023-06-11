
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ModifyProduct = () => {
    const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  
  const id = window.location.pathname.replace('/modifyProduct/', '');
  console.log(id)
  const url = "http://localhost:5002/api/v1/produits/" + id;
 

  const JWT = localStorage.getItem("token");
  const config = {
      headers: {
          Authorization: `Bearer ${JWT}`,
      }};
  const navigate = useNavigate();
  const [produit, setProduit] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [user, setUser] = useState("");
  
  const getProduct = () => {
        console.log(url)
      axios.get(url)
      .then(res => {
        const produit = res.data;
        setProduit(produit);
        console.log(produit)
        setSelectedProduct(produit._id)
        setTitle(produit.title)
        setImage(produit.image)
        setDescription(produit.description)
        setPrice(produit.price)
        setSize(produit.size)
        setColor(produit.color)
      })
  }
  const data = {
        "title": title,
        "image": image,
        "description": description,
        "price": price,
        "size": size,
        "color": color,

  }
  
 
const modifyProduct = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5002/api/v1/produits/${id}`,data,config).then((res) => {
        console.log(res.data);
        alert("Product Modified");
        navigate("/");
    }).catch((err) => {
        console.log(err);
        alert("Failed to modify product");
    })
};

  useEffect(() => {
    axios.get("http://localhost:5002/api/v1/users/me", config).then((res) => {
        console.log(res.data);
        setUser(res.data);
  }).catch((err) => {
      console.log(err);
  })

    getProduct();
  }, []);
  
  return (
      <>
      <div className="bg-gray-100 p-4">
      <form onSubmit={modifyProduct} className="flex flex-col gap-4">
        <label htmlFor="product" className="font-bold text-lg">Product Name:</label>
        <input type="text" id="product" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-400 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 ring-blue-500" />
        <input type="text" id="product" value={price} onChange={(e) => setPrice(e.target.value)} className="border border-gray-400 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 ring-blue-500" />
        <input type="text" id="product" value={size} onChange={(e) => setSize(e.target.value)} className="border border-gray-400 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 ring-blue-500" />
        <input type="text" id="product" value={color} onChange={(e) => setColor(e.target.value)} className="border border-gray-400 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 ring-blue-500" />
        <input type="text" id="product" value={image} onChange={(e) => setImage(e.target.value)} className="border border-gray-400 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 ring-blue-500" />
        <input type="text" id="product" value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-400 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 focus:ring-1 ring-blue-500" />

        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-md">Modify Product</button>
      </form>
    </div>
       
      </>
    )
};
  
export default ModifyProduct;