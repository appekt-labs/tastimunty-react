import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// Define types for the JSON schema fields
type FieldType =
  | "password"
  | "text"
  | "radio"
  | "checkbox"
  | "submit"
  | "reset"
  | "button"
  | "color"
  | "date"
  | "datetime"
  | "datetimelocal"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "number"
  | "range"
  | "search"
  | "tel"
  | "time"
  | "url"
  | "month"
  | "week";

export interface FormField {
  name: string;
  type: FieldType;
  label: string;
  required: boolean;
}

export interface FormSchema {
  fields: FormField[];
  title: string;
  description: string;
}

// Function to dynamically create validation schema based on JSON schema
const createValidationSchema = (schema: FormSchema) => {
  const shape: { [key: string]: Yup.StringSchema } = {};

  schema.fields.forEach((field) => {
    if (field.required) {
      if (field.type === "email") {
        shape[field.name] = Yup.string()
          .email(`${field.label} is invalid`)
          .required(`${field.label} is required`);
      } else {
        shape[field.name] = Yup.string().required(`${field.label} is required`);
      }
    } else {
      shape[field.name] = Yup.string();
    }
  });

  return Yup.object().shape(shape);
};

const DynamicForm: React.FC<{
  error: unknown;
  formSchema: FormSchema | undefined;
  isLoading: boolean;
  isError: boolean;
}> = ({ error, isError, isLoading, formSchema }) => {
  if (error || isError) {
    console.log(error);
    throw new Error("Error fetching form schema");
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!formSchema) {
    return <div>The form is missing, contact admin</div>;
  }

  // Initialize validation schema
  const validationSchema = createValidationSchema(formSchema);

  // Initial values for the form fields
  const initialValues: { [key: string]: string } = formSchema.fields.reduce(
    (acc, field) => {
      acc[field.name] = "";
      return acc;
    },
    {}
  );

  // Render the form
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        try {
          //submit the form
          console.log("Form Submitted", values);

          //inform the user that the form has been submitted

          // clear the form after submission
          resetForm();
        } catch (error) {
          console.log("error", error);
        }
      }}
    >
      {({ handleSubmit, handleChange, handleBlur }) => (
        <Form className="grid gap-3" onSubmit={handleSubmit}>
          {formSchema.fields.map((field) => (
            <div
              key={field.name}
              className="flex flex-col items-start gap-2"
              style={{ marginBottom: "1rem" }}
            >
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                type={field.type}
                name={field.name}
                id={field.name}
                placeholder={field.label}
                onBlur={handleBlur}
                onChange={handleChange}
                // as={<Input />}
              />
              <ErrorMessage
                name={field.name}
                component="div"
                className="text-sm text-red-400"
              />
            </div>
          ))}
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
