"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, addToast} from "@heroui/react";
import axios from 'axios'

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted", { username, password });
        try {
            const response = await axios.post("/api/auth/login", {
                username,
                password,
            })
            console.log(response)
            if (response.status == 200) {
                console.log('Login successful', response.data);
                addToast({
                    title: "Toast title",
                    description: "Toast displayed successfully",
                    color: "secondary",
                })
            }else if (response.status == 401) {
                console.log(response)
                addToast({
                    title: "Toast title",
                    description: "Toast displayed successfully",
                    color: "secondary",
                })
            }
        else if (response.status == 400) {
            console.log(response)
                addToast({
                    title: "Toast title",
                    description: "Toast displayed successfully",
                    color: "secondary",
                })
        }
        } catch (error) {
            console.log(error)
        } 
    };

    return (
        <div className='flex flex-row min-h-screen'>
            <section className="relative w-full py-16 md:py-24 bg-gradient-to-r from-pink-500 to-rose-700">
                <div className="container mx-auto px-4 flex flex-col items-center justify-center">
            <h1 className='text-xl md:text-2xl font-bold text-white mb-12'>¡Bienvenida Lis Samarah!, Inicia Sesión</h1>
                    <Form className="w-full max-w-xs bg-white border border-black rounded gap-8 p-8" onSubmit={handleSubmit}>
                        <Input
                            isRequired
                            variant='flat'
                            errorMessage="Please enter a valid username"
                            labelPlacement="outside"
                            name="username"
                            placeholder="Enter your username"
                            type="username"
                            onChange={(e) => setUsername(e.target.value)}
                            className='text-black border border-black rounded'
                        />
                        <Input
                            isRequired
                            variant='bordered'
                            errorMessage="Please enter a valid password"
                            labelPlacement="outside"
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className='text-black border border-black rounded'
                        />
                        <Button type="submit" variant="bordered" className="w-full mt-4 border-2 rounded border-pink-500 bg-white text-black hover:bg-rose-500">
                            Inicia Sesión
                        </Button>
                    </Form>
            </div>
            </section>
        </div>
    );
}