import { Link, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Field from "../components/common/Field";
import { useForm } from "react-hook-form";
import axios from "axios";

const RegistrationPage = () => {
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submiData = async(formData) => {
    console.log(formData);
   try{
   const response= await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,formData)
   if(response.status===201){
      navigate("/login")
   }
   }
   catch(error){
      console.error(error)
      setError("root".random, {
        type: "random",
        message: `SomeThing Went Wrong ${error.message}`,})
   }




  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(submiData)}>
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="text-2xl font-bold mb-6">Register</h2>

          <Field>
            <div className="mb-6">
              <label htmlFor="firstName" className="block mb-2">
                First Name
              </label>
              <input
                {...register("firstName", { required: "Enter you First Name" })}
                type="text"
                id="firstName"
                name="firstName"
                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              />
               {errors.firstName && (
                <span className="text-red-500 text-sm">{errors.firstName.message}</span>
              )}
            </div>
          </Field>
          <Field>
            <div className="mb-6">
              <label htmlFor="lastName" className="block mb-2">
                Last Name
              </label>
              <input
                {...register("lastName", { required: "Last name is required" })}
                type="text"
                id="lastName"
                name="lastName"
                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              />
               {errors.lastName && (
                <span className="text-red-500 text-sm">{errors.lastName.message}</span>
              )}
            </div>
          </Field>

          <Field>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email Address is Required",
                })}
                type="email"
                id="email"
                name="email"
                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>
          </Field>
          <Field>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Your password must be at least 8 characters",
                  },
                })}
                type="password"
                id="password"
                name="password"
                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>
          </Field>
          <p>{errors?.root?.random?.message}</p>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            >
              Register
            </button>
          </div>

          <p className="text-center">
            Already have account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default RegistrationPage;
