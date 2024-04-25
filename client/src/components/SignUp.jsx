import { useState, useEffect } from 'react';

function SignUp() {
	let [signUpInputs, setSignUpInputs] = useState({});
	let [branches, setBranches] = useState({})

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

		setSignUpInputs(current => ({...current, [name]: value}));
		console.log(signUpInputs);
	}

	function handleSubmit(e){
		e.preventDefault()
		e.target.reset()

		fetch(`http://127.0.0.1:8000/users/`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(signUpInputs)
		})
		.then(response => response.json())
		.then(data => {
			console.log(data)
		})
		.catch(error => console.log(error))
	}

	return (
		<div className=''>
			<div className=''>
				<form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center'>
					<div className="form-floating mb-3 mt-3 w-50">
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

					<input type="submit" className='w-50'></input>
				</form>
			</div>
		</div>
	)
};

export default SignUp;