import './App.css';
import Header from './Header.js';
import Searchbar from './Searchbar.js';
import Footer from './Footer.js';

function App() {
    return (
        <div className="App">
            <Header />
            <div className="content-wrapper">
                <Searchbar />
            </div>
            <Footer />
        </div>
    )
}

export default App;
