import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import SingleBlogPage from "./pages/SingleBlogPage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoutes from "./Routes/PrivateRoutes";
import CreateBlog from "./components/blogs/CreateBlog";
import SearchBlog from "./components/blogs/SearchBlog";
import Footer from "./pages/Footer";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/single-blog/:id" element={<SingleBlogPage />} />
          <Route path="/CreateBlog" element={<CreateBlog />} />
          <Route path="/search" element={<SearchBlog />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegistrationPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
