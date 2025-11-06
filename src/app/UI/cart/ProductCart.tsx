"use client";
import React from "react";
import { useCart } from "@/app/context/CartContext";
import { Add, Delete, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Image from "next/image";

function ProductCart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCart();

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-8 py-24">
        <h1 className="text-2xl font-semibold leading-tight mb-4">
          Shopping Cart
        </h1>
        {cartItems.length === 0 ? (
          <p className="mt-4 text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Total Price
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={item.id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {index + 1}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-20 h-20">
                              <Image
                                className="w-full h-full object-contain"
                                src={item.image}
                                alt={item.title}
                                width={80}
                                height={80}
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap font-semibold">
                                {item.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm max-w-xs">
                          <p className="text-gray-900 whitespace-no-wrap overflow-hidden overflow-ellipsis">
                            {item.description}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            ${item.price.toFixed(2)}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                          <div className="flex items-center justify-center">
                            <IconButton
                              onClick={() => decreaseQuantity(item.id)}
                              size="small"
                            >
                              <Remove />
                            </IconButton>
                            <p className="text-gray-900 whitespace-no-wrap mx-2">
                              {item.quantity}
                            </p>
                            <IconButton
                              onClick={() => increaseQuantity(item.id)}
                              size="small"
                            >
                              <Add />
                            </IconButton>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                          <IconButton onClick={() => removeFromCart(item.id)}>
                            <Delete className="text-red-500" />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="text-xl font-semibold mt-8">
              Grand Total: ${getTotalPrice().toFixed(2)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductCart;
