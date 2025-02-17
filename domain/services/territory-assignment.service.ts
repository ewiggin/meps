export interface ITerritoryAssignment {
    region: string;
    territoryId: string;
    link?: boolean;
    userId: string;
    date: Date;
    closeAt?: Date;
}

export class TerritoryAssignmentService {
    static async assign(
        region: string,
        territoryId: string,
        userId: string,
        date: string,
    ): Promise<void> {
        const db = await Deno.openKv();
        await db.set(['assignments', region, territoryId, date], {
            region,
            territoryId,
            userId,
            date,
        });
        db.close();
    }

    /**
     * Devuelve todas las asignaciones de este territorio.
     *
     * @param region Region ID
     * @param territoryId Territory Num.
     * @returns ITerritoryAssignment[]
     */
    static async list(
        region: string,
        territoryId: string,
    ): Promise<ITerritoryAssignment[]> {
        const db = await Deno.openKv();
        const result = (await Array.fromAsync(
            db.list<ITerritoryAssignment>({
                prefix: ['assignments', region, territoryId],
            }),
        )).map((item) => item.value);
        db.close();
        return result || [];
    }

    static async isOpen(region: string, territoryId: string): Promise<boolean> {
        const db = await Deno.openKv();
        const items: ITerritoryAssignment[] = await this.list(
            region,
            territoryId,
        );
        const someOpen = items.some((item) => !item?.closeAt);
        db.close();
        return someOpen;
    }

    static async close(
        region: string,
        territoryId: string,
        date: string,
        closeAt: string,
    ): Promise<void> {
        const db = await Deno.openKv();
        const item: ITerritoryAssignment | null =
            (await db.get<ITerritoryAssignment>([
                'assignments',
                region,
                territoryId,
                date,
            ])).value;
        if (item) {
            item.closeAt = new Date(closeAt);
            await db.set(['assignments', region, territoryId, date], item);
        }
        db.close();
    }
}
