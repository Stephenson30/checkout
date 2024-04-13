import { connectMongoDB } from "@/lib/mongodb";
import Business from "@/models/business";
import User from "@/models/user";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { email } = req.query;
    // console.log(email);
    // console.log("connected")

    try {
      await connectMongoDB();
      const userLog = await User.findOne({ email }); // Correct the usage of findById
    //   console.log(userLog);
      if (userLog) {
        const returnData = {
          name: userLog.name,
          image: userLog.picture,
        };

        res.status(200).json(returnData);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    const { email } = req.query;
    const { businessName, image } = req.body;

    try {
      await connectMongoDB();
      const user = await User.findOne({ email });

      if (user) {
          // Update user information
          user.name = businessName || user.name;
          user.picture = image || user.picture;
          // Add other fields you want to update
          
        //   console.log(`user: ${user}`)
        // Save the updated user document
        await user.save();

        console.log("User information updated successfully");
        res
          .status(200)
          .json({ message: "User information updated successfully" });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
