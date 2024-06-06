//ajouter un nouvel utilisateur, mot de passe encrypté
import {User} from "@/models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

//fonction pour gérer le mot de passe de l'utilisateur et s'assurer que l'utilisateur a un mot de passe valide qui est plus long que 5 caractères, il va ensuite faire un hash avec salt du mot de passe
export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
    new Error('password must be at least 5 characters');
  }

  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  const createdUser = await User.create(body);
  return Response.json(createdUser);
}