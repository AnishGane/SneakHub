import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import axios from "axios";

//placing order using COD Method
const placeOrder = async (req, res) => {
  try {
    const authUserId = req.user?.userId || req.auth?.userId;
    const {
      userId: bodyUserId,
      items,
      amount,
      address,
      paymentMethod,
      payment,
      status,
    } = req.body || {};
    const userId = authUserId || bodyUserId;
    if (!userId || !items || !amount || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedItems = Array.isArray(items)
      ? items.map((i) => ({
          productId: i.productId,
          name: i.name,
          image: i.image,
          price: Number(i.price ?? 0),
          size: i.size,
          quantity: Number(i.quantity ?? 1),
        }))
      : [];

    const normalizedAddress =
      typeof address === "string"
        ? (() => {
            try {
              return JSON.parse(address);
            } catch {
              return {};
            }
          })()
        : address;

    const orderData = {
      userId,
      items: normalizedItems,
      amount: Number(amount),
      address: normalizedAddress,
      paymentMethod: paymentMethod || "COD",
      payment: payment !== undefined ? payment : false,
      status: status || "Order Placed",
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed", orderId: newOrder._id });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Place order using eSewa
// const placeOrderEsewa = async (req, res) => {
//   try {
//     const authUserId = req.user?.userId || req.auth?.userId;
//     const { userId: bodyUserId, items, amount, address, refId } = req.body;
//     const userId = authUserId || bodyUserId;
//     if (!userId || !items || !amount || !address || !refId) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
//     // Verify payment with eSewa
//     const params = new URLSearchParams();
//     params.append("amt", amount);
//     params.append("rid", refId);
//     params.append("pid", "softstitch_order");
//     params.append("scd", "EPAYTEST");
//     // Use production eSewa URL. For UAT, use: https://uat.esewa.com.np/epay/transrec
//     const response = await axios.post(
//       "https://esewa.com.np/epay/transrec",
//       params,
//       { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
//     );
//     if (response.data && response.data.includes("Success")) {
//       // Payment successful, create order
//       const orderData = {
//         userId,
//         items: Array.isArray(items)
//           ? items.map((i) => ({
//               productId: i.productId,
//               name: i.name,
//               image: i.image,
//               price: Number(i.price ?? 0),
//               size: i.size,
//               quantity: Number(i.quantity ?? 1),
//             }))
//           : [],
//         amount: Number(amount),
//         address:
//           typeof address === "string"
//             ? (() => {
//                 try {
//                   return JSON.parse(address);
//                 } catch {
//                   return {};
//                 }
//               })()
//             : address,
//         paymentMethod: "eSewa",
//         payment: true,
//         date: Date.now(),
//         status: "Processing",
//       };
//       const newOrder = new orderModel(orderData);
//       await newOrder.save();
//       await userModel.findByIdAndUpdate(userId, { cartData: {} });
//       res.json({
//         success: true,
//         message: "Payment successful and order placed",
//         order: newOrder,
//       });
//     } else {
//       res
//         .status(400)
//         .json({ success: false, message: "Payment verification failed" });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// Displaying all order data for admin panel
// const allOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({});

//     res.json({ success: true, orders });
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// user Order Data for frontend
const userOrders = async (req, res) => {
  try {
    const userId = req.user?.userId || req.auth?.userId || req.body?.userId;

    const orders = await orderModel.find({ userId });

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status by admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order payment status after eSewa payment
const updateOrderPaymentStatus = async (req, res) => {
  try {
    const { orderId, payment, status, refId } = req.body;
    const update = { payment, status };
    if (refId) update.refId = refId;
    await orderModel.findByIdAndUpdate(orderId, update);
    res.json({ success: true, message: "Order payment status updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  //   placeOrderEsewa,
  //   allOrders,
  userOrders,
  updateStatus,
  updateOrderPaymentStatus,
};
