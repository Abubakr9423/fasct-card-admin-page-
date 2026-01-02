import { useBeras } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { GetToken } from '@/util/axios';
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import Img from '../assets/Group 1116606595.png';

const Login = () => {
    const token = GetToken();

    let roles: string[] = [];
    if (typeof token === "string" && token.trim() !== "") {
        const decoded: any = jwtDecode(token);
        const rawRoles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        roles = Array.isArray(rawRoles) ? rawRoles : rawRoles ? [rawRoles] : [];
        console.log("Decoded roles:", roles);
    } else {
        console.warn("No valid token found");
    }

    const navigate = useNavigate();
    const loginUser = useBeras((state: any) => state.loginUser);
    const loading = useBeras((state: any) => state.loading);
    const error = useBeras((state: any) => state.error);

    const [accessError, setAccessError] = useState("");


    const { handleSubmit, handleChange, resetForm, values } = useFormik({
        initialValues: { email: "", password: "" },
        onSubmit: async (values) => {
            await loginUser({ userName: values.email, password: values.password });

            const token = GetToken();
            if (typeof token === "string" && token.trim() !== "") {
                const decoded: any = jwtDecode(token);
                const rawRoles =
                    decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                const roles = Array.isArray(rawRoles)
                    ? rawRoles
                    : rawRoles
                        ? [rawRoles]
                        : [];

                const hasAccess = roles.includes("SuperAdmin") || roles.includes("Admin");

                if (hasAccess) {
                    resetForm();
                    setAccessError("");
                    navigate("/dashboard");
                } else {
                    setAccessError("You don’t have access to this page");
                }
            } else {
                setAccessError("Password or name is incorrect");
            }
        },
    });

    return (
        <main className="flex justify-between text-white h-screen">
            {/* Left side */}
            <aside className="bg-[#1D2739] w-[50%] flex items-center justify-start p-10">
                <div>
                    <p className="text-[18px]">Welcome to admin panel</p>
                    <img className="w-80" src={Img} alt="Admin illustration" />
                </div>
            </aside>

            {/* Right side */}
            <aside className="flex items-center justify-center w-[50%] text-black p-10">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col w-80 gap-2.5"
                >
                    <h1 className="font-bold text-2xl">Log in</h1>
                    <Input
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        className="rounded-[3px]"
                        placeholder="Username"
                        type="text"
                    />
                    <Input
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        className="rounded-[3px]"
                        placeholder="Password"
                        type="password"
                    />
                    <Label className="text-center m-auto text-blue-700 cursor-pointer">
                        Forgot password?
                    </Label>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="bg-[#2563EB] hover:bg-blue-700 transition-all rounded-[4px] py-2.5 px-5 text-white font-semibold cursor-pointer w-full"
                    >
                        Log in
                    </Button>

                    {/* Error messages */}
                    {error && <p className="text-red-500">{error}</p>}
                    {accessError && <p className="text-red-500">{accessError}</p>}
                </form>
            </aside>
        </main>
    );
};

export default Login;