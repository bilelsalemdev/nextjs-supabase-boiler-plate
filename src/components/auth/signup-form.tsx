"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { signupSchema } from "@/schemas/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClientComponentClient();

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
      validationSchema={toFormikValidationSchema(signupSchema)}
      onSubmit={async (values) => {
        setIsLoading(true);
        try {
          const { error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
            options: {
              data: {
                name: values.name,
              },
            },
          });

          if (error) throw error;

          toast({
            title: "Account created successfully",
            description: "Please check your email to verify your account.",
          });
          
          router.push("/login");
        } catch (error) {
          toast({
            title: "Error",
            description: "There was a problem creating your account.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }}
    >
      {({ errors, touched, getFieldProps }) => (
        <Form className="space-y-4">
          <div>
            <Input
              {...getFieldProps("name")}
              placeholder="Full name"
              disabled={isLoading}
            />
            {errors.name && touched.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div>
            <Input
              {...getFieldProps("email")}
              type="email"
              placeholder="name@example.com"
              disabled={isLoading}
            />
            {errors.email && touched.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <Input
              {...getFieldProps("password")}
              type="password"
              placeholder="Create a password"
              disabled={isLoading}
            />
            {errors.password && touched.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          <div>
            <Input
              {...getFieldProps("confirmPassword")}
              type="password"
              placeholder="Confirm your password"
              disabled={isLoading}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </Form>
      )}
    </Formik>
  );
} 