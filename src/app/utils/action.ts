import prismaClient from "@/services/prisma";

export default async function getApiData() {
  const url =
    "https://jsearch.p.rapidapi.com/search?query=developer%20jobs%20in%20chicago&page=1&num_pages=1&country=us&date_posted=all";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "169cd932b4msh63022686e5c91f2p14f61djsn8bef3cab7e5e",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
  }
}
export async function addApiDataIntoDb(data: any) {
  await prismaClient.openings.createMany({
    data,
  });
}
