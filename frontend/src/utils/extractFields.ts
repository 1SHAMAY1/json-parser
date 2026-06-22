export function extractFields(
    data: any,
    fields = new Set<string>(),
) {
    if (
        data === null ||
        data === undefined
    ) {
        return fields
    }

    if (Array.isArray(data)) {

        for (const item of data) {
            extractFields(
                item,
                fields,
            )
        }

        return fields
    }

    if (
        typeof data === "object"
    ) {

        for (
            const [key, value]
            of Object.entries(data)
        ) {

            if (
                typeof value !== "object"
            ) {
                fields.add(key)
            }

            extractFields(
                value,
                fields,
            )
        }
    }

    return fields
}