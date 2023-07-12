import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import prisma from "@utils/auth/db/client";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { email, password } = (await req.json()) as {
      email: string;
      password: string;
    };

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return new Response(
        JSON.stringify({ status: "error", message: "User already exists!" }),
        { status: 500 }
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hashePassword = bcrypt.hashSync(String(password), salt);

    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashePassword,
        role: "USER",
      },
    });

    return new Response(
      JSON.stringify({ user: { email: newUser.email, name: newUser.name } }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
};
