"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "../../context/CartContext";

interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}

function ProductCard({
  id,
  image,
  title,
  description,
  price,
  rating,
}: ProductCardProps) {
  const { addToCart, cartItems, increaseQuantity, decreaseQuantity } =
    useCart();

  const handleAddToCart = () => {
    addToCart({
      id: id,
      title: title,
      description: description,
      price: price,
      quantity: 1,
      image: image,
    });
  };

  const cartItem = cartItems.find((item) => item.id === id);

  return (
    <article className="flex w-full flex-col shadow-md hover:shadow-xl transition-shadow duration-150 rounded-xl">
      <div className="h-96">
        <Image
          className="w-full h-full py-10 px-10 object-contain"
          src={image}
          alt={title}
          width={100}
          height={100}
        />
      </div>
      <section className="flex flex-col justify-between h-full mx-6 my-4 gap-3">
        <div>
          <h1 className="line-clamp-1 text-lg font-[500]">{title}</h1>
          <p className="line-clamp-5 ">{description}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl font-[600] flex flex-row justify-between">
            <span>$ {price}</span>
            <span>Rata: {rating.rate}</span>
          </div>
          {cartItem ? (
            <div className="flex items-center justify-around">
              <button
                className="bg-blue-600 text-white rounded-lg w-1/4 py-[6px] shadow-[0_0_15px_1px_] shadow-indigo-500/40 hover:shadow-indigo-500/90 transition-shadow duration-150"
                onClick={() => decreaseQuantity(id)}
              >
                -
              </button>
              <span>{cartItem.quantity}</span>
              <button
                className="bg-blue-600 text-white rounded-lg w-1/4 py-[6px] shadow-[0_0_15px_1px_] shadow-indigo-500/40 hover:shadow-indigo-500/90 transition-shadow duration-150"
                onClick={() => increaseQuantity(id)}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="bg-blue-600 text-white rounded-lg px-3 py-[6px] shadow-[0_0_15px_1px_] shadow-indigo-500/40 hover:shadow-indigo-500/90 transition-shadow duration-150"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}
        </div>
      </section>
    </article>
  );
}

export default ProductCard;
