import axios from "axios";
import { CreateToken } from "../module/token.module";
const LoginMiddleware = async (req, res, next) => {
  try {
    const userData = req.body;
    const token = await CreateToken(
      `${process.env.ENDPOINT}/auth/login`,
      userData
    );
    // console.log(userData, token);
    const { data } = await axios({
      type: "get",
      url: `${process.env.ENDPOINT}/user?token=${token}`,
    });
    req.session = {
      data,
    };
    next();
  } catch (err) {
    console.log(err.response.data);
    res.status(err.response.status).json(err.response.data);
  }
};
export default LoginMiddleware;
