import { LoginForm } from "@/components/LoginForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { RegisterForm } from "./components/RegisterForm";

export default function Home() {
    return (
        <Tabs defaultValue="login" className="flex flex-col flex-1 max-w-screen-xl justify-center items-center w-[400px]">
            <TabsList className="space-x-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <LoginForm />
            </TabsContent>
            <TabsContent value="register">
                <RegisterForm />
            </TabsContent>
        </Tabs>
    );
}
