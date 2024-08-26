
import LoginForm from '../components/auth/LoginForm'
import Header from '../components/common/Header'
import Footer from './Footer'

const LoginPage = () => {
  return (
    <>
    <Header/>
    <section className="container">
      <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <LoginForm/>
        
      </div>
    </section>
    <Footer/>
    </>
    
  )
}

export default LoginPage