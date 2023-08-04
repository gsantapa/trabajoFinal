import { useState, useEffect } from 'react'

const Check = (props) =>{
    return(
        <div className='contenedorCheck'>
            <label htmlFor="">{props.labelCheck}</label>
            <input type="checkbox" name="" id=""  checked={props.checked} value={props.value} onChange={props.onChange}/>
        </div>
    )
}

export default Check