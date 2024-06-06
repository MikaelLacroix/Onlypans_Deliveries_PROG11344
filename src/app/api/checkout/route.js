//aller ramasser les variables et les données qui sont nécessaires pour faire le système de cart et aller ramasser ce qui a été mis dans le cart avec MongoDB
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {MenuItem} from "@/models/MenuItem";
import {Order} from "@/models/Order";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";
const stripe = require('stripe')(process.env.STRIPE_SK);

//entrer les données pour le cart et le lier à l'utilisateur qui est entré
export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);

  const {cartProducts, address} = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

//la commande est appelée pour dire les paramètres de la commande
  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  //on entre dans la bse de données pour aller entrer les items du cart dans notre nouvelle liste et on les associe à la commande de l'utilisateur
  const stripeLineItems = [];
  for (const cartProduct of cartProducts) {

    const productInfo = await MenuItem.findById(cartProduct._id);

    let productPrice = productInfo.basePrice;
    if (cartProduct.size) {
      const size = productInfo.sizes
        .find(size => size._id.toString() === cartProduct.size._id.toString());
      productPrice += size.price;
    }
    if (cartProduct.extras?.length > 0) {
      for (const cartProductExtraThing of cartProduct.extras) {
        const productExtras = productInfo.extraIngredientPrices;
        const extraThingInfo = productExtras
          .find(extra => extra._id.toString() === cartProductExtraThing._id.toString());
        productPrice += extraThingInfo.price;
      }
    }

    const productName = cartProduct.name;
//information sur les prix des items en CAD
    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: 'CAD',
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100,
      },
    });
  }
//vérifier si la commande est faite ou non et si elle est annulée, il faut vider le cart
  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    customer_email: userEmail,
    success_url: process.env.NEXTAUTH_URL + 'orders/' + orderDoc._id.toString() + '?clear-cart=1',
    cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
    metadata: {orderId:orderDoc._id.toString()},
    payment_intent_data: {
      metadata:{orderId:orderDoc._id.toString()},
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Delivery fee',
          type: 'fixed_amount',
          fixed_amount: {amount: 500, currency: 'CAD'},
        },
      }
    ],
  });

  //réponse de la constante qui vient d'être faite
  return Response.json(stripeSession.url);
}