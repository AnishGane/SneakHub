import { Webhook } from "svix";
import User from "../models/user.model.js";

// API controller Function to Manage Clerk User w/ database
const clerkWebHooks = async (req, res) => {
  try {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return res
        .status(500)
        .json({ success: false, message: "Missing CLERK_WEBHOOK_SECRET" });
    }

    const svix = new Webhook(webhookSecret);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const payloadString = Buffer.isBuffer(req.body)
      ? req.body.toString("utf8")
      : String(req.body || "");

    try {
      svix.verify(payloadString, headers);
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid webhook signature" });
    }

    const parsed = JSON.parse(payloadString || "{}");
    const { data, type } = parsed;
    console.log("Received webhook:", type, data?.id);

    switch (type) {
      case "user.created": {
        const name = [data?.first_name, data?.last_name]
          .filter(Boolean)
          .join(" ");
        const email = data?.email_addresses?.[0]?.email_address;
        const image = data?.image_url || "";
        if (!data?.id) {
          console.log("user.created missing id, skipping");
          return res.status(200).json({ success: true, note: "no id" });
        }
        if (!email) {
          console.log("user.created missing email, skipping", data?.id);
          return res.status(200).json({ success: true, note: "no email" });
        }
        await User.updateOne(
          { _id: data.id },
          {
            $set: {
              name: name || email,
              email,
              image,
            },
          },
          { upsert: true }
        );
        return res.json({ success: true });
      }
      case "user.updated": {
        const name = [data?.first_name, data?.last_name]
          .filter(Boolean)
          .join(" ");
        const email = data?.email_addresses?.[0]?.email_address;
        const image = data?.image_url || "";
        if (!data?.id) {
          console.log("user.updated missing id, skipping");
          return res.status(200).json({ success: true, note: "no id" });
        }
        const updateSet = {};
        if (name) updateSet.name = name;
        if (email) updateSet.email = email;
        if (image) updateSet.image = image;
        await User.updateOne({ _id: data.id }, { $set: updateSet });
        return res.json({ success: true });
      }
      case "user.deleted": {
        if (!data?.id) {
          console.log("user.deleted missing id, skipping");
          return res.status(200).json({ success: true, note: "no id" });
        }
        await User.deleteOne({ _id: data.id });
        return res.json({ success: true });
      }
      default: {
        return res.status(200).json({ success: true });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Webhooks error" });
  }
};

export default clerkWebHooks;
