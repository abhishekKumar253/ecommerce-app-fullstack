import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto"; 

dotenv.config();

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    products.forEach((product) => {
      const amount = Math.round(product.price * 100);
      totalAmount += amount * product.quantity;
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });

      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount,
      currency: "INR",
      receipt: `order_rcptid_${new Date().getTime()}`,
      payment_capture: 1,
    });
    console.log("Razorpay object:", razorpay);


    const order = new Order({
      user: req.user._id,
      products: products.map((product) => ({
        product: product._id,
        quantity: product.quantity,
        price: product.price,
      })),
      totalAmount: totalAmount / 100,
      razorpayOrderId: razorpayOrder.id,
      metadata: {
        couponCode: couponCode || null,
        userId: req.user._id,
      },
    });

    await order.save();

    res.status(200).json({
      orderId: razorpayOrder.id,
      amount: totalAmount / 100,
    });

    // Run coupon creation in background
    if (!coupon) {
      createNewCoupon(req.user._id).catch((err) =>
        console.error("Error creating coupon:", err)
      );
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing order", error: error.message });
  }
};

export const paymentSuccess = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    const order = await Order.findOne({ razorpayOrderId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return res
        .status(400)
        .json({ message: "Payment signature verification failed" });
    }

    if (order) {
      if (order.metadata.couponCode) {
        await Coupon.findOneAndUpdate(
          {
            code: order.metadata.couponCode,
            userId: order.metadata.userId,
          },
          { isActive: false }
        );
      }

      order.razorpayPaymentId = razorpayPaymentId;
      order.paymentStatus = "paid";
      await order.save();

      res.status(200).json({
        success: true,
        message:
          "Payment successful, order created, and coupon deactivated if used.",
        orderId: order._id,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error processing payment success",
      error: error.message,
    });
  }
};

function generateUniqueCode() {
  return `GIFT${Math.floor(1000 + Math.random() * 9000)}`;
}

async function createNewCoupon(userId) {
  try {
    const existingCoupon = await Coupon.findOne({ userId });

    if (existingCoupon) {
      await Coupon.findOneAndDelete({ userId });
    }

    const newCoupon = new Coupon({
      code: generateUniqueCode(),
      discountPercentage: 10,
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      userId: userId,
    });

    await newCoupon.save();

    return newCoupon;
  } catch (error) {
    console.error("Error creating coupon:", error);
    throw new Error("Error creating coupon");
  }
}
