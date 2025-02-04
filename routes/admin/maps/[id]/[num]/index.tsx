import { Breadcrumb } from "../../../../../components/Breadcrumb.tsx";
import publishers from '../../../../../data/publishers.json' with { type: 'json'};
import { CryptoUtils } from '../../../../../domain/crypto.utils.ts';
import { Handlers } from 'https://deno.land/x/fresh@1.7.2/src/server/types.ts';

export const handler: Handlers<unknown> = {
  async GET(_, ctx) {
    const { id, num } = ctx.params;
    return ctx.render({
      publishers: await CryptoUtils.decrypt(publishers, Deno.env.get('KEY_BASE_64')!),
      id,
      num
    });
  },
  async POST(req: Request, ctx) {
    const { id, num } = ctx.params;
    const formData = await req.formData();
    // Redirect when save!
    return ctx.render({ publishers: await CryptoUtils.decrypt(publishers, Deno.env.get('KEY_BASE_64')!), id, num });
  },
};

export default function AdminMapsDetailFinalPage(props: any) {
  const { id, num, publishers } = props.data;

  const territory_pubs: any[] = [];

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
        <div class="overflow-x-auto pb-8">
          <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead class="text-left">
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                Publicador
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                Asignado el
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
                Fecha completado
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-bold text-gray-900">
              </th>
            </tr>
            </thead>
            <form action={`/admin/maps/${id}/${num}`} method="post">
            <tbody className="divide-y divide-gray-200 bg-gray-200">
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  <select className="px-2 py-2 rounded" name="publisher" required={true}>
                    <option value="null" selected={true}>Selecciona un publicador</option>
                    {
                      publishers.map(({id, name, lastName}: any) => (
                          <option value={id}>{name} {lastName}</option>
                      ))
                    }
                  </select>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <input className="px-2 py-2 rounded"  type="date" name="fromDate" required={true}/>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <input className="px-2 py-2 rounded"  type="date" name="toDate"/>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-right">
                  <button type="submit">
                    Registrar
                  </button>
                </td>
              </tr>
            </tbody>
            </form>

            <tbody className="divide-y divide-gray-200">
            {territory_pubs.map((item) => (
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
