import React from 'react';
import { useQuery } from 'react-query';
import { dir } from '../services/interfaces/connection.interface';
import { DataFromServerService } from '../services/dataFromServer.services';
import { productsInterface } from '../services/interfaces/products.interface';

export default function Todos() {
    const { isLoading, isError, data, error } = useQuery('todos', fetchTodoList)
  
    if (isLoading) {
      return <span>Loading...</span>
    }
  
    if (isError) {
      return <span>Error: {error.message}</span>
    }
  
    // We can assume by this point that `isSuccess === true`
    return (
      <ul>
        {data.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    )
  }

export default function Store()
{
    let page = 1;
    let link = new DataFromServerService(`${dir.LOCALHOST}/products`);
    const {data, error}= useQuery('products', async()=> await link.getDataWithPaginator(page));
    const dataFetch:productsInterface[] = data?.data;
console.clear();
    console.log(dataFetch);

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return(
        <>
            {
                dataFetch.forEach((r:productsInterface)=>
                (

                    <div className="flex flow-row">
                        <div className="flex flex-col justify-center items-center max-w-sm mx-4 my-8">
                            <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80' }} className="bg-gray-300 h-64 w-full rounded-lg shadow-md bg-cover bg-center" />
                            <div className="w-56 md:w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden">
                                <div className="py-2 text-center font-bold uppercase tracking-wide text-gray-800">Nike Revolt</div>
                                <div className="flex items-center justify-between py-2 px-3 bg-gray-400">
                                    <h1 className="text-gray-800 font-bold ">$ </h1>
                                    <button className=" bg-gray-800 text-xs text-white px-2 py-1 font-semibold rounded uppercase hover:bg-gray-700">Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}