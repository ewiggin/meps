import { Handlers } from "https://deno.land/x/fresh@1.7.2/src/server/types.ts";
import { Breadcrumb } from "../../../../components/Breadcrumb.tsx";

export const handler: Handlers<unknown> = {
  GET(_, ctx) {
    const { id, num } = ctx.params;
    return ctx.render({ id, num });
  },
};

export default function AdminMapsDetailFinalPage(props: any) {
  const { id, num } = props.data;

  return (
    <>
      <Breadcrumb title={`${id.toUpperCase()} - ${num}`}></Breadcrumb>
      <div>
        <div id="map" style="width: 100vw; height: calc(100vh - 85px);"></div>
        <input
          type="hidden"
          name="mapURL"
          id="mapURL"
          value={`/maps/${id.toLocaleLowerCase()}/${num}.kml`}
        />
        <script src="/map.js"></script>
      </div>
    </>
  );
}
