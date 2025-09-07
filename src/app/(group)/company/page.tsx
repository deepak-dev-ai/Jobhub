import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import prismaClient from "@/services/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function CompaniesPage() {
  const companies = await prismaClient.company.findMany({
    include: {
      owner: true,
    },
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {companies.map((comp) => (
        <Card
          key={comp.id}
          className="flex flex-col items-center p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <Link href={`/company/${comp.id}`}>
            <Image
              src={comp?.image_url ?? "/fallback.png"}
              alt={comp.name}
              className="rounded-full mb-4 transition-all duration-200 ease-in-out hover:scale-[1.05]"
              height={80}
              width={80}
              style={{ objectFit: "cover" }}
            />
          </Link>
          <h2 className="text-xl font-bold mb-2 text-center">{comp.name}</h2>
          <p className="mb-2 text-center">{comp.description}</p>
          <Badge>{comp.owner.email}</Badge>
        </Card>
      ))}
    </div>
  );
}
