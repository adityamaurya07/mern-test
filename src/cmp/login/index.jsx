import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Layout from "../shared/layout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:9000/auth/login",
        data,
      });
      dispatch(login(response.data));
      navigate("/department");
      message.success("Login Success !");
    } catch (err) {
      console.log(err);
      dispatch(logout());
      message.error("Something went wrong !");
    }
  };

  return (
    <Layout>
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="bg-white shadow-md rounded px-8 py-6 md:w-5/12">
          <h2 className="text-2xl font-semibold mb-6">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                placeholder="Enter your email"
                className={`${
                  errors.email && "border-2 border-red-500"
                } w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500`}
              />
              {errors.email && (
                <span className="text-red-500 text-[13px]">
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                name="password"
                placeholder="Enter your password"
                className={`${
                  errors.email && "border-2 border-red-500"
                } w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500`}
              />
              {errors.password && (
                <span className="text-red-500 text-[13px]">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>
              <Link to="/signup">
                <a className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800">
                  Create account !
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
