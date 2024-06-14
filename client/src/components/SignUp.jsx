import { useState, useEffect, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import api from '../api';
import AnimatedYPage from './AnimatedYPage';
import { BiHide } from "react-icons/bi";
import { BiShowAlt } from "react-icons/bi";


function SignUp() {
	let [signUpData, setSignUpData] = useState({});
	let [branches, setBranches] = useState({});
	let [showPassword, setShowPassword] = useState(false);
	let [showPassword2, setShowPassword2] = useState(false);
	const navigate = useNavigate();
	let password_input = useRef();
	let password_input2 = useRef();


	function scrollToTop() {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	};

	// SHOW/HIDE PASSWORD
	function toggle_show_password(){
		setShowPassword(current => !current);
		if (!showPassword) {
			password_input.current.type = 'text';
		}
		else{
			password_input.current.type = 'password';
		};
	}

	function toggle_show_password2(){
		setShowPassword2(current => !current);
		if (!showPassword2) {
			password_input2.current.type = 'text';
		}
		else{
			password_input2.current.type = 'password';
		};
	}

	useEffect(() => {
		fetch(`http://127.0.0.1:8000/branches/`)
		.then(response => {
			if(response.ok){
				return(
					response.json()
				)
			}})
		.then(data => {
			setBranches(data);
		})
		.catch(error => console.log(error))}
		,
		[]
	);

	let branchInputs = branches[0] !== undefined && branches.map((branch) => {
		return(
			<option value={branch.branch_id} key={`${branch.branch_id}`}>{branch.name}</option>
		)
	});


	function handleInputChange(e){
		let name = e.target.name;
		let value = e.target.value;

		if (e.target.type === 'select-one'){
			value = e.target.options[e.target.selectedIndex].value;
		}

		setSignUpData(current => ({...current, [name]: value}));
		console.log(signUpData);
	}

	const handleSubmit = (e) => {
        e.preventDefault();
		e.target.reset();

		api.post('/users/', signUpData)
		.then(response => response.data)
		.then(data => {
			navigate('/signin')
			console.log(data)
		})
		.catch(error => {
			if (error.response.data.username){
				alert(error.response.data.username[0]);
			} else if(error.response.data.email) {
				alert(error.response.data.email)
			} else {
				alert(error.message)
			}
        })
    };

	return (
		<AnimatedYPage>
		<div className=''>
			<div className='h-screen'>
				<div className='text-center'>
					<h2 className='text-green-500 text-2xl mb-4'>Let's get you started</h2>
				</div>
				<form onSubmit={handleSubmit} className='w-full flex flex-column justify-center align-center items-center'>
					<div className="form-floating mb-2 w-10/12 md:w-1/2">
						<input type="text" className="form-control" id="username" placeholder="Enter username" name="username" onChange={handleInputChange}></input>
						<label htmlFor="username">Username</label>
					</div>
					<div className="form-floating mb-3 mt-2 w-10/12 md:w-1/2">
						<input type="text" className="form-control" id="email" placeholder="Enter email" name="email" onChange={handleInputChange}></input>
						<label htmlFor="email">Email</label>
					</div>

					{/* Role */}
					<div className="form-floating w-10/12 md:w-1/2">
						<select className="form-select" id="sel1" defaultValue={10} name="role" onChange={handleInputChange}>
							<option>Select One</option>
							<option value={10}>Customer</option>
							<option value={1000}>Administrator</option>
							<option value={1000}>Employee</option>
							<option value={10000}>Super Administrator</option>
						</select>
						<label htmlFor="sel1" className="form-label">User Type:</label>
					</div>

					<div className="form-floating w-10/12 md:w-1/2 mt-3 mb-2">
						<select className="form-select" id="sel2" name="primary_branch" defaultValue={branches[0] !== undefined && branches[0].branch_id} onChange={handleInputChange}>
							<option>Select One</option>
							{branchInputs}
						</select>
						<label htmlFor="sel2" className="form-label">Select Primary Branch:</label>
					</div>

					<div className="form-floating mb-2 mt-3 w-10/12 md:w-1/2 relative">
						<input type="password" ref={password_input} className="form-control password_input" id="password1" placeholder="Enter password" name="password" onChange={handleInputChange}></input>
						<label htmlFor="password1">Password</label>
						{showPassword ? <BiShowAlt className='cursor-pointer text-green-500 absolute top-1/3 right-2' size={30} onClick={toggle_show_password} /> : <BiHide className='cursor-pointer text-green-500 absolute top-1/3 right-2' size={30} onClick={toggle_show_password} />}
					</div>

					<div className="form-floating mb-3 mt-2 w-10/12 md:w-1/2">
						<input type="password" ref={password_input2} className="form-control password_input" id="password2" placeholder="Enter password" name="password" onChange={handleInputChange}></input>
						<label htmlFor="password2">Confirm Password</label>
						{showPassword2 ? <BiShowAlt className='cursor-pointer text-green-500 absolute top-1/3 right-2' size={30} onClick={toggle_show_password2} /> : <BiHide className='cursor-pointer text-green-500 absolute top-1/3 right-2' size={30} onClick={toggle_show_password2} />}
					</div>

					<input 
						type="submit" 
						className='h-10 mt-3 w-3/4 md:w-1/3 bg-green-400 text-white text-lg font-bold rounded'
						value={"Register"}>
					</input>
					<p className='text-white mb-3 text-lg'>Already have an account ? <span className='text-green-500'><NavLink to={'/signin'} className='ml-1' onClick={scrollToTop}>Log In</NavLink></span> </p>
				</form>
			</div>
		</div>
		</AnimatedYPage>
	)
};

export default SignUp;