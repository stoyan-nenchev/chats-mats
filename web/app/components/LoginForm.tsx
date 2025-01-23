"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    email: z.string().email("The input must be a valid email."),
    password: z.string()
        .min(8, "Password must contain a minimum of 8 characters.")
        .max(255, "Password cannot be longer than 255 characters.")
})

export function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-72 max-w-sm space-y-2">
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