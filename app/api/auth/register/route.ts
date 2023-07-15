import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import prisma from "@utils/auth/db/client";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { email, password } = (await req.json()) as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "email and password are required!",
        }),
        { status: 500 }
      );
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(String(password), salt);

    if (userExists) {
      if (userExists.password) {
        return new Response(
          JSON.stringify({ status: "error", message: "user already exists!" }),
          { status: 500 }
        );
      } else {
        await prisma.user.update({
          where: { email },
          data: {
            password: hashedPassword,
          },
        });

        return new Response(
          JSON.stringify({
            user: { email: userExists.email, name: userExists.name },
          }),
          {
            status: 200,
          }
        );
      }
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          password: hashedPassword,
          role: "USER",
          profiles: {
            create: {
              email,
            },
          },
          accounts: {
            create: {
              provider: "credentials",
              type: "credentials",
              providerAccountId: email,
            },
          },
        },
      });

      return new Response(
        JSON.stringify({ user: { email: newUser.email, name: newUser.name } }),
        {
          status: 200,
        }
      );
    }
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
