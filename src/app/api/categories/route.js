//importer les données pour les
import {isAdmin} from "@/app/api/auth/[...nextauth]/route";
import {Category} from "@/models/Category";
import mongoose from "mongoose";

//faire les post pour les requêtes http qui vont être envoyées à notre API de MongoDB pour les utilisateurs et soit les laisse entrer ou non
export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const {name} = await req.json();
  if (await isAdmin()) {
    const categoryDoc = await Category.create({name});
    return Response.json(categoryDoc);
  } else {
    return Response.json({});
  }
}

//fonction pour mettre à jour les données dans la base de données
export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const {_id, name} = await req.json();
  if (await isAdmin()) {
    await Category.updateOne({_id}, {name});
  }
  return Response.json(true);
}

//fonction pour aller ramasser les données d'utilisateurs de MongoDB
export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  return Response.json(
    await Category.find()
  );
}

//fonction pour enlever des données d'utilisateurs de MongoDB
export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (await isAdmin()) {
    await Category.deleteOne({_id});
  }
  return Response.json(true);
}