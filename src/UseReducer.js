import React from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onConfirm = () => dispatch({type: actionTypes.confirm})
  const onError = () => dispatch({type: actionTypes.error})
  const onCheck = () => dispatch({type: actionTypes.check})
  const onDelete = () => dispatch({type: actionTypes.delete})
  const onReset = () => dispatch({type: actionTypes.reset})
  const onWrite = (newValue) => {dispatch({type: actionTypes.write, payload: newValue});}

  React.useEffect(() => {
    if(state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }
      }, 3000);
    }
  }, [state.loading]);

  if(!state.deleted && !state.confirmed) {
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
            onWrite(event.target.value);
          }}
        />
        <button
          onClick={onCheck}
        >Comprobar</button>
  
      </div>
    )
  } else if(state.confirmed && !state.deleted) {
    return(
      <React.Fragment>
        <p>Pedimos confirmación ¿Estas seguro?</p>

        <button
          onClick={onDelete}
        >Si, eliminar</button>
        <button
          onClick={onReset}
        >Nop, me arrepenti</button>
      </React.Fragment>
    );
  } else {
    return(
      <React.Fragment>
        <p>Eliminado correctamente</p>

        <button
          onClick={onReset}
        >Resetear, volver atrás</button>
      </React.Fragment>
    );
  }
}

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false
}

const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  write: 'WRITE',
  check: 'CHECK',
  delete: 'DELETE',
  reset: 'RESET'
}

const reducerObject = (state, payload) => ({
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false
  },
  [actionTypes.write]: {
    ...state,
    value: payload
  },
  [actionTypes.check]: {
    ...state,
    loading: true
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true
  },
  [actionTypes.reset]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: ''
  }
})

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
}

export { UseReducer }