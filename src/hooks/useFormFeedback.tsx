import { useQuery } from "react-query";
import { api } from "@/lib/api";
import { FormSchema } from "@/components/DynamicForm";
function useFormFeedback() {
  const {
    data: formSchema,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["form-feedback"],
    queryFn: async () => {
      const response = await api.get(
        "/demo/b21d82b3-af02-47aa-940a-f0b991ea26de"
      );
      console.log("response", response);
      return response.data as FormSchema;
    },
  });
  return { formSchema, isError, error, isLoading };
}

export default useFormFeedback;
