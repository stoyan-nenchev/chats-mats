"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z.string().email("The input must be a valid email."),
    password: z.string()
        .min(6, "Password must contain a minimum of 6 characters.")
        .max(255, "Password cannot be longer than 255 characters.")
})

export function LoginForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            console.log("login response", response)

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error during login:', errorData.error || 'Login failed');
                return;
            }

            router.push("/chats")
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    return (
        <Form {...form}>
          <form onSubmit={(event) => {
              event.preventDefault()
              void form.handleSubmit(onSubmit)(event)}} className="min-w-72 max-w-sm space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="Your email..." {...field} />
                    </FormControl>
                    <FormDescription>
                        This will be your primary way of logging in.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input placeholder="At least 8 characters..." {...field} />
                    </FormControl>
                    <FormDescription>
                        We will never share your password.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Log in</Button>
          </form>
        </Form>
    )
}