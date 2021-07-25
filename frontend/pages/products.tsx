import Layout from "../components/Layout.component";

export default function Products() {
    return (
      <Layout>
        <div className="flex flex-row items-center justify-center min-h-screen py-2">
            <div className="leading-loose">
                <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
                    <p className="text-gray-800 font-medium">Registro de producto</p>
                    <div className="true">
                        <label className="block text-sm text-gray-00" htmlFor="cus_email">Nombre</label>
                        <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required placeholder="Nombre del producto" aria-label="Name" />
                    </div>
                    <div className="mt-2">
                        <label className="block text-sm text-gray-600" htmlFor="cus_pass">Precio</label>
                        <input className="w-full px-5  py-2 text-gray-700 bg-gray-200 rounded" id="cus_price" name="cus_price" type="text" required placeholder="Preio del producto" aria-label="Price" />
                    </div>
                    <div className="mt-2">
                        <label className=" block text-sm text-gray-600" htmlFor="cus_email">Cantidad</label>
                        <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_stock" name="cus_stock" type="text" required placeholder="Cantidad del producto" aria-label="Cantidad" />
                    </div>
                    <div className="mt-2">
                        <label className="block text-sm block text-gray-600" htmlFor="cus_name">Imagen</label>
                        <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_img" name="cus_img" type="file" required placeholder="Imagen del producto" aria-label="Imagen" />
                    </div>
                    <div className="mt-4">
                        <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit">Registrar</button>
                    </div>
                </form>
            </div>
        </div>
      </Layout>
    )
}