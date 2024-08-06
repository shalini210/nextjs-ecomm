import axios from "axios";

const api_url = "http://localhost:3030/products";

export async function  get_all_products()
    {
        var data = await   axios.get(api_url).then(function(response) {      
             return response.data;
             }).catch(function(error) {
            return (error);
        });
     return data  
    }
export async function insert_product(data)
{
    return await axios.post(api_url,data);
}
export async function update_product(data,id)
{
    return await axios.patch(api_url+"/"+id,data)
}
export async function delete_data(id)
{
    return await axios.delete(api_url+"/"+id);
}