import { Handlers, RouteConfig } from '$fresh/server.ts';
import { setCookie } from '$std/http/cookie.ts';
import { asset } from '$fresh/runtime.ts';

export const config: RouteConfig = {
    skipInheritedLayouts: true, // Skip already inherited layouts
};

export const handler: Handlers = {
    async POST(req, ctx): Promise<Response> {
        const formData = await req.formData();

        const email = formData.get('email') as string;
        const pass = formData.get('password') as string;

        // Get admin user info from environment
        const admin = Deno.env.get('LOGIN') || null;
        const adminPass = Deno.env.get('LOGIN_PASS') || null;

        // compara passwords
        const isValid = pass &&
            email &&
            admin &&
            pass === adminPass &&
            admin === email;
        if (!isValid) {
            // invalid
            return new Response('', {
                status: 303,
                headers: { Location: `/admin/login` },
            });
        }

        const url = new URL(req.url);
        const headers = new Headers();
        setCookie(headers, {
            name: 'auth',
            value: String(email), // this should be a unique value for each session
            maxAge: 6 * 3600, // N * horas
            sameSite: 'Lax', // this is important to prevent CSRF attacks
            domain: url.hostname,
            path: '/',
            secure: true,
        });

        headers.set('location', '/admin');

        return new Response('', {
            status: 303,
            headers,
        });
    },
};

export default function AdminLoginPage() {
    return (
        <>
            <section className='relative flex flex-wrap lg:h-screen lg:items-center'>
                <div className='w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24'>
                    <div className='mx-auto max-w-lg text-center'>
                        <h1 className='text-2xl font-bold sm:text-3xl'>
                            MEPS - Gestión de mapas
                        </h1>

                        <p className='mt-4 text-gray-500'>
                            Para poder acceder a esta sección es necesario que
                            te identifiques como administrador
                        </p>
                    </div>

                    <form
                        action=''
                        method='post'
                        className='mx-auto mb-0 mt-8 max-w-md space-y-4'
                    >
                        <div>
                            <label form='email' className='sr-only'>
                                Email
                            </label>

                            <div className='relative'>
                                <input
                                    type='email'
                                    name='email'
                                    required
                                    className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                                    placeholder='Entra el correo electrónico'
                                />
                            </div>
                        </div>

                        <div>
                            <label form='password' className='sr-only'>
                                Password
                            </label>

                            <div className='relative'>
                                <input
                                    type='password'
                                    name='password'
                                    required
                                    className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                                    placeholder='Entra la contraseña'
                                />
                            </div>
                        </div>

                        <div className='flex items-center justify-between'>
                            <button
                                type='submit'
                                className='inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white'
                            >
                                Entrar
                            </button>
                        </div>
                    </form>
                </div>

                <div className='hidden sm:block relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2'>
                    <img
                        alt='Welcome'
                        src={asset('/login-background.avif')}
                        className='absolute inset-0 h-full w-full object-cover'
                    />
                </div>
            </section>
        </>
    );
}
