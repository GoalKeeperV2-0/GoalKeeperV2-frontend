import React, { Suspense, lazy } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';



function App() {
  
  return (
    <div className="App">


<Router>
				<Suspense fallback={<div>Loading..</div>}>
					<Routes>
					<Route path="/" element={<Home />} />
						<Route path="/oauth2/callback" element={<Home />} />

						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</Router>
      
    </div>
  );
}

export default App;
/*




         */