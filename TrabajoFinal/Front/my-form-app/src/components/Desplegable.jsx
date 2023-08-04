import { useState, useEffect } from 'react'

const Desplegable = (props) => {
   
     
    const [categorias, setCategorias] = useState([])
 

    useEffect(() => {
        fetch('http://localhost:3000/categoriasRetornarJSON')
            .then(response => response.json())
            .then(data => setCategorias(data)                
                 );
    }, []);
 
    return (
        <div className='contenedorDesplegable'>
            
            <select className='desplegable' name="desplegable" id="desplegable" onChange={props.onChange} defaultValue={''} value={props.value}>
                <option value='' disabled >
                    {props.placeholder}
                </option>
  
                {categorias.map(categoria => (
                    <option key={categoria.id} value={categoria.id}>
                    {categoria.descripcion}
                    </option>
                ))}

            </select>




        </div>
    )
}

export default Desplegable