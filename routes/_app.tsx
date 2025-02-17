import { type PageProps } from '$fresh/server.ts';
export default function App({ Component }: PageProps) {
    return (
        <html>
            <head>
                <meta charset='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0'
                />
                <link
                    rel='icon'
                    type='image/png'
                    href='/favicon-96x96.png'
                    sizes='96x96'
                />
                <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
                <link rel='shortcut icon' href='/favicon.ico' />
                <link
                    rel='apple-touch-icon'
                    sizes='180x180'
                    href='/apple-touch-icon.png'
                />
                <meta name='apple-mobile-web-app-title' content='Meps' />
                <link rel='manifest' href='/site.webmanifest' />
                <title>meps</title>
                <link rel='stylesheet' href='/styles.css' />
                <link
                    rel='stylesheet'
                    href='https://unpkg.com/leaflet/dist/leaflet.css'
                />
                <script src='https://unpkg.com/leaflet/dist/leaflet.js'>
                </script>
                <script src='https://unpkg.com/leaflet-omnivore/leaflet-omnivore.min.js'>
                </script>
            </head>
            <body>
                <Component />
            </body>
        </html>
    );
}
