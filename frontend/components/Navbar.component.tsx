import Link from 'next/link';

export default function Navbar()
{
    return(
        <div className="h-16 w-full bg-black bg-opacity-50">
            <div className="w-full h-full flex justify-center items-center">
                <div className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                    <div className="mx-4 text-white"><Link href="/">Inicio</Link></div>
                    <div className=" h-8 w-px bg-gray-300" />
                </div>
                <div className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                    <div className="mx-4 text-white"><Link href="/products">Productos</Link></div>
                    <div className=" h-8 w-px bg-gray-300" />
                </div>
                <div className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                    <div className="mx-4 text-white"><Link href="/profile">Perfil</Link></div>
                    <div className=" h-8 w-px bg-gray-300" />
                </div>
                <div className="flex h-full items-center  hover:bg-black hover:bg-opacity-50">
                    <div className="mx-4 text-white"><Link href="/signup">Registrarse</Link></div>
                    <div className=" h-8 w-px bg-gray-300" />
                </div>
                <div className="flex h-full  items-center hover:bg-black hover:bg-opacity-50">
                    <div className="mx-4 text-white"><Link href="signin">Acceder</Link></div>
                </div>
            </div>
        </div>
    );
}