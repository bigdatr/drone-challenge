export const launchDrones = async (instructions, count) => {
    const results = await fetch('http://localhost:4001/drones/launch', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                instructions, count
            })
    });

    return results.json();
}