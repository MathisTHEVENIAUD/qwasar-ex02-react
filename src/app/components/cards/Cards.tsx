import data from "./cards.json";
import Image from "next/image";
import { useState } from "react";

type CardProps = {
    id: number | string;
};

export default function Card(props: CardProps) {

    let [like, setLike] = useState(0);
    const item = data.items.find((el) => el.id === Number(props.id));

    if (!item) return <p>Not found</p>;

    return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border p-3 px-16">
        <h2 className="text-xl">{item.title}</h2>
        {/* <p>{item.description}</p> */}
        <div className="relative overflow-hidden rounded-lg w-[300px] h-[200px]">
            <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
            />
        </div>
        <div className="flex flex-row gap-4 mt-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            👍 Like
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
            👎 Dislike
            </button>
        </div>
    </div>
    );
}