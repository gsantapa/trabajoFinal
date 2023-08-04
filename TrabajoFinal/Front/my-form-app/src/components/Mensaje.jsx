import React from 'react';

const Mensaje = (props) => {
  const {message} = props;  
  console.log(props)
  const showMessage = () => {
    window.alert({message});
  };

  return (
    <div>
      <button onClick={showMessage}>Mostrar Mensaje</button>
    </div>
  );
};

export default Mensaje;
