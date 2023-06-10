

import {Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


const Home = () => {
  let navigate = useNavigate();

  const [produits, setProduits] = useState([]);
  

  
  const filteredProduct = () => {
    axios.get(`http://localhost:5002/api/v1/produits?category=women`)
    .then(res => {
        const produits = res.data;
        setProduits(produits);
        console.log(produits)
    })
}
  

  useEffect(() => {
    filteredProduct();
  }, []);

  return (
    <>
    <div onClick={() => navigate(-1)}>
        <h1 className='text-2xl font-bold'> Back </h1>
        </div>
      <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8" >
          {produits.map((produit) => (
            <div className="card" onClick={() => navigate("/product/" + produit._id)}>
            <div key={produit._id} className="group relative" >
              <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={produit.image}
                  alt={produit.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {produit.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">color : {produit.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{produit.price}€</p>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
      {/* <div className="cardsDiv">
        {produits.map((produit)=> (
          <Card key={produit._id} id={produit._id} src={produit.image}  title={produit.title} description={produit.description} price={produit.price} />
        ))}
      </div> */}
    </>
  )
};
  
export default Home;