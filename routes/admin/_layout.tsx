import { PageProps } from '$fresh/server.ts';

export default function AdminLayout({ Component, state }: PageProps) {
    return (
        <>
            <header className='border-b border-gray-200 bg-gray-50'>
                {
                    /* <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            Territorios
                        </h1>

                        <p className="mt-1.5 text-sm text-gray-500">Gestión sencilla de los enlaces de territorios</p>
                    </div>
                </div>
            </div>*/
                }
            </header>
            <div>
                <Component />
            </div>
        </>
    );
}
