import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';


function SignUp() {
	let [signUpData, setSignUpData] = useState({});
	let [branches, setBranches] = useState({});
	const navigate = useNavigate();

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
		<div className=''>
			<div className='h-screen'>
				<form onSubmit={handleSubmit} className='w-full h-full flex flex-column justify-center align-center items-center'>
					<div className="form-floating mb-1 mt-3 w-50">
						<input type="text" className="form-control" id="username" placeholder="Enter username" name="username" onChange={handleInputChange}></input>
						<label htmlFor="username">Username</label>
					</div>
					<div className="form-floating mb-3 mt-3 w-50">
						<input type="text" className="form-control" id="email" placeholder="Enter email" name="email" onChange={handleInputChange}></input>
						<label htmlFor="email">Email</label>
					</div>

					{/* Role */}
					<div className="form-floating w-50">
						<select className="form-select" id="sel1" defaultValue={10} name="role" onChange={handleInputChange}>
							<option>Select One</option>
							<option value={10}>Customer</option>
							<option value={1000}>Administrator</option>
							<option value={1000}>Employee</option>
							<option value={10000}>Super Administrator</option>
						</select>
						<label htmlFor="sel1" className="form-label">User Type:</label>
					</div>

					<div className="form-floating mb-3 mt-3 w-50">
						<input type="password" className="form-control" id="password" placeholder="Enter password" name="password" onChange={handleInputChange}></input>
						<label htmlFor="password">Password</label>
					</div>

					<div className="form-floating w-50">
						<select className="form-select" id="sel2" name="primary_branch" defaultValue={branches[0] !== undefined && branches[0].branch_id} onChange={handleInputChange}>
							<option>Select One</option>
							{branchInputs}
						</select>
						<label htmlFor="sel2" className="form-label">Select Primary Branch:</label>
					</div>

					<input 
						type="submit" 
						className='h-10 mt-3 w-25 bg-green-400 text-white text-lg font-bold rounded'
						value={"Register"}></input>
				</form>
			</div>
		</div>
	)
};

export default SignUp;