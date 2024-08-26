import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import { useAuth } from "../hooks/useAuth";
// import Footer from "../pages/Footer";
import BlogProvider from "../providers/BlogProvider";
import ProfileProvider from "../providers/ProfileProvider";

const PrivateRoutes = () => {
  const { auth } = useAuth();

  if (auth.authToken) {
    return (
      <>
        <BlogProvider>
          <ProfileProvider>
            <Header />
            <main className="mx-auto max-w-[1020px] py-8">
              <div className="container">
                <Outlet />
              </div>
            </main>
          </ProfileProvider>
        </BlogProvider>
      </>
    );
  }

  return <Navigate to="/login" />;
};

export default PrivateRoutes;
