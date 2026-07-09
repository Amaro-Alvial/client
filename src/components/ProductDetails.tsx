import { Form, redirect, useNavigate, type ActionFunctionArgs } from "react-router-dom"
import { formatCurrency } from "../helpers"
import type { Product } from "../types"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
    product: Product
}

export async function action({ params} : ActionFunctionArgs) {
    if (params.id !== undefined){
        await deleteProduct(+params.id)
        return redirect('/')
    }
}

export default function ProductDetails({ product } : ProductDetailsProps) {

    const navigate = useNavigate()
    const isAvailable = product.availability

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {isAvailable ? 'Disponible' : 'No disponible'}
            </td>
            <td className="p-3 text-lg text-gray-800 ">
             <div className="flex gap-2 items-center">
                <button
                    onClick={() => navigate(`/productos/${product.id}/editar`)}
                    className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-indigo-500 hover:cursor-pointer"
                >Editar</button>
                <Form
                    className="w-full"
                    method='POST'
                    action={`productos/${product.id}/eliminar`}
                    onSubmit={(e) => {
                        if( !confirm(`¿Está seguro de que quiere eliminar ${product.name}?`)){
                            e.preventDefault()
                        }
                    }}
                >
                    <input
                        type='submit'
                        value='eliminar'
                        className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-red-500 hover:cursor-pointer"
                    />
                </Form>
             </div>
            </td>
        </tr> 
    )
}