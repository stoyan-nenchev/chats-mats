"use client"

import { z } from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import SendMessageButton from "@/components/SendMessageButton";
import DeleteInputButton from "@/components/DeleteInputButton";

const formSchema = z.object({
    message: z.string().max(2000),
})

export function SendMessageForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 flex-row space-x-2">
                <div className="flex flex-1">
                    <FormField
                        control={form.control}
                        name="message"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Textarea
                                        placeholder="Say hi.."
                                        className="p-3 border border-gray-300 rounded-lg resize-none"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col">
                    <SendMessageButton/>
                    <DeleteInputButton/>
                </div>
            </form>
        </Form>
    )
}