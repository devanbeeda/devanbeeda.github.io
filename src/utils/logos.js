// Finds a logo in src/assets/skills by file name, e.g. logo('python')
const files = import.meta.glob('../assets/skills/*.svg', { eager: true, query: '?url', import: 'default' });
export const logo = (key) => files[`../assets/skills/${key}.svg`];
