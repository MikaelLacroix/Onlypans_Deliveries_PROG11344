//fonctions pour compléter une commande
import {Order} from "@/models/Order";

//utiliser stripe pour le paiement
const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  let event;

  //pour pouvoir attrapper les erreurs, il faut faire ces étapes et comme ceci on peut savoir si il y a eu une erreur avec stripe
  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    console.error('stripe error');
    console.log(e);
    return Response.json(e, {status: 400});
  }

  //si le paiement est complété, il y aura un nouveau statut sur la commande et on pourra les envoyer au backend pour qu'elles soient complétées
  if (event.type === 'checkout.session.completed') {
    console.log(event);
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === 'paid';
    if (isPaid) {
      await Order.updateOne({_id:orderId}, {paid:true});
    }
  }

  return Response.json('ok', {status: 200});
}