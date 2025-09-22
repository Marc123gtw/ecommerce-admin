import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// POST /api/[storeId]/categories
export async function POST(req: Request, context: { params: { storeId: string } }) {
  try {
    // await params
    const storeId = await Promise.resolve(context.params.storeId);
    if (!storeId) return new NextResponse("Store id is required", { status: 400 });

    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const { name, billboardId } = await req.json();
    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!billboardId) return new NextResponse("Billboard id is required", { status: 400 });

    // Проверяем владельца магазина
    const store = await prismadb.store.findFirst({
      where: { id: storeId, userId },
    });
    if (!store) return new NextResponse("Unauthorized", { status: 403 });

    const category = await prismadb.category.create({
      data: { name, billboardId, storeId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// GET /api/[storeId]/categories
export async function GET(req: Request, context: { params: { storeId: string } }) {
  try {
    // await params
    const storeId = await Promise.resolve(context.params.storeId);
    if (!storeId) return new NextResponse("Store id is required", { status: 400 });

    const categories = await prismadb.category.findMany({ where: { storeId } });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
 