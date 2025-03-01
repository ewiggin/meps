
export class StringUtils {

    static includes(ref: string, search: string): boolean {
        return ref
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(
                search
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
            );
    }
}