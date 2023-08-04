// import Header from '../components/Header'
// import Footer from '../components/Footer'
 
// import Product from './Product'
// import Banner from './Banner'
import VistaProductos from '../components/VistaProductos'
const Home = () => {

    return (
        <>
            {/* <Header  />   */}
            <main>
                {/* <h1>{nomuser}</h1> */}
                {/* <Banner /> */}
                <section className="homeIndex">
                   
                    <VistaProductos/>
                </section>
            </main>
            {/* <Footer /> */}
        </>
    )
}
export default Home