import { useGetProductsQuery } from "src/services/platziApi";
import { Input } from "../components/ui/input";

export const Search = () => {
  const searchChangeHandler = (title: string) => {
    const trimTitle = title.trim()
    console.log(trimTitle);

    const limit = 1000
    const offset = 0

    useGetProductsQuery({limit,offset,title: trimTitle})    
  };

  return (
    <>
      <Input onChange={(e) => searchChangeHandler(e.target.value)} placeholder="Title of product..." />
    </>
  );
};
