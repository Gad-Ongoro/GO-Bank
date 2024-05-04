import { useState, useEffect, useRef, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import api from '../api';
import { BankContext } from '../App';

function SignIn() {
	let [signInData, setSignInData] = useState({});
	let [recaptchaCheck, setRecaptchaCheck] = useState(false);
	const signInBtn = useRef();
	const navigate = useNavigate();
	let { setSignedIn } = useContext(BankContext);

	function handleInputChange(e){
		let name = e.target.name;
		let value = e.target.value;

		if (e.target.type === 'select-one'){
			value = e.target.options[e.target.selectedIndex].value;
		}

		setSignInData(current => ({...current, [name]: value}));
	}

	const handleSubmit = async (e) => {
        e.preventDefault();
		e.target.reset();

        try {
            const res = await api.post("/api/token/", signInData)
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
				setSignedIn(true);
                navigate("/");
        } catch (error) {
            alert(error)
        } finally {
            console.log('Success');
        }
    };

	function onRecaptchaCheck(){
		setRecaptchaCheck(current => !current)
	};

	function handleSignInBtn(){
		if (!recaptchaCheck) {
			signInBtn.current.style.cssText = `transform: scale(0.9); cursor: no-drop;`;
		}
		else{
			signInBtn.current.style.cssText = `transform: scale(1.1); cursor: pointer;`;
		}
	};
	useEffect(() => {
		setTimeout(()=> handleSignInBtn(), 500)
	});


	return (
		<div className=''>
			<div className='h-screen'>
				<div className='text-center'>
					<h2 className='text-green-500 font-bold text-2xl mb-3'>Welcome back!</h2>
				</div>
				<form onSubmit={handleSubmit} className='w-full d-flex flex-column justify-center items-center'>
					<div className="form-floating mb-1 mt-3 w-50">
						<input type="text" className="form-control" id="username" placeholder="Enter username" name="username" onChange={handleInputChange}></input>
						<label htmlFor="username">Username</label>
					</div>

					{/* EMAIL */}
					{/* <div className="form-floating mb-3 mt-3 w-50">
						<input type="text" className="form-control" id="email" placeholder="Enter email" name="email" onChange={handleInputChange}></input>
						<label htmlFor="email">Email</label>
					</div> */}

					<div className="form-floating mb-3 mt-3 w-50">
						<input type="password" className="form-control" id="password" placeholder="Enter password" name="password" onChange={handleInputChange}></input>
						<label htmlFor="password">Password</label>
					</div>

					<ReCAPTCHA
    					sitekey="6Lcw1s0pAAAAAG7gNntupjsrom2oVK57LwoxZHre"
    					onChange={onRecaptchaCheck}
  					/>

					<input 
						type="submit" 
						ref={signInBtn}
						className='transition-all duration-300 h-10 mt-3 w-25 bg-green-400 text-white text-lg font-bold rounded' 
						value={'Login'}
						disabled={!recaptchaCheck}>
					</input>

					<p className='text-white my-3 text-lg'>Don't have an account ? <span className='text-green-500'><NavLink to={'/register'} className='ml-1'> Sign Up</NavLink></span> </p>
				</form>
			</div>
		</div>
	)
}

export default SignIn;