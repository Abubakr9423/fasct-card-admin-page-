import { useTheme } from '@/components/theme-provider';
import { useBeras } from '@/store/store';
import {  useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MagicCard } from '@/components/ui/magic-card';
import { MorphingText } from '@/components/ui/morphing-text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GetToken } from '@/util/axios';
import { jwtDecode } from "jwt-decode";

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
    const { theme } = useTheme();

    const loginUser = useBeras((state: any) => state.loginUser);
    const loading = useBeras((state: any) => state.loading);
    const error = useBeras((state: any) => state.error);

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
                    navigate("/orders");
                } else {
                    console.error("Access denied: role not allowed", roles);
                }
            } else {
                console.error("No valid token after login");
            }
        },
    });

    return (
        <div>
            <Card className='m-auto flex items-center p-30'>
                <MagicCard
                    gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                    className="p-0 w-[350px] md:w-[1000px] h-[600px] md:h-[500px] flex flex-col justify-evenly"
                >
                    <CardHeader>
                        <CardTitle>
                            <MorphingText className='font-serif-[Inter]' texts={["Welcome", "Please Log in"]} />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <form onSubmit={handleSubmit} className='flex flex-col gap-5 items-center'>
                            <Input
                                name='email'
                                onChange={handleChange}
                                value={values.email}
                                className='md:w-[420px] mt-10 md:mt-0 border-gray-600'
                                type="text"
                                placeholder='rimel1111@gmail.com'
                            />
                            <Input
                                name='password'
                                onChange={handleChange}
                                value={values.password}
                                className='md:w-[420px] border-gray-600'
                                type="password"
                                placeholder='**********'
                            />
                            <div className='flex gap-5'>
                                <Button type="submit" disabled={loading}>Log in</Button>
                                {/* <Link to='/register'>
                                    <Button type="button">Registrate</Button>
                                </Link> */}
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                        </form>
                    </CardContent>
                    <CardFooter />
                </MagicCard>
            </Card>
        </div>
    );
};

export default Login;