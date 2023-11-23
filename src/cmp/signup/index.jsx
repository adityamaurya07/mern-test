import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Layout from "../shared/layout";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const router = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:9000/auth/signup",
        data,
      });
      message.success(res.data.message);
      router("/login");
      // console.log(res.data);
    } catch (err) {
      message.error("Something went wrong");
      // console.log(err.response);
    }
  };
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm bg-white rounded-lg shadow-md p-8"
        >
          <h2 className="text-2xl mb-6">Register</h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              id="name"
              name="name"
              className="focus:outline-none block w-full shadow-sm sm:text-sm border rounded-md py-2 px-3 "
            />
            {errors.name && (
              <span className="text-red-500 text-[13px]">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              name="email"
              className="focus:outline-none block w-full shadow-sm sm:text-sm border rounded-md py-2 px-3"
            />
            {errors.email && (
              <span className="text-red-500 text-[13px]">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <input
              {...register("role", { required: true })}
              type="text"
              name="role"
              className="focus:outline-none block w-full shadow-sm sm:text-sm border rounded-md py-2 px-3"
            />
            {errors.role && (
              <span className="text-red-500 text-[13px]">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              name="password"
              className="focus:outline-none block w-full shadow-sm sm:text-sm border rounded-md py-2 px-3"
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
              className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
            <div className="flex items-center gap-x-3 text-[12px]">
              <h1 className="">Already have an account?</h1>
              <Link to="/login">
                <a className="text-indigo-500 font-bold text-[15px] hover:text-indigo-600">
                  Login
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
