
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'todo 1',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'todo 2',
            status: 'in-progress',
            createdAt: Date.now(),
        },
        {
            description: 'todo 3',
            status: 'finished',
            createdAt: Date.now(),
        }
    ]
}
