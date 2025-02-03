import { CardItem } from "../../../../components/CardItem.tsx";
import { Breadcrumb } from "../../../../components/Breadcrumb.tsx";

export default function AdminMapsDetailPage(props: any) {
  const id = props.params.id;
  const data: { id: string }[] = Array(100).fill(0);

  return (
    <>
      <Breadcrumb title={`Territorio: ${id}`} backLink={"/admin"}></Breadcrumb>
      <div className="container mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((_, index) => (
            <CardItem
              link={`/admin/maps/${id}/${index + 1}`}
              id={String(index + 1)}
              title={String(index + 1)}
              icon={false}
            />
          ))}
        </div>
      </div>
    </>
  );
}
