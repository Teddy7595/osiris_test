import Link from 'next/link';

const Navigation = () =>
{
    return (
        <ul>
            <li>
                <Link href="/">
                    <a>Inicio</a>
                </Link>
            </li>
            <li>Productos</li>
            <li>Prfil</li>
        </ul>
    )
}

export default Navigation;