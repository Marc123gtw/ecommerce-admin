import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// POST /api/[storeId]/billboards
export async function POST(req: Request, context: { params: { storeId: string } }) {
  try {
    // await params
    const storeId = await Promise.resolve(context.params.storeId);
    if (!storeId) return new NextResponse("Store id is required", { status: 400 });

    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const { label, imageUrl } = await req.json();
    if (!label) return new NextResponse("Label is required", { status: 400 });
    if (!imageUrl) return new NextResponse("Image URL is required", { status: 400 });

    // Проверка, что магазин принадлежит пользователю
    const store = await prismadb.store.findFirst({
      where: { id: storeId, userId },
    });
    if (!store) return new NextResponse("Unauthorized", { status: 403 });

    const billboard = await prismadb.billboard.create({
      data: { label, imageUrl, storeId },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// GET /api/[storeId]/billboards
export async function GET(req: Request, context: { params: { storeId: string } }) {
  try {
    // await params
    const storeId = await Promise.resolve(context.params.storeId);
    if (!storeId) return new NextResponse("Store id is required", { status: 400 });

    const billboards = await prismadb.billboard.findMany({
      where: { storeId },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.error("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
 