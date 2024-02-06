
export const getImages = (size) => {
    const images = [
        '/docker.svg',
        '/bun.svg',
        '/github.svg',
        '/javascript.svg',
        '/vscode.svg',
        '/vitejs.svg',
        '/svelte.svg',
        '/supabase.svg',
        '/redis.svg',
    ]
    const newImages = images.slice(0, size);
    return newImages.flatMap(image =>[`1|${image}`,`2|${image}`]).sort(() => Math.random() -0.5 );
}