import { CardItem } from '@app/components/CardItem.tsx';
import { Breadcrumb } from '@app/components/Breadcrumb.tsx';
import { Handlers } from '$fresh/server.ts';
import territoriesData from '@app/data/territories.json' with { type: 'json' };
import { ITerritory } from '@app/domain/model/territory.ts';
import { TerritoryAssignmentService } from '@app/domain/services/territory-assignment.service.ts';

interface ITerritoryWithAssign extends ITerritory {
    assigned?: boolean;
    toClaim?: boolean;
}

interface IAdminMapsDetailArgs {
    data: {
        id: string;
        territories: ITerritoryWithAssign[];
    }
}

export const handler: Handlers<unknown> = {
    async GET(_, ctx) {
        const regionId = ctx.params.id;
        // Assignments
        const assignments = await TerritoryAssignmentService.list(regionId);
        const territories = (territoriesData as Record<string, ITerritory[]>)[regionId] as ITerritoryWithAssign[];

        assignments
            .filter((assign) => assign.date && !assign.closeAt)
            .forEach((assign) => {
                const territory2Assign = territories.find((item) => item.num === assign.territoryId);
                if (!territory2Assign) {
                    return;
                }

                territory2Assign.assigned = true;

                const currentDate = new Date(assign.date);
                const targetDate = new Date();

                // Add 4 months to the current date
                currentDate.setMonth(currentDate.getMonth() + 4);

                // Compare the dates
                territory2Assign.toClaim = targetDate >= currentDate;
        });

        return ctx.render({
            territories,
            id: regionId,
        });
    },
};

export default function AdminMapsDetailPage(props: IAdminMapsDetailArgs) {
    const { id, territories } = props.data;

    return (
        <>
            <Breadcrumb title={`Territorio: ${id}`} backLink={'/admin/maps'}></Breadcrumb>
            <div className='container mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {territories && territories.length &&
                        territories.map(( item: ITerritoryWithAssign) => (
                            <CardItem
                                link={`/admin/maps/${id}/${item.num}`}
                                title={item.num}
                                icon={' '}
                                colorClass={item.toClaim ? 'bg-red-200' : item.assigned ? 'bg-slate-200' : ''}
                            />
                        ))}
                </div>
            </div>
        </>
    );
}
