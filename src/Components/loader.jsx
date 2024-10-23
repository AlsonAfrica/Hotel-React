import "../Styles/loader.css"
import loaderImage from "../assets/logo.png"
const Loader = () => {
    return (
    <div className="Loader-container">
        <div className="loader">
            <img src={loaderImage} alt="loading..." className="loader-image"/>
        </div>
    </div>  );
}
 
export default Loader;