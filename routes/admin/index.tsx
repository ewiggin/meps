import { CardItem } from "../../components/CardItem.tsx";

export default function AdminIndexPage() {
  const data = ["OLOT", "RURAL", "PUNJABI"];

  return (
    <>

      <div className="container mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((item) => (
            <CardItem
              link={`/admin/maps/${item}`}
              id={item}
              title={item}
              icon={true}
            />
          ))}
        </div>
      </div>
    </>
  );
}
