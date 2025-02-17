export interface ITerritoryAssignment {
      region: string;
      territoryId: string;
      userId: string;
      date: Date;
      closeAt?: Date;
}

export interface IKVTerritoryAssignment {
    key: string[];
    value: ITerritoryAssignment;
}


export class TerritoryAssignmentService {

    static async assign(region: string, territoryId: string, userId: string, date: string): Promise<void> {
        const db = await Deno.openKv();
        await db.set(['assignments', region, territoryId, date], { region, territoryId, userId, date });
        await db.close();
    }

    static async list(region: string, territoryId: string): Promise<IKVTerritoryAssignment[]> {
        const db = await Deno.openKv();
        const result: IKVTerritoryAssignment[] = await Array.fromAsync((await db).list({ prefix: ["assignments", region, territoryId] }));
        await db.close();
        return result || [];
    }

    static async isOpen(region: string, territoryId: string): Promise<boolean> {
        const db = await Deno.openKv();
        const items: IKVTerritoryAssignment[] = await this.list(region, territoryId);
        const someOpen = items.some((item) => !item.value?.closeAt);
        await db.close(); 
        return someOpen;
    }

    static async close(region: string, territoryId: string, date: string, closeAt: string): Promise<void> {
        const db = await Deno.openKv();
        const item: ITerritoryAssignment = ((await (await db).get(['assignments', region, territoryId, date])).value);
        item.closeAt = new Date(closeAt);
        await db.set(['assignments', region, territoryId, date], item);
        await db.close();
    }
}