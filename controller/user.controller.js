import User from "../schema/user.schema.js";
import { VerifyToken } from "../module/token.module";
import { decrypt } from "../module/bcrypt.module.js";

export const Get = async (req, res) => {
  try {
    const { token } = req.query;
    const data = await VerifyToken(token);
    if (data) {
      const query = {
        email: data.email,
      };
      const user = await User.find(query);
      if (user.length) {
        const typedPass = data.password;
        const userPass = user[0].password;

        const isPasswordMatch = await decrypt(userPass, typedPass);

        if (isPasswordMatch) {
          res.status(200).json({
            isLogged: true,
            data: user[0],
            message: "Password is Correct !",
          });
        } else {
          res.status(401).json({
            isLogged: false,
            message: "Password is Incorrect !",
          });
        }
      } else {
        res.status(404).json({
          isUserExists: false,
          message: "Email Not Found !",
        });
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const Post = async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);
    const newUser = new User(userData);
    const userRes = await newUser.save();

    console.log("User created:", userRes);

    res.status(200).json({
      isUserCreated: true,
      message: "User created successfully!",
    });
  } catch (error) {
    // Use 400 Bad Request status for request payload or data issues
    console.log(error);
    res.status(400).json({
      isUserCreated: false,
      message: error.message,
    });
  }
};
