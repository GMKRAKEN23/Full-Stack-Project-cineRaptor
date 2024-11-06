import prisma from "@/utils/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server"; 
import { NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { movieId: string } }) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const { movieId } = params; 

  // Recherche si le film est déjà aimé par l'utilisateur
  const existingLike = await prisma.movieLike.findFirst({
    where: {
      movieId: movieId,
      user: {
        email: token.email as string,
      },
    },
  });

  let user;
  if (existingLike) {
    // Si le film est déjà aimé, le retirer
    await prisma.movieLike.delete({
      where: {
        id: existingLike.id,
      },
    });
    user = { message: "Movie removed from likes" };
  } else {
    // Sinon, l'ajouter aux favoris
    user = await prisma.user.update({
      where: {
        email: token.email as string, 
      },
      data: {
        movieLikes: {
          create: [{ movieId }],
        },
      },
    });
  }

  return NextResponse.json(user);
}
