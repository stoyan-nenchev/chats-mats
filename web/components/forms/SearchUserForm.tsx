"use client"

import { z } from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import SearchButton from "@/components/SearchButton";

const formSchema = z.object({
    query: z.string().max(50),
})

interface SearchUserFormProps {
    onResults: (users: { id: string; username: string; email: string }[]) => void;
}

export function SearchUserForm({ onResults }: SearchUserFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch(`/api/users?query=${values.query}`);
            if (response.ok) {
                const data = await response.json();
                onResults(data);
            } else {
                console.error("Failed to search users");
                onResults([]);
            }
        } catch (error) {
            console.error("Error searching users:", error);
            onResults([]);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={(event) => {
                event.preventDefault()
                void form.handleSubmit(onSubmit)(event)}} className="flex flex-1 flex-row space-x-2">
                <div className="flex flex-1 flex-row">
                    <FormField
                        control={form.control}
                        name="query"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Enter username or email"{...field}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <SearchButton />
                </div>
            </form>
        </Form>
    )
}