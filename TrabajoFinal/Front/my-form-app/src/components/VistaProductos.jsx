import Productos from '../components/Productos';
import Busqueda from '../components/busqueda';
import Desplegable from '../components/Desplegable';
import Check from '../components/Check';
import { useState, useEffect } from 'react'

import Button from '../components/button';


const VistaProductos= () => {
  const [products, setProducts] = useState([]);
  const [buscadorNombre, setBuscadorNombre] = useState("");
  const [filteredProds, setFilteredProds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasFilter, sethasFilter] = useState(false)
  const [buscadorMinPrecio, setBuscadorMinPrecio] = useState(0);
  const [buscadorMaxPrecio, setBuscadorMaxPrecio] = useState(999999);
  const [buscadorCategoria, setBuscadorCategoria] = useState("");
  const [buscadorOrdenDesc, setBuscadorOrdenDesc] = useState(false);
  const [buscadorOrdenAsc, setBuscadorOrdenAsc] = useState(false);



  const nameFilter = (e) =>{
    const valorIngresado = e.target.value
    setBuscadorNombre(valorIngresado)
  }
  
  const precioMinFilter = (e) =>{
     
    const precioMinIngresado =  e.target.value 
    setBuscadorMinPrecio(precioMinIngresado)
  }
  const precioMaxFilter = (e) =>{
    
    const precioMaxIngresado = e.target.value 
    setBuscadorMaxPrecio(precioMaxIngresado)
  }

  const categoriaFilter = (e) =>{
    const categoriaIngresada = e.target.value
    console.log (e.target.value)
    console.log('valor cat')
    setBuscadorCategoria(categoriaIngresada)
  }

  const ordenFilterDesc = (e) =>{
    const ordenIngresadoDesc = e.target.checked
    setBuscadorOrdenDesc(ordenIngresadoDesc)

     
     
     
 
  }

  
  const ordenFilterAsc = (e) =>{
    const ordenIngresadoAsc = e.target.checked
    setBuscadorOrdenAsc(ordenIngresadoAsc)
    

  }

  useEffect(() => {
    fetch('http://localhost:3000/Productos')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProds(data);
        setLoading(false);       
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() =>{
    const newProducts = products.filter(product => product.titulo.toLowerCase().includes(buscadorNombre.toLowerCase()));
    setFilteredProds([...newProducts]);
    sethasFilter(buscadorNombre.length > 0);
  }, [buscadorNombre, products]);


  
  useEffect(()=>{
    const newProducts = products.filter(product => product.preuni <= buscadorMaxPrecio);
    
    setFilteredProds([...newProducts]);
    sethasFilter(buscadorMaxPrecio.length > 0);
  }, [buscadorMaxPrecio, products])

  useEffect(()=>{
    const newProducts = products.filter(product => product.preuni >= buscadorMinPrecio);
    setFilteredProds([...newProducts]);
    sethasFilter(buscadorMinPrecio.length > 0);
  }, [buscadorMinPrecio, products])

  useEffect(()=>{
  
   
    const newProducts = products.filter((product) => product.idcategoria === parseInt(buscadorCategoria));
    
    setFilteredProds([...newProducts]);
    
    sethasFilter(buscadorCategoria.length > 0);
  }, [buscadorCategoria, products])

  useEffect(()=>{
    if (buscadorOrdenDesc) {
      
      const newProducts = [...products].sort((a, b) => a.preuni - b.preuni);
      setFilteredProds(newProducts);
      sethasFilter(true);
      
      setBuscadorOrdenAsc(false)
      
    } else {
      setFilteredProds([]);
      sethasFilter(false);
    }
  }, [buscadorOrdenDesc, products])
  
  useEffect(()=>{
    if (buscadorOrdenAsc) {
 
      const newProducts = [...products].sort((a, b) => b.preuni - a.preuni);
      setFilteredProds(newProducts);
      sethasFilter(true);
      setBuscadorOrdenDesc(false)
    } else {
      setFilteredProds([]);
      sethasFilter(false);
    }
  }, [buscadorOrdenAsc, products])
  //  ascendente
  //para que funcionen todos juntos

  const filtrosJuntos = () => {
    const productosFiltrados = products.filter((product) =>
      product.titulo.toLowerCase().includes(buscadorNombre.toLowerCase()) &&
      product.preuni >= buscadorMinPrecio && product.preuni <= buscadorMaxPrecio &&
      (buscadorCategoria.length === 0 || product.idcategoria === parseInt(buscadorCategoria))
    );
  
    if (buscadorOrdenDesc) {
      productosFiltrados.sort((a, b) => a.preuni - b.preuni);
    }
    if (buscadorOrdenAsc) {
      productosFiltrados.sort((a, b) => b.preuni - a.preuni);
    }
    setFilteredProds(productosFiltrados);
    sethasFilter(
      buscadorNombre.length > 0 ||
      buscadorMinPrecio.length > 0 ||
      buscadorMaxPrecio.length > 0 ||
      buscadorCategoria.length > 0 ||
      buscadorOrdenDesc || 
      buscadorOrdenAsc
    );
  };
  
  useEffect(() => {
    filtrosJuntos();
  }, [buscadorNombre, buscadorMaxPrecio,buscadorMinPrecio, buscadorCategoria, buscadorOrdenDesc, buscadorOrdenAsc,products]);

  const resetFiltros = () => {
    setBuscadorNombre("");
    setBuscadorMinPrecio(0);
    setBuscadorMaxPrecio(999999);
    setBuscadorCategoria("");
    setBuscadorOrdenDesc(false);
    setBuscadorOrdenAsc(false);
    
  };
  
  return (
    <>
    
      <section className='productos'>

        <h2 className="title_section"> CATALOGO </h2>
        <div className='catalogo'>
          <Busqueda
            placeholder='Ingresá tu Busqueda'
            value={buscadorNombre}
            onChange={nameFilter}
          ></Busqueda>

          <Busqueda
            placeholder='Ingresá un precio mínimo'
            value ={buscadorMinPrecio}
            onChange={precioMinFilter}
          ></Busqueda>
          <Busqueda
            placeholder='Ingresá un precio máximo'
            value ={buscadorMaxPrecio}
            onChange={precioMaxFilter}
          ></Busqueda>
          <Desplegable
            placeholder='Elegí una categoria'
            value ={buscadorCategoria}
            onChange={categoriaFilter}>
              
          </Desplegable>
          <div>
          <Check
            labelCheck = 'Ordenar por Menor Precio:'
            // value ={buscadorOrdenDesc}
            checked={buscadorOrdenDesc}
            onChange={ordenFilterDesc}
          ></Check>
          <Check
            labelCheck = 'Ordenar Mayor Precio'
            // value ={buscadorOrdenAsc}
            onChange ={ordenFilterAsc}
            checked={buscadorOrdenAsc}
          ></Check>
          </div>
          <Button
          nombre= "Limpiar Filtros"
          onClick={resetFiltros}
          ></Button>
         
        </div>
        <div className='catalogo'>
          
        {
          loading ? (
                <p>cargando</p>
            // <DoubleOrbit speed={2} text={"Cargando..."} width={"150px"} height={"150px"} />
            ) 
          : 
            hasFilter ?
              filteredProds.length > 0 ?
                <Productos listproductos={filteredProds}></Productos>
              : <p className='msjErrorBusqueda'>No se encontraron elementos filtrados.</p>
            
            : products.length > 0 ? 
                <Productos listproductos={products} />
              : <p className='msjErrorBusqueda'>Inconvenientes al traer datos de API</p>      
        }
        </div>

      </section>

    </>
  );
}

export default VistaProductos
