export function Breadcrumb(
    { title, backLink, children }: {
        title: string | any;
        backLink?: string;
        children?: any;
    },
) {
    return (
        <div className='z-50 border-b border-t sticky top-0 bg-white shadow-sm'>
            <div className='container mx-auto max-w-screen-xl px-8 py-5'>
                <div>
                    {backLink &&
                        (
                            <a
                                href={backLink}
                                className='text-blue-700 hover:underline'
                                data-ancestor='true'
                                aria-current='true'
                            >
                                ← Volver
                            </a>
                        )}
                </div>
                <div className='flex flex-wrap flex-row items-start justify-between'>
                    <div className='font-bold text-2xl pb-2'>
                        {title}
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
