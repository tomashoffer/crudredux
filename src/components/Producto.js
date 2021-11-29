import React from 'react'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
// Redux
import { useDispatch } from 'react-redux'
import { borrarProductosAction, obtenerProductosEditar } from '../actions/productoActions'

const Producto = ({producto}) => {
const {nombre, precio, id} = producto
const dispatch = useDispatch()
// confirmar si desea eliminarCita
const confirmarEliminarProducto = id => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
        dispatch(borrarProductosAction(id))
        }
      })

}

// redireccionar editar product
const history = useNavigate();
const redireccionarEdit = producto =>{
    history.push(`/productos/editar/${producto.id}`)
}
    return ( 
        <tr>
            <td>{nombre}</td>
            <td><span className='font-weight-bold'>$ {precio}</span></td>
            <td className='acciones'>
                <button
                 type="button"
                 onClick={ () => redireccionarEdit(producto)}
                 className='btn btn-primary mr-2'>
                    Edit
                </button>
                <button 
                type="button"
                className="btn btn-danger"
                onClick={() => confirmarEliminarProducto(id)}>
                    Delete
                </button>
            </td>
        </tr>

     );
}
 
export default Producto;