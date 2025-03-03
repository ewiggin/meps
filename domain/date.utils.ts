export class DateUtils {
    private static TIME_ZONE = 'Europe/Madrid';

    static toTemporalDateTime(date: Date): Temporal.ZonedDateTime {
        return Temporal.ZonedDateTime.from({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour: 0,
            minute: 0,
            second: 0,
            timeZone: DateUtils.TIME_ZONE,
        });
    }

    static isEquals(ref: Date, date: Date): boolean {
        const d1 = this.toTemporalDateTime(ref);
        const d2 = this.toTemporalDateTime(date);
        return d1.epochMilliseconds == d2.epochMilliseconds;
    }

    static isAfter(ref: Date, date: Date): boolean {
        const d1 = this.toTemporalDateTime(ref);
        const d2 = this.toTemporalDateTime(date);

        return d1.epochMilliseconds > d2.epochMilliseconds;
    }

    static isBefore(ref: Date, date: Date): boolean {
        const d1 = this.toTemporalDateTime(ref);
        const d2 = this.toTemporalDateTime(date);
        return d1.epochMilliseconds < d2.epochMilliseconds;
    }
}
