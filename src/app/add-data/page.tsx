import { job } from "../../../generated/prisma";
import getApiData, { addApiDataIntoDb } from "../utils/action";

export default async function Page() {
  const data = await getApiData();

  const newData = data.map((elem: job) => {
    return {
      title: elem.title,
      description: elem.description,
      location: elem.location,
      salary: 600000,
      employment_type: elem.employment_type,
      job_type: "remote",
    };
  });

  // const jobs = await addApiDataIntoDb(newData);
}
