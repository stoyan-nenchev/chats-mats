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

export function SearchUserForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
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