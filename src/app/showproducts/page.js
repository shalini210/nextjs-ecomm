
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { get_all_products } from '../axiosservice';

export default function Showproducts(props) {
  const[productData,setProductData]=useState([]);
  const search_ref = useRef();
  async function fetchData()
  {
let products=   await (get_all_products());
setProductData(products.map((p)=>
{
    return <tr key={p._id} className="h-8 border-b-2">
        
        <td>{p.title}</td>
    <td>{p.description}</td>
    <td>{p.company}</td>
    <td>{p.price}</td>
    </tr>

}

))
  }
  useEffect( ()=>
  { 
      fetchData()
  },[]);
  let search_Product = ()=>
  {
    const keywords = search_ref.current.value;
    if(!keywords)
    {
      fetchData();
    }
    else
    {
    setProductData(productData.filter((product) =>  JSON.stringify(product).includes(keywords)));
    }
  }
 
  return (
    <div> 
      <input type="text" placeholder='Search here ' ref={search_ref} onChange={()=>search_Product()}></input>
      <table className="w-3/4 mt-10 mx-auto border-2 border-blue-200 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-blue-200 dark:bg-gray-700 dark:text-gray-400">
        <tr>
        
            <th scope="col" className="px-6 py-3">
                Product name
            </th>
            <th scope="col" className="px-6 py-3">
                Description
            </th>
            <th scope="col" className="px-6 py-3">
                company
            </th>
            <th scope="col" className="px-6 py-3">
                Price
            </th>

        </tr>
    </thead>
    <tbody>

        {productData}
        </tbody></table></div>



  )
}
