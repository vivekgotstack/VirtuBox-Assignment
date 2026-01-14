export async function getRandomStudent() {
    const res = await fetch("https://randomuser.me/api/")
    if (!res.ok) throw new Error("Failed to fetch random student")

    const data = await res.json()
    const user = data.results[0]

    return {
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        age: user.dob.age,
    }
}

// EXTERNAL API(To fetch random users) -> https://randomuser.me/api/