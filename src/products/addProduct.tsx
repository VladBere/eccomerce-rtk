import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
  } from "../components/ui/dialog";
  import { Button } from "../components/ui/button";
  import { DialogHeader } from "../components/ui/dialog";
  import { Input } from "../components/ui/input";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { z } from "zod";
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../components/ui/select";
  import { Inputs, Product } from "src";
  import { useForm } from "react-hook-form";
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
  } from "../components/ui/form";
  import { useAddProductMutation } from "../services/platziApi";
  
  // Updated formSchema to match all form fields
  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "Description must be at least 2 characters.",
    }),
    price: z.string().min(1, {
      message: "Price is required.",
    }),
    categoryId: z.string().min(1, {
      message: "Category is required.",
    }),
  });
  
  export const AddProduct = () => {
    const [addProduct] = useAddProductMutation();
  
    const form = useForm<Inputs>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
        description: "",
        price: "",
        categoryId: "",
      },
    });
  
    const onSubmit = async (values: Omit<Product, "id" | "images">) => {
      const newProduct: Product = {
        id: Math.floor(Math.random() * 3131123),
        images: ["https://picsum.photos/200"],
        ...values,
      };
  
      try {
        await addProduct(newProduct).unwrap();
        console.log("Product added successfully:", newProduct);
      } catch (error) {
        console.error("Failed to add product:", error);
      }
    };
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add product</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add product</DialogTitle>
            <DialogDescription>Add your own product!</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel htmlFor="title" className="text-right">
                          Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="title"
                            placeholder="My product ..."
                            className="col-span-3"
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel htmlFor="description" className="text-right">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="description"
                            placeholder="My product is ..."
                            className="col-span-3"
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel htmlFor="price" className="text-right">
                          Price
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="price"
                            placeholder="A lot $"
                            className="col-span-3"
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel htmlFor="categoryId" className="text-right">
                          Category
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem key="1" value="1143">
                                  Clothes
                                </SelectItem>
                                <SelectItem key="2" value="1144">
                                  Electronics
                                </SelectItem>
                                <SelectItem key="3" value="1145">
                                  Shoes
                                </SelectItem>
                                <SelectItem key="4" value="1146">
                                  Miscellaneous
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">Add this product</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  };
  