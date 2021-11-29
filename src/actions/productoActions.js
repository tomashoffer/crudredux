import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR,
    COMENZAR_EDITAR_PRODUCTO
} from '../types'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

// crear nuevos productos
export function crearNuevoProductoAction(producto){
    return async (dispatch) => {
        dispatch( agregarProducto() )
        try {
            // insertar en la API 
            await clienteAxios.post("/productos", producto)
            dispatch( agregarProductoExito(producto) )

            // Alerta
            Swal.fire(
                "Correct",
                "The product had been added correctly",
                'success'
                )
        } catch (error) {
            dispatch( agregarProductoError(true) )
            Swal.fire({
                icon: "error",
                title: "There was an error",
                text: 'Try again!'
                })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})


// DESCARGAR PRODUCTOS
export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch( descargarProductos() )
        try {
           const resp = await clienteAxios.get('/productos');
           dispatch(descargaProductosExitosa(resp.data)) 
        } catch (error) {
            dispatch(descargaProductosError())
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})
const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})
const descargaProductosError = productos => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

// Selecciona y elimina producto
export function borrarProductosAction(id){
    return async (dispatch) => {
        dispatch( obtenerProductoEliminar(id) )
        try {
          clienteAxios.delete(`/productos/${id}`)
          dispatch(eliminarProductoExito())
          Swal.fire(
            'Deleted!',
            'Your product has been deleted.',
            'success'
          )
        } catch (error) {
           dispatch(eliminarProductoError(error))
        }
    }
}
const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})
const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})
const eliminarProductoError = (error) => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: error
})

// Colocar prod en edicion
// DESCARGAR PRODUCTOS
export function obtenerProductosEditar(producto){
    return async (dispatch) => {
        dispatch( descargarProductos() )
           dispatch(obtenerProductosEditarAction(producto)) 
    }
}

const obtenerProductosEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Edit producto
export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch( editarProducto(producto) )
        try {
           await clienteAxios.put(`/productos/${producto.id}`)
            dispatch(editarProductoExito(producto))
        } catch (error) {
            dispatch(editarProductoError(error))
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDITAR_PRODUCTO
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
})
const editarProductoError = error => ({
    type: PRODUCTO_EDITAR_ERROR,
    payload: error
})