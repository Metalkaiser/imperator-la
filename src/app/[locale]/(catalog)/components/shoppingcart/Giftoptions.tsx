"use client"

import Image from "next/image";
 import { GiftOption } from "@/app/utils/types";

interface Props {
  giftOptionsTitle: string;
  giftOptionsDescription: string;
  activeGiftOptions: GiftOption[];
  selectedGifts: GiftOption[];
  toggleGift: (gift: GiftOption) => void;
  mainCurrency: string;
}

export default function GiftOptions ({
  giftOptionsTitle,
  giftOptionsDescription,
  activeGiftOptions,
  selectedGifts,
  toggleGift,
  mainCurrency
}: Props) {
  return (
    <div className="flex flex-col gap-5 mx-5 mt-10">
      <h2 className="text-lg font-semibold">{giftOptionsTitle}</h2>
      <p className="text-sm text-center">{giftOptionsDescription}</p>
      <div className="flex flex-col gap-4">
        {activeGiftOptions.map((gift) => (
          <label
            key={gift.id}
            className="flex gap-4 items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <input
              type="checkbox"
              checked={!!selectedGifts.find((g) => g.id === gift.id)}
              onChange={() => toggleGift(gift)}
              className="cursor-pointer w-5 h-5"
            />
            {gift.image && (
              <Image
                src={gift.image}
                alt={gift.name}
                width={100}
                height={100}
                className="rounded object-cover"
              />
            )}
            <div className="flex flex-col">
              <h3 className="text-md font-medium">{gift.name}</h3>
              {gift.description && (
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {gift.description}
                </p>
              )}
              <p className="text-sm font-semibold mt-1">
                {mainCurrency}
                {gift.price.toFixed(2)}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}