import LoginForm from "../Components/autheticationForm";
import  "../Styles/authetication.css"
import { Link } from 'react-router-dom';

const AuthenticationPage = () => {
    return ( 
    <div className="auth-wrapper">
        <div>
            <LoginForm/>
        </div>
    
    </div> );
}
 
export default AuthenticationPage;