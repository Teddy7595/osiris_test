import Head from "next/head";
import Navbar from './Navbar.component';

export default function Layout(props)
{
    return(
        <div>
            <Head>
                <title>Osiris Test</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            
            <div>{props.children}</div>
            <footer className="flex items-center justify-center w-full h-24 border-t">
                <h3>Creado por Teddy Pottellá</h3>
            </footer>
        </div>
    );
}