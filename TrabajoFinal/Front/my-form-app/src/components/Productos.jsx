import '../../public/css/styleCardyProductos.css'
import CardProducto from "./CardProducto";

const Productos = ({listproductos}) => {


  return (
    <>
      
      {listproductos.map((prod) => (
      
        <CardProducto
          key={prod.id}
          titulo={prod.titulo}
          idcategoria={prod.idcategoria}
          categoriaDescripcion={prod.Categoria.descripcion}
          img={prod.path_imagen}
          preuni={"$" + prod.preuni}
          comentario={prod.comentario}
        	nombrebutton="Editar"
          prod={prod} 
          />
      ))}
    </>
  );
};

export default Productos;



