import { useState } from "react";
import { Input } from "../components/ui/input";
import { AddProduct } from "../products/addProduct";
import { CardSkeleton } from "../products/card-skeleton";
import { useGetProductsQuery } from "../services/platziApi";

export const ProductMain = ({ limit = 1000, offset = 0 }) => {
  const [search, setSearch] = useState<string>("");
  let { data: products, isLoading } = useGetProductsQuery({
    limit,
    offset,
    title: search,
  });

  const searchChangeHandler = (title: string) => {
    const trimTitle = title.trim();
    console.log(trimTitle);
    setSearch(trimTitle)
  };

  return (
    <div className="mt-5 ml-5">
      {isLoading ? (
        <p className="text-3xl text-center">Loading...</p>
      ) : (
        <>
          <div className="flex gap-x-5">
            <AddProduct />
            <Input
              onChange={(e) => searchChangeHandler(e.target.value)}
              placeholder="Title of product..."
            />
          </div>
          <ul className="flex flex-wrap gap-8 mt-5">
            {products?.map((product) => (
              <li key={product.id}>
                <CardSkeleton product={product} image={product.images[0]} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
