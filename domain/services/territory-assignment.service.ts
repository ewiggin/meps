export interface ITerritoryAssignment {
    region: string;
    territoryId: string;
    link?: boolean;
    userId: string;
    date: Date;
    closeAt?: Date;
}

export class TerritoryAssignmentService {

    /**
     * Abre o asigna territorio a un usuario.
     * 
     * @param region Region Id
     * @param territoryId Territory Num
     * @param userId User Id
     * @param date Fecha de referencia
     */
    static async assign(
        region: string,
        territoryId: string,
        userId: string,
        link: boolean,
        date: string,
    ): Promise<void> {
        const db = await Deno.openKv();
        await db.set(['assignments', region, territoryId, date], {
            region,
            territoryId,
            link: Boolean(link),
            userId,
            date,
        });
        db.close();
    }

    /**
     * Devuelve todas las asignaciones de este territorio.
     *
     * @param region Region ID
     * @param territoryId
     * @returns ITerritoryAssignment[]
     */
    static async list(
        region: string,
        territoryId?: string,
    ): Promise<ITerritoryAssignment[]> {
        const db = await Deno.openKv();

        const key = ['assignments', region];
        if (territoryId) {
            key.push(territoryId);
        }

        const result = (await Array.fromAsync(
            db.list<ITerritoryAssignment>({
                prefix: key,
            }),
        )).map((item) => item.value);
        db.close();
        return result || [];
    }

    /**
     * Comprueba que el territorio este abierto.
     * 
     * @param region Region Id
     * @param territoryId Territory ID
     * @returns boolean
     */
    static async isOpen(region: string, territoryId: string): Promise<boolean> {
        const db = await Deno.openKv();
        const items: ITerritoryAssignment[] = await this.list(
            region,
            territoryId,
        );
        console.log('hola', items);
        const someOpen = items.some((item) => !item?.closeAt);
        db.close();
        return someOpen;
    }

    /**
     * Cierra el territorio abierto previamente.
     * 
     * @param region Region Id
     * @param territoryId Territory Num
     * @param date Fecha de referencia
     * @param closeAt Fecha de cierre
     */
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
