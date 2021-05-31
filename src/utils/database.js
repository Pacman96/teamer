export const cities = {
    list: [
        { id: 1, label: 'Casablanca' },
        { id: 2, label: 'El Jadida' },
        { id: 3, label: 'Fes' },
        { id: 4, label: 'Tangier' },
        { id: 5, label: 'Tetouan' },
        { id: 6, label: 'Yousoufia' },
    ],
    getLabel: (id) => cities.list.filter(i => i.id === id)[0] || null
}
