import Head from "next/head";
import Navbar from './Navbar.component';
import { QueryClient, QueryClientProvider } from "react-query";

export default function Layout(props)
{
    const queryClient = new QueryClient();

    return(
        <div>
            <Head>
                <title>Osiris Test</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
            <footer className="flex items-center justify-center w-full h-24 border-t">
                <h3>Creado por Teddy Pottellá</h3>
            </footer>
        </div>
    );
}