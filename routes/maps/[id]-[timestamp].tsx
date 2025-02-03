import { PageProps } from "$fresh/server.ts";

export default function GetMap(props: PageProps) {
  const { timestamp } = props.params;

  // Fecha incorrecta
  if (String(timestamp).length !== 13) {
    return new Response(null, {
      status: 404,
      headers: { Location: "/" },
    });
  }

  return <div>Territorio OK</div>;
}
