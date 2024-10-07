import { Toaster } from "react-hot-toast";

//import the feedback component
import Feedback from "./Feedback";
import { useTastimuntyStore } from "@/lib/store";
import { useEffect } from "react";
import TastimuntyContainer from "./TastimuntyContainer";

function Tastimunty({ tastimuntyId }: { tastimuntyId: string }) {
  const store = useTastimuntyStore();

  useEffect(() => {
    // save the tastimuntyId to the value from
    store.setTastimuntyId(tastimuntyId);
  }, []);
  return (
    <TastimuntyContainer>
      <div>
        <Feedback />
        <Toaster />
      </div>
    </TastimuntyContainer>
  );
}

export default Tastimunty;
