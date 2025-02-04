import { Breadcrumb } from "../../../../../components/Breadcrumb.tsx";

export default function AdminMapsDetailFinalPage(props: any) {
  const { id, num } = props.params;

  const data = [
    {
      id: "",
      pub: "Jhon Doe",
      fromDate: Temporal.Now.plainDateTimeISO().toPlainDate(),
      toDate: Temporal.Now.plainDateTimeISO().add(
        Temporal.Duration.from({ days: 31 }),
      ).toPlainDate(),
    },
    {
      id: "",
      pub: "Mary Doe",
      fromDate: Temporal.Now.plainDateTimeISO().subtract({ days: 45 }).toPlainDate(),
      toDate: Temporal.Now.plainDateTimeISO().subtract({ days: 45 }).add(
          Temporal.Duration.from({ days: 20 }),
      ).toPlainDate(),
    },
  ];

  return (
    <>
      <Breadcrumb
        title={`Territorio: ${id} - ${num}`}
        backLink={`/admin/maps/${id}`}
      >
      </Breadcrumb>
      <div className="px-8 py-8 sm:w-full sm:py-0 sm:px-0 min-h-64">
        <div id="map" style="height: 500px;"></div>
        <script src="/map.js"></script>
      </div>
      <div className="container mx-auto max-w-screen-xl px-4 py-12 sm:px-6 sm:py-12 lg:px-8">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead class="text-left">
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Publicador
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Asignado el
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Fecha completado
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              </th>
            </tr>
            </thead>
            <form action={`/admin/maps/${id}/${num}`} method="post">
            <tbody className="divide-y divide-gray-200 bg-gray-200">
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  <select name="publicador" required={true}>
                    <option value="null" selected={true}>Selecciona un publicador</option>
                    <option value="Mario Martínez">Mario Martínez</option>
                    <option value="Marc Soler">Marc Soler</option>
                  </select>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <input type="date" name="fromDate" required={true}/>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <input type="date" name="toDate"/>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-right">
                  <button type="submit">
                    Guardar
                  </button>
                </td>
              </tr>
            </tbody>
            </form>

            <tbody className="divide-y divide-gray-200">
            {data.map((item) => (
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {item.pub}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.fromDate.toLocaleString("es-ES", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.toDate.toLocaleString("es-ES", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
);
}
