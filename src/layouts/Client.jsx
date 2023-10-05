import { Header } from "../components/Header";

export function Client({ children }) {
  return (
    <>
      <Header
        brand={{name: 'AudioVisual Client', href:'/client'}}
        routes={[{name: 'Mis Solicitudes', href:'/client/requests'},
                {name: 'Crear Solicitud', href:'/client/create-request'}]}  
      />
      {children}
    </>
  );
}
