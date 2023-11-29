import { CreateToken } from "../module/token.module";
import axios from "axios";

export const Register = async (req, res) => {
  try {
    const registerRes = await axios({
      method: "post",
      url: `${process.env.ENDPOINT}/user`,
      data: req.body,
    });
    console.log("register", registerRes.data);
    res.status(registerRes.status).json(registerRes.data);
  } catch (err) {
    console.log(err);
    res.status(err.response.status).json(err.response.data);
  }
};

export const Login = async (req, res) => {
  try {
    if (req.session.data.isLogged) {
      const userToken = await CreateToken(
        `${process.env.ENDPOINT}/auth/login`,
        req.session.data
      );
      res.cookie("authToken", userToken, {
        maxAge: 86400000,
        // domain: "localhost:3000",
        secure: true,
        httpOnly: true,
      });
      res.status(200).json({
        data: req.session.data,
        token: userToken,
      });
    } else {
      res.json(userRes.body);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
