import './App.css';
import SideNav from './components/SideNav';
import Main from './components/Main';
import Header from './components/Header';

function App() {
	return (
		<div>
			<div className='container-fluid d-flex gap-4'>
				<div>
					<SideNav></SideNav>
				</div>
			</div>
			<Header></Header>
			<Main></Main>
		</div>
	);
}

export default App;