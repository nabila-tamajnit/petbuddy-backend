const SPECIES_CONFIG = {
    cat: {
        label: 'Chat',
        activities: ['play', 'outdoor', 'grooming', 'rest', 'exploration'],
        defaultReminderTypes: ['vaccine', 'deworming', 'vet', 'grooming'],
    },
    dog: {
        label: 'Chien',
        activities: ['walk', 'run', 'play', 'training', 'swimming', 'rest'],
        defaultReminderTypes: ['vaccine', 'deworming', 'vet', 'grooming'],
    },
    rabbit: {
        label: 'Lapin',
        activities: ['play', 'outdoor', 'exercise', 'rest'],
        defaultReminderTypes: ['vet', 'grooming', 'deworming'],
    },
    bird: {
        label: 'Oiseau',
        activities: ['play', 'training', 'flight', 'rest'],
        defaultReminderTypes: ['vet', 'grooming'],
    },
    hamster: {
        label: 'Hamster',
        activities: ['wheel', 'play', 'exploration', 'rest'],
        defaultReminderTypes: ['vet'],
    },
    other: {
        label: 'Autre',
        activities: ['play', 'rest', 'outdoor'],
        defaultReminderTypes: ['vet'],
    }
};

module.exports = SPECIES_CONFIG;