import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import DynamicForm from "./DynamicForm";
import { Button } from "./ui/button";
import useFormFeedback from "../hooks/useFormFeedback";

export default function Feedback() {
  const { isLoading, isError, formSchema, error } = useFormFeedback();
  return (
    <div className="fixed bg-black shadow-sm p-1 left-0 top-[100px]">
      <Drawer>
        <DrawerTrigger asChild>
          <div className="flex flex-col w-[20px] py-1 pr-1 text-white uppercase">
            {"Feedback".split("").map((letter, idx) => (
              <span key={idx} className="rotate-90">
                {letter}
              </span>
            ))}
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex justify-center">
            <div>
              <DrawerHeader className="text-center ">
                <DrawerTitle className="text-xl text-center">
                  {formSchema ? formSchema.title : "Loaders"}
                </DrawerTitle>
                <DrawerDescription className="text-center">
                  {formSchema ? formSchema.description : "Loaders"}
                </DrawerDescription>
              </DrawerHeader>
              <div>
                <DynamicForm
                  formSchema={formSchema}
                  error={error}
                  isError={isError}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>

          <DrawerFooter>
            <Button asChild>Cancel</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>;
