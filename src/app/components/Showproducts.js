
'use client'
import React, { useEffect, useState } from 'react'
import { get_all_products } from '../axiosservice';

export default function Showproducts(props) {
  const[productData,setProductData]=useState([]);
  async function fetchData()
  {
let products=   await (get_all_products());
setProductData(products.map((p)=>
{
    return <tr key={p._id} className="h-8 border-b-2">
        <td>{p._id}</td>
        <td>{p.title}</td>
    <td>{p.description}</td>
    <td>{p.company}</td>
    <td>{p.price}</td>
    <td><input type="button" onClick={()=>props.find(p)} value="Edit"></input></td>
    <td>
        <input type="button" onClick={()=>props.delete(p._id)}
        value="Delete"></input>
    </td></tr>

}
// JSON.stringify(p)
//b0\",\"title\":\"das\",\"description\":\" das\",\"company\":\"dsa\",\"price\":12,\"__v\":0}"]
))
  }
  useEffect( ()=>
  { 
      fetchData()
  },[]);
 
  return (
    <div> <table class="w-3/4 mt-10 mx-auto border-2 border-blue-200 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-blue-200 dark:bg-gray-700 dark:text-gray-400">
        <tr>
        <th scope="col" class="px-6 py-3">
               id
            </th>
            <th scope="col" class="px-6 py-3">
                Product name
            </th>
            <th scope="col" class="px-6 py-3">
                Description
            </th>
            <th scope="col" class="px-6 py-3">
                company
            </th>
            <th scope="col" class="px-6 py-3">
                Price
            </th>
            <th scope="col" class="px-6 py-3">
                Edit
            </th>
            <th scope="col" class="px-6 py-3">
Delete            </th>
        </tr>
    </thead>
    <tbody>

        {productData}
        </tbody></table></div>



  )
}
