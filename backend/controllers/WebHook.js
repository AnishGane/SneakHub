import { Webhook } from "svix";
import User from "../models/user.model.js";

// API controller Function to Manage Clerk User w/ database

const clerkWebHooks = async () => {
  try {
    // Create the Svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the headers
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // Getting data from the request body
    const { data, type } = req.body;

    // Switch case for different events
    switch (type) {
      case "user.created": {
        const userData = new User({
          _id: data.id,
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          picture: data.image_url,
        });
        await User.create(userData);
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = new User({
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          picture: data.image_url,
        });
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "WebHooks error" });
  }
};

export default clerkWebHooks;
