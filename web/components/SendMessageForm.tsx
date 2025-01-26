"use client"

import { z } from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import SendMessageButton from "@/components/SendMessageButton";
import DeleteInputButton from "@/components/DeleteInputButton";

interface Props {
    senderId: string;
    receiverId: string | null;
    channelId: string | null;
}

const formSchema = z.object({
    message: z.string().max(2000),
})

export function SendMessageForm({ senderId, receiverId, channelId }: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const messageRequest = {
            content: values.message,
            senderId: senderId,
            receiverId: receiverId || null,
            channelId: channelId || null,
        };

        fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(messageRequest),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to send message");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Message sent successfully:", data);
                form.reset();
            })
            .catch((error) => {
                console.error("Error sending message:", error);
            });
    }

    return (
        <Form {...form}>
            <form onSubmit={(event) => {
                event.preventDefault()
                void form.handleSubmit(onSubmit)(event)}} className="flex flex-1 flex-row space-x-2">
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