import { CardItem } from '../../../components/CardItem.tsx';
import { Breadcrumb } from '../../../components/Breadcrumb.tsx';

export default function AdminMapsPage() {
    const data = ["OLOT", "RURAL", "PUNJABI"];

    return <>
        <Breadcrumb title={`Territorios`} backLink={"/admin"}></Breadcrumb>
        <div className="container mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.map((item) => (
                    <CardItem
                        link={`/admin/maps/${item}`}
                        id={item}
                        title={item}
                    />
                ))}
            </div>
        </div>
    </>
}