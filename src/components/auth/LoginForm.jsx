
import { Link, useNavigate } from 'react-router-dom';
import Field from '../common/Field';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );

      if (response.status === 200) {
        const { user, token } = response.data;
        if (token) {
          const authToken = token.accessToken;
          const refreshToken = token.refreshToken;
          console.log(`Login time auth token: ${authToken}`);
          setAuth({ user, authToken, refreshToken });

          navigate('/');
        }
      }
    } catch (error) {
      console.error(error);
      setError('root', {
        type: 'manual',
        message: `User with email ${formData.email} is not found`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="mb-6">
        <Field>
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            {...register('email', { required: 'Email Address is Required' })}
            type="email"
            id="email"
            className={`w-full p-3 ${
              errors.email ? 'border-red-500' : 'bg-[#030317] border border-white/20'
            } rounded-md focus:outline-none focus:border-indigo-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </Field>
        <Field>
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Your password must be at least 8 characters',
              },
            })}
            type="password"
            id="password"
            className={`w-full p-3 ${
              errors.password ? 'border-red-500' : 'bg-[#030317] border border-white/20'
            } rounded-md focus:outline-none focus:border-indigo-500`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </Field>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
          >
            Login
          </button>
        </div>
      </div>
      <p className="text-center">
        Don't have an account?{' '}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
