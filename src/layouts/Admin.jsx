import { Header } from "../components/Header";

export function Admin({children}) {
    return(
        <>
        <Header/>
        {children}
        </>
    )
}