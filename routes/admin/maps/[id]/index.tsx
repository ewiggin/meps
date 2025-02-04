import { CardItem } from "../../../../components/CardItem.tsx";
import { Breadcrumb } from "../../../../components/Breadcrumb.tsx";
import { Handlers } from "$fresh/server.ts";
import territoriesData from '../../../../data/territories.json' with { type: "json" };

export const handler: Handlers<unknown> = {
   GET(_, ctx) {
    const id = ctx.params.id;
    return ctx.render({ territories: territoriesData[id], id });
  },
};

export default function AdminMapsDetailPage(props: any) {
  const { id, territories } = props.data;

  return (
    <>
      <Breadcrumb title={`Territorio: ${id}`} backLink={"/admin/maps"}>
      </Breadcrumb>
      <div className="container mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {territories && territories.length && territories.map((item: { num: string, description: string}) => (
            <CardItem
              link={`/admin/maps/${id}/${item.num}`}
              title={item.num}
              icon={" "}
            />
          ))}
        </div>
      </div>
    </>
  );
}
