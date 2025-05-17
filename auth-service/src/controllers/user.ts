import jwt from "jsonwebtoken";
import { publishAuditEvent } from "../lib/redisClient";
import { createUser, findUserByEmail } from "../models/user";
import { comparePassword, hashPassword } from "../utils/hash";

export const registerUser = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).send('Email already registered');
    }

    const hashed = await hashPassword(password);
    const newUser = await createUser(email, hashed);
    console.log("🚀 ~ registerUser ~ newUser:", newUser)

    await publishAuditEvent({
      event: "USER_REGISTERED",
      timestamp: new Date().toISOString(),
      userId: newUser.id,
      metadata: {
        email: newUser.email,
      },
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: '1h'
    });

    await publishAuditEvent({
      event: "USER_LOGGED_IN",
      timestamp: new Date().toISOString(),
      userId: user.id,
      metadata: {
        email: user.email,
      },
    });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

export default { registerUser, login }