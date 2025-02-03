import { Breadcrumb } from "../../../../../components/Breadcrumb.tsx";

export default function AdminMapsDetailFinalPage(props: any) {
  const id = Number(props.params.id);
  const num = Number(props.params.num);

  // Detalle del territorio
  // Mapa del territorio
  // Registros del territorio

  return (
    <>
      <Breadcrumb title={`Territorio: ${id} - ${num}`} backLink={`/admin/${id}`}></Breadcrumb>
      <div>
        <div className="w-full min-h-64 hidden md:block">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1zONEhOhwP7A1lUEiJqYc3FkB8hzymkE&ll=42.18320406143437%2C2.4822327500000263&z=18"
            frameborder="0"
            width="100%"
            height="500"
          >
          </iframe>
        </div>
      </div>
    </>
  );
}
