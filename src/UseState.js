import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false,
  });

  React.useEffect(() => {
    if(state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          setState({
            ...state,
            loading: false,
            error: false
          });
        } else {
          setState({
            ...state,
            loading: false,
            error: true
          });
        }
      }, 3000);
    }
  }, [state.loading]);

  return (
    <div>
      <h2>Eliminar {name}</h2>

      <p>Por favor, escribe el codigo de seguridad.</p>

      {(state.error && !state.loading) && (
        <p>Error: El código es incorrecto</p>
      )}

      {state.loading && (
        <p>Cargando...</p>
      )}

      <input 
        placeholder="Código de seguridad"
        value={state.value}
        onChange={(event) => {
          setState({
            ...state,
            value: event.target.value
          })
        }}
      />
      <button
        onClick={() => setState({
          ...state,
          loading: true})}
      >Comprobar</button>

    </div>
  )
}

export { UseState }