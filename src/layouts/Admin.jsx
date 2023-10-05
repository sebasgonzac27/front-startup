import { Header } from "../components/Header";

export function Admin({children}) {
    return(
        <>
        <Header
            brand={{name: 'AudioVisual Admin', href:'/admin'}}
            routes={[{name: 'Usuarios', href:'/admin/users'},
                    {name:'Campus', href:'/admin/campuses'},
                    {name: 'Salones', href:'/admin/classrooms'},
                    {name: 'Categorías', href:'/admin/types'},
                    {name:'Equipos', href:'/admin/devices'},
                    {name: 'Solicitudes', href:'/admin/requests'}]}/>
        {children}
        </>
    )
}