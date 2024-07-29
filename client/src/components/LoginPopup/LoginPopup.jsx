import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { StoreContext } from '../../Context/StoreContext';

const LoginPopup = ({ setShowLogin }) => {

    const { token, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign Up");

    const [input, setInput] = useState({
        name: '',
        email: '',
        password: ''
    });

    const changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInput({ ...input, [name]: value });
    }

    const login = async (input) => {
        try {
            const { email, password } = input;
            const response = await axios.post('/api/user/login', { email, password });
            console.log(response);
            if (response.data) {
                toast.success("Login Success");
                localStorage.setItem('token', response.data);
                setToken(response.data);
                setShowLogin(false);
            } else {
                toast.error("Invalid Credentials");
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    const register = async (input) => {
        const { name, email, password } = input;
        const response = await axios.post('/api/user/register', { name, email, password });
        if (response.data) {
            toast.success(response.data);
            localStorage.setItem('token', response.data);
            setToken(response.data);
            setShowLogin(false);
        } else {
            toast.error("Invalid Credentials");
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input);
        if (currState === 'Login') {
            login(input);
        } else {
            register(input);
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={submitHandler} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2> <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" ? <input type="text" placeholder='Your name' name='name' value={input.name} onChange={changeHandler} /> : <></>}
                    <input type="email" placeholder='Your email' name='email' value={input.email} onChange={changeHandler} />
                    <input type="password" placeholder='Password' name='password' value={input.password} onChange={changeHandler} />
                </div>
                <button type='submit'>
                    {currState === "Login" ? "Login" : "Create account"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
