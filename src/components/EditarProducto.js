import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {editarProductoAction} from '../actions/productoActions' 
import { useNavigate } from "react-router-dom";

const EditarProducto = () => {
  const dispatch = useDispatch()  
  const history = useNavigate()

  const [producto, setProducto] = useState({
      nombre: '',
      precio: ''
  })
  const productoEditar = useSelector(state => state.productos.productoEditar)
  // llamar al state automaticamente
  useEffect(()=> {
    setProducto(productoEditar)
  }, [productoEditar])

  const onChangeFormulario = e => {
  setProducto({
    ...producto,
    [e.target.name] : e.target.value
  })
  }

  const {nombre, precio} = producto
  if(!producto) return null;


const handleSubmit = e => {
  e.preventDefault();

  dispatch(editarProductoAction(producto))
  history.push('/')
}

    return ( 
        <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4 font-weight-bold">
              Edit Product
              </h2>
              <form 
              onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="">Name Product</label>
                  <input
                    type="text"
                    value={nombre}
                    className="form-control"
                    placeholder="Name Product"
                    name="nombre"
                    onChange={onChangeFormulario}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Product Price</label>
                  <input
                    type="number"
                    value={precio}
                    className="form-control"
                    placeholder="Product Price"
                    name="precio"
                    onChange={onChangeFormulario}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                >
                    Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
     );
}
 
export default EditarProducto;