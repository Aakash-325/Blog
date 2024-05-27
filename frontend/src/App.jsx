import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostDetail from "./pages/PostDetail";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import DashBoard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import Search from "./pages/Search";
import AddBlog from "./pages/AddBlog";

function HeaderAndFooterRouter() {
  const location = useLocation();
  const shouldRenderHeaderAndFooter = !["/auth"].includes(location.pathname);

  return (
    <>
      {shouldRenderHeaderAndFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/create" element={<AddBlog />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/myposts/:id" element={<DashBoard />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {shouldRenderHeaderAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <HeaderAndFooterRouter />
    </Router>
  );
}

export default App;
