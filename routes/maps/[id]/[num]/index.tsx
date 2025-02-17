import { Handlers } from '$fresh/src/server/types.ts';
import { Breadcrumb } from '@app/components/Breadcrumb.tsx';
import { TerritoryAssignmentService } from '@app/domain/services/territory-assignment.service.ts';

export const handler: Handlers<unknown> = {
    async GET(_, ctx) {
        const { id, num } = ctx.params;

        const isOpen = await TerritoryAssignmentService.isOpen(id, num);

        return isOpen ? ctx.render({ id, num }) : ctx.renderNotFound();
    },
};

export default function AdminMapsDetailFinalPage(
    props: { data: { id: string; num: number } },
) {
    const { id, num } = props.data;

    return (
        <>
            <Breadcrumb title={`${id.toUpperCase()} - ${num}`}></Breadcrumb>
            <div>
                <div id='map' style='width: 100vw; height: calc(100vh - 85px);'>
                </div>
                <input
                    type='hidden'
                    name='mapURL'
                    id='mapURL'
                    value={`/maps/${id.toLocaleLowerCase()}/${num}.kml`}
                />
                <script src='/map.js'></script>
            </div>
        </>
    );
}
