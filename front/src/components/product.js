
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Product = () => {
    
  const id = window.location.pathname.replace('/product/', '');
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
      })
  }
  
  const addtoCart = () => {
    const data = {
        products: [ 
            {
                productId: selectedProduct,
                quantity: 1
            }
            
        ],
        
    }     
    axios.post(`http://localhost:5002/api/v1/cart`, data,config)
    .then((res) => {
        
      
        alert("Added to Cart");
        
        navigate("/");
    })
    .catch((err) => {
        alert("Failed to add to Cart");
    });
};
const modifyProduct = () => {
    navigate("/modifyProduct/" + selectedProduct);
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
      <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
            <div className='flex flex-col gap-6 lg:w-2/4'>
                <img src={produit.image} alt="" className='w-full h-full aspect-square object-cover rounded-xl'/>
                <div className='flex flex-row justify-between h-24'>
                    <img src={produit.image} alt="" className='w-24 h-24 rounded-md cursor-pointer'/>
                
                </div>
            </div>
            {/* ABOUT */}
            <div className='flex flex-col gap-4 lg:w-2/4'>
                <div>
                    <span className=' text-violet-600 font-semibold'>{produit.category}</span>
                    <h1 className='text-3xl font-bold'>{produit.title}</h1>
                    <input className="hidden" type="text" readOnly={selectedProduct}></input>
                </div>
                <p className='text-gray-700'>
                    {produit.description}
                    <br/> Size : {produit.size}
                </p>
                <h6 className='text-2xl font-semibold'>{produit.price}€</h6>
                <div className='flex flex-row items-center gap-12'>
                    
                    <button onClick={addtoCart} className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full' >Add to Cart</button>
                    {user.role=="admin" ? (
                                    <>
                                       <button onClick={modifyProduct} className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full' >Modify</button>
                                    </>
                                ) : (
                                    <>
                                        
                                    </>
                                )}
                    
                    
                </div>
            </div>
        </div>
        {/* <div className="mainDiv">
          <div className="div1">
            <input className="hidden" type="text" readOnly={selectedProduct}></input>
            <h1 className="prodTitle">{produit.title}</h1>
            <img className="prodImg" src={produit.image}/>
          </div>
          <div className="div2">
            <p>description :</p>
            <p className="explain">{produit.description}</p>
            <p> vendu par :</p>
            <p className="seller"><b>{produit.username}</b></p>
            <p className="money">Price: <b>{produit.price}$</b></p>
            <button onClick={handleBuy} className="buy"> BUY ! </button>
          </div>
        </div> */}
      </>
    )
};
  
export default Product;