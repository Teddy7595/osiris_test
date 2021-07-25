import Layout from "../components/Layout.component";


export default function Signin() {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="leading-loose">
                <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
                    <p className="text-gray-800 font-medium">Customer information</p>
                    <div className="true">
                        <label className="block text-sm text-gray-00" htmlFor="cus_email">Email</label>
                        <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required placeholder="Tu correo" aria-label="Name" />
                    </div>
                    <div className="mt-2">
                        <label className="block text-sm text-gray-600" htmlFor="cus_pass">Contraseña</label>
                        <input className="w-full px-5  py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required placeholder="Tu contraseña" aria-label="Email" />
                    </div>
                    <div className="mt-4">
                        <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit">Acceder</button>
                    </div>
                </form>
            </div>
        </div>
      </Layout>
    )
}