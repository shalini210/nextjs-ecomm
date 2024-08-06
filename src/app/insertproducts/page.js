"use client"
import React, { useRef,useState ,useEffect} from 'react'
import { insert_product ,delete_data, update_product} from '../axiosservice'
import { get_all_products } from '../axiosservice';
export default function page() {
  let name_ref = useRef();
  let description_ref =useRef();
  let company_ref=useRef();
  let price_ref = useRef();
  let id_ref = useRef();
  const[errors,seterrors]=useState();
  const[productData,setProductData]=useState([]);
  const[flaginsert,setFlagInsert]=useState(true)
  async function fetchData()
  {
let products=   await (get_all_products());
setProductData(products.map((p)=>
{
    return <tr key={p._id} className="h-8 border-b-2">
    {/* <td>{p._id}</td> */}
    <td>{p.title}</td>
    <td>{p.description}</td>
    <td>{p.company}</td>
    <td>{p.price}</td>
    <td><input type="button" onClick={()=>Showdata(p)} value="Edit"
     className='bg-green-600 hover:bg-green-800 w-2/3 h-6 text-white rounded-lg'></input></td>
    <td>
        <input type="button" onClick={()=>deleteData(p._id)} 
        className='bg-red-600 hover:bg-red-800 w-2/3 h-6 text-white rounded-lg'
        value="Delete"></input>
    </td></tr>
}
))
  }

  useEffect( ()=>
  { 
      fetchData()
  },[]);

let addData=async ()=>
{if(checkValidation())
  {
  const data = {"title":name_ref.current.value,
  "description":description_ref.current.value,
"company":company_ref.current.value,
"price":parseInt(price_ref.current.value)}
  let d = await insert_product(data);
  console.log(d)
  fetchData()
  clearData();}
}
let checkValidation=()=>
{
  if(!name_ref.current.value)
  {
    seterrors("Please fill Name")
    return false;
  }
  
    else if(!price_ref.current.value)
    { 
      seterrors("please fill price ")
      return false;
    }
    else if(!company_ref.current.value)
    {
      seterrors("please fill company name")
      return false;
    }
    else if(isNaN(parseInt(price_ref.current.value)))
    {
      seterrors("price should be integer ")
      return false;
    }
    else
    {
      seterrors("");
      return true;
      
    }
  }

let updateData=async ()=>
{
  if(checkValidation)
  {
  const id = id_ref.current.value;
  const data = {"title":name_ref.current.value,
  "description":description_ref.current.value,
"company":company_ref.current.value,
"price":parseInt(price_ref.current.value)}
  let d = await update_product(data,id);
  console.log(d)
  clearData();
  fetchData()
  }
}
let clearData =()=>
{
  name_ref.current.value="";
  description_ref.current.value="";
  company_ref.current.value="";
  price_ref.current.value="";
  setFlagInsert(true);
}
let Showdata=(p)=>
{
  id_ref.current.value =p._id;
  name_ref.current.value=p.title;
  description_ref.current.value=p.description;
  company_ref.current.value=p.company;
  price_ref.current.value=p.price;
  setFlagInsert(false);
}
let deleteData =async (id)=>
{
  // console.log(id)
  let x =window.confirm("are you sure want to delete ");
  if(x)
  {
   await delete_data(id)
   fetchData()
  }
  
}

  return (
    <div>
    <div className="w-1/2 ">
      <h1 w-full>Demo using NEXT.js in frontend and Nest.js in backend </h1>
      <div className='field-group'>
        <input type="text" ref={id_ref} style={{display:"none"}}></input>

      <label>Item Name</label> <input   type="text" ref={name_ref}/> 
      </div>
      <div className='field-group'>
      <label>description</label> <textarea ref={description_ref}> </textarea>
      </div>

      <div className='field-group'>
      <label>price</label> <input type="text" ref={price_ref}/> 
      </div>

      <div className='field-group'>
      <label>company</label> <input type="text" ref={company_ref}/>
      </div>
    
<h3 className='text-red-500'>{errors}</h3>
      <div className='btn-group mx-auto'>
 {flaginsert?<input type="button" value="Add" className='btn-success' onClick={()=>addData()} />:<input type="button" value="Update" className='btn-success' onClick={()=>updateData()} />}

<input type="button" value="Cancel" className='btn-danger' onClick={()=>clearData()} />
</div>
</div>
{/* <Showproducts find={Showdata} delete={deleteData}></Showproducts> */}

<div> <table class="w-3/4 mt-10 mx-auto border-2 border-blue-200 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-blue-200 dark:bg-gray-700 dark:text-gray-400">
        <tr>
        {/* <th scope="col" class="px-6 py-3">
               id
            </th> */}
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





    </div>
  )
}
