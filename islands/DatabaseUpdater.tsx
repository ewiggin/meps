import { useRef } from 'preact/hooks';
/**
 * Actualiza la base de datos local con el archivo .meps correspondiente.
 *
 * @returns JSX code
 */
export default function DatabaseUpdater() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const hasDB =
        (JSON.parse(localStorage.getItem('pubs') as string) || []).length > 0;

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            // Database update!!
            processCSV(target.files[0]);
        }
    };

    const processCSV = (file: File) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const text = e.target?.result as string;
            const rows: any[] = text.split('\n').map((row) =>
                row.replaceAll('\n', '').replaceAll('\r', '').split(';')
            ); // Divide en filas y columnas
            const header: any[] = rows.shift();
            const result: any[] = [];
            rows.forEach((row) => {
                const obj = {} as any;
                row.forEach(() => {
                    header.forEach((h, index) => {
                        obj[h] = row[index];
                    });
                });
                result.push({ ...obj });
            });

            localStorage.setItem('pubs', JSON.stringify(result));
            window.location.reload();
        };

        reader.readAsText(file);
    };
    return (
        <>
            <input
                type='file'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <button
                type='button'
                onClick={handleButtonClick}
                className={`p-2 ${
                    hasDB ? 'text-green-700' : 'text-red-700'
                } text-white rounded`}
            >
                {!hasDB && (
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        class='text-red-500 icon icon-tabler icons-tabler-outline icon-tabler-database-off'
                    >
                        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                        <path d='M12.983 8.978c3.955 -.182 7.017 -1.446 7.017 -2.978c0 -1.657 -3.582 -3 -8 -3c-1.661 0 -3.204 .19 -4.483 .515m-2.783 1.228c-.471 .382 -.734 .808 -.734 1.257c0 1.22 1.944 2.271 4.734 2.74' />
                        <path d='M4 6v6c0 1.657 3.582 3 8 3c.986 0 1.93 -.067 2.802 -.19m3.187 -.82c1.251 -.53 2.011 -1.228 2.011 -1.99v-6' />
                        <path d='M4 12v6c0 1.657 3.582 3 8 3c3.217 0 5.991 -.712 7.261 -1.74m.739 -3.26v-4' />
                        <path d='M3 3l18 18' />
                    </svg>
                )}
                {hasDB && (
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        class='text-green-700 icon icon-tabler icons-tabler-outline icon-tabler-database-smile'
                    >
                        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                        <path d='M10 14h.01' />
                        <path d='M14 14h.01' />
                        <path d='M10 17a3.5 3.5 0 0 0 4 0' />
                        <path d='M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3' />
                        <path d='M4 6v12c0 1.657 3.582 3 8 3s8 -1.343 8 -3v-12' />
                    </svg>
                )}
            </button>
        </>
    );
}
