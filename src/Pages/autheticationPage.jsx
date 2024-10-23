import LoginForm from "../Components/autheticationForm";
import  "../Styles/authetication.css"
import { Link } from 'react-router-dom';

const AuthenticationPage = () => {
    return ( 
    <div className="auth-wrapper">
        
        <LoginForm />
    
    </div> );
}
 
export default AuthenticationPage;