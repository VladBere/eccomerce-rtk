import { Button } from "../components/ui/button";
import { Product, trunc } from "..";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

interface CardSkeletonProps {
  product: Product;
  image: string;
}

export const CardSkeleton = ({ product, image }: CardSkeletonProps) => {
  return (
    <>
      <Card className="w-[350px] h-[600px] flex flex-col justify-between">
        <div>
        <CardHeader>
          <img className="rounded-lg" src={image} alt="" />
        </CardHeader>
        <CardContent>
          <CardTitle>{product.title}</CardTitle>
          <CardDescription >
            {trunc(product.description, 200)}
            <p className="text-lg text-green-500">{product.price} $</p>
          </CardDescription> 
        </CardContent>
        </div>
        <CardFooter className="flex justify-end">
          <Button variant="destructive">Delete</Button>
        </CardFooter>
      </Card>
    </>
  );
};
