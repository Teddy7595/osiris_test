import React from "react";
import Layout from "../components/Layout.component";

export default class Sigin extends React.Component{
    
    state = {
        'name': " ",
        'email': " "
    };

    async callServerToLogon(e)
    {
        e.preventDefault();
        console.log(e.target);
    }

    async componentDidMount(){
        // Aqui las funciones que quieres que se ejecuten sin necesidad de hacer click a un boton
    }

    render(){
        let login:{email:string, password:string};

        return(
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-screen py-2">
                    <div className="leading-loose">
                        <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl" onSubmit={this.callServerToLogon}>
                            <p className="text-gray-800 font-medium">Customer information</p>
                            <div className="true">
                                <label className="block text-sm text-gray-00" htmlFor="email">Email</label>
                                <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" 
                                        id="email" 
                                        name="email" 
                                        type="text" 
                                        required placeholder="Tu correo" 
                                        aria-label="Email" 
                                        onChange={}/>
                            </div>
                            <div className="mt-2">
                                <label className="block text-sm text-gray-600" htmlFor="pass">Contraseña</label>
                                <input className="w-full px-5  py-2 text-gray-700 bg-gray-200 rounded" 
                                        id="pass" 
                                        name="pass" 
                                        type="password" 
                                        required placeholder="Tu contraseña" 
                                        aria-label="Pass" 
                                        onChange={}/>
                            </div>
                            <div className="mt-4" >
                                <button className="px-4 py-1 text-white font-light 
                                    tracking-wider bg-gray-900 rounded" 
                                    type="submit">
                                    Acceder
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        )
    }
}


{/* <div>

    <form>
        <input type="text" onChange={this.nombre} />
    </form>
    <hr />
    <p>Estas escribiendo: {nombre}</p>
</div> */}