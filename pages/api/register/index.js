import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";


export default async function POST(req, res) {
  try {
    const { name, email, family_name, given_name, picture, iss } = req.body;
 

    await connectMongoDB();
    // Create a new user object with the provided data

    await User.create({ name, email, family_name:"", given_name:"", picture:"", iss:"", business_name:"", address:"" });
    
    // console.log("New user object:", newUser);
    res.status(200).json({ message: "User registered" });
  } catch (error) {
    console.error("User creation error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
