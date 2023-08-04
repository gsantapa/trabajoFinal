//import React from "react"
import '../../public/css/styleCardyProductos.css'
const Card = (props) => {
    const {children, orientacion, size} = props

    //otra opcion para el size es usar un boolean
    // const {children, orientacion, big} = props
    return(
        <div
         className={`card card_${orientacion} card_${size}`}
        >
            {children}
        </div>

        
        // <div 
        // style={{
        //      width: big ? "600px" : "300px"
        //      height: big ? "600px" : "300px"
        //}}
        //className={`card card_${orientacion} card_${size}`}>
        //     {children}
        // </div>
    )
}

export default Card
