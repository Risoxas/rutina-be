import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

class UserService {
  async signUp(email: string, password: string, clientId: string) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email already exists.");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      role: "user",
      clientId,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );
    return { user, token };
  }

  async signIn(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials.");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return { user, token };
  }

  async resetPassword(email: string, token: string, newPassword: string) {
    const user = await User.findOne({
      email: email,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) throw new Error("Invalid token.");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return user;
  }

  async updatePassword(
    email: string,
    currentPasword: string,
    newPassword: string
  ) {
    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found.");

    const isMatch = await bcrypt.compare(currentPasword, user.password);

    if (!isMatch) throw new Error("Invalid credentials.");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return user;
  }
}

export default new UserService();
