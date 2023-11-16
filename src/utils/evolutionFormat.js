export const extractPokemonNames = (data) => {
    const names = [];

    const traverse = (node) => {
        if (node.species && node.species.name) {
            names.push(node.species.name);
        }

        if (node.evolves_to && Array.isArray(node.evolves_to) && node.evolves_to.length > 0) {
            node.evolves_to.forEach((evolution) => {
                traverse(evolution);
            });
        }
    };
    traverse(data?.chain || {});

    return names;
};