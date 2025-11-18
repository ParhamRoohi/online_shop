import HomePage from "./UI/home/HomePage";
import React, { Suspense } from "react";
import ProductList from "./UI/home/ProductList";
import ProductSkeleton from "./UI/home/ProductSkeleton";


export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const selectedCategory =
    typeof params.category === "string"
      ? params.category
      : Array.isArray(params.category)
      ? params.category[0]
      : "All";
  const searchQuery =
    typeof params.q === "string"
      ? params.q
      : Array.isArray(params.q)
      ? params.q[0]
      : "";

  const skeleton = (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 h-fit w-full gap-2 xl:mt-12 mt-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <HomePage>
        <Suspense fallback={skeleton}>
          <ProductList
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
          />
        </Suspense>
      </HomePage>
    </main>
  );
}