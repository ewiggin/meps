import { Breadcrumb } from "../../../../../components/Breadcrumb.tsx";

export default function AdminMapsDetailFinalPage(props: any) {
  const { id, num } = props.params;

  return (
    <>
      <Breadcrumb
        title={`Territorio: ${id} - ${num}`}
        backLink={`/admin/maps/${id}`}
      >
      </Breadcrumb>
      <div>
        <div className="w-full min-h-64">
            <div id="map" style="height: 500px;"></div>
            <script src="/map.js"></script>
        </div>
      </div>
    </>
  );
}
