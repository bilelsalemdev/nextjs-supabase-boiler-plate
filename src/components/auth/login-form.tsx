"use client";

import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { loginSchema } from "@/schemas/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClientComponentClient();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={toFormikValidationSchema(loginSchema)}
      onSubmit={async (values) => {
        setIsLoading(true);
        try {
          const { error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
          });

          if (error) throw error;

          toast({
            title: "Success",
            description: "You have successfully logged in.",
          });
          
          router.refresh(); // Refresh the current route
          router.push("/dashboard");
        } catch (error) {
          toast({
            title: "Error",
            description: "Invalid credentials. Please try again.",
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
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {errors.password && touched.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </Form>
      )}
    </Formik>
  );
} 