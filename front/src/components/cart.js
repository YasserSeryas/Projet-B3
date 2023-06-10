import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import api from '../boot/axios'
import { useNavigate } from "react-router-dom";

    

export default function Example() {
  const [open, setOpen] = useState(true)
  const token = localStorage.getItem("token");
const [cartProducts,setCart] = useState([]);
const [cartId,setCartId] = useState([])
const [user, setUser] = useState("");
const [loading, setLoading] = useState(false);
const [productTitle, setProductTitle] = useState([]);
const [productId, setProductId] = useState([]);
const [productImg, setProductImg] = useState([]);
const [productPrice, setProductPrice] = useState([]);
const [productQty, setProductQty] = useState("");
const [address, setAddress] = useState("");
console.log(address);
let navigate = useNavigate();
const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
		localStorage.removeItem("token");
      	navigate("/login");
    } else {
    const getProfileCart = async () =>{
		setLoading(true);
      api.get("/users/me", config).then((res) => {

        const user = res.data;
		setUser(user);
        console.log("user : ",user);
        api.get(`/cart/${user.id}`, config).then((res) => {
          const cart = res.data;
		  setCart(res.data);
          console.log("Cart :",res.data);
		  
      console.log("Cart Id :",cartId);
		  cart.forEach((cart =>{
        cartId.push(cart._id);
        console.log("Cart Id :",cartId);
			  cart.products.forEach(async (product) => {
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
    setProductQty(1)
      

      })
      })}))})}).catch((err) => {
        if(err.response.data == "Authentication Error"){
          localStorage.removeItem("token");
          navigate("/login");
        }
    });}
      setTimeout(() => {
      setLoading(false);
    }, 1000);
        getProfileCart();
    
		  

		
        
	
		
      
	  
    
	
	
  }
    
}, [])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartProducts.map((product,index) => (
                                
                                
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={productImg[index]}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>{productTitle[index]}</a>
                                      </h3>
                                      <p className="ml-4">{productPrice[index]}€</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty {productQty}</p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() => { api.delete(`http://localhost:5002/api/v1/cart/${cartId[index]}`, config).then((res) => {
                                          alert("Removed successfully");
                                          window.location.reload(false);
                                      }).catch((err) => {
                                          alert("Error removing cart");
                                      
                                      })
                                    }}
                                      >
                                        Remove
                                      </button>
                                      <button onClick={ () => {
    const data = {
        products: [
            {
                productId: productId[index],
                quantity: 1
            }

        ],
        amount: productPrice[index],
        address: address
    }
    api.post(`http://localhost:5002/api/v1/orders`, data,config).then((res) => {
        alert("Order created successfully");
        api.delete(`http://localhost:5002/api/v1/cart/${cartId[index]}`, config).then((res) => {
            alert(" Emptied Cart successfully");
        })
}).catch((err) => {
    alert("Error creating order");
})
    navigate("/dashboard");
}}
                         
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </button>
                       
                                      

                                    </div>
                                    
                                  </div>
                                </div>
                                
                              </li>
                              
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <input
                            type="email"
                            onChange={(e) => setAddress(e.target.value)}
                            className="border rounded-lg p-1"
                            placeholder="Address"
                            required
                        />

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                     
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
