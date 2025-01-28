import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().max(60),
    description: z.string().max(255),
})

export function CreateChannelForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch("/api/channels", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(data.error || "Failed to create channel");
                return;
            }

            console.log("Channel created:", data);
            form.reset();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={(event) => {
                event.preventDefault()
                void form.handleSubmit(onSubmit)(event)
            }} className="flex flex-1 flex-col space-x-2">
                <div className="flex flex-1 flex-col space-y-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Channel name.."{...field}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Textarea
                                        placeholder="Channel description.."
                                        className="p-3 border border-gray-300 rounded-lg resize-none"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div>
                        <Button type="submit">Create</Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}