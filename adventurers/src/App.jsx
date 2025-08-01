import { Routes, Route, Link } from "react-router-dom";
import AdventurerList from "./pages/AdventurerList";
import CreateAdventurer from "./pages/CreateAdventurer";
import EditAdventurer from "./pages/EditAdventurer";
import AdventurerDetail from "./pages/AdventurerDetail";
import "./App.css";

const Home = () => (
    <div className="home-page">
        <h1 className="home-title">Welcome to Adventurer Team Builder!</h1>
        <p className="home-desc">
            Assemble your dream team of adventurers to conquer any journey.
            <br />
            <span className="home-highlight">
                Create, view, edit, and manage your custom crew!
            </span>
        </p>
    </div>
);

const App = () => {
    return (
        <div className="main-container">
            <aside className="sidebar">
                <h2 className="sidebar-title">Adventurer Hub</h2>
                <nav className="sidebar-nav">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                    <Link to="/gallery" className="nav-link">
                        Gallery
                    </Link>
                    <Link to="/create" className="nav-link">
                        Create Adventurer
                    </Link>
                </nav>
            </aside>
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/gallery" element={<AdventurerList />} />
                    <Route path="/create" element={<CreateAdventurer />} />
                    <Route
                        path="/adventurer/:id"
                        element={<AdventurerDetail />}
                    />
                    <Route path="/edit/:id" element={<EditAdventurer />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
