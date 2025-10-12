import ProductList from "./UI/home/ProductList";

import Header from "./UI/components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <Header />
      <ProductList />
    </main>
  );
}
