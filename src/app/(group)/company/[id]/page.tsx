import DeleteCompanyButton from "@/components/company/delete-company";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import JobListingAndReviewConatiner from "@/components/company/review/job-listing-review-container";
import Image from "next/image";

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`/api/company/${id}`);
  const data = await res.json();
  const company = data.data;

  const res2 = await fetch(`/api/review/${id}`);
  const data2 = await res2.json();
  const review = data2.data;
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card className="p-8 shadow-xl  flex flex-col items-center">
        <div className="flex justify-end w-full">
          <DeleteCompanyButton id={id} />
        </div>
        <div className="flex flex-col items-center w-full">
          <Image
            src={company?.image_url ?? "/fallback.png"}
            alt={company.name}
            height={120}
            width={120}
            style={{ objectFit: "cover" }}
          />
          <h1 className="text-3xl font-extrabold mb-2 text-center">
            {company.name}
          </h1>
          <Badge className="mb-2">{company.owner.email}</Badge>
          <p className="text-center mb-4">{company.description}</p>
        </div>
      </Card>
      <div className="mt-8 w-full">
        <JobListingAndReviewConatiner
          key={id}
          company={company}
          reviews={review}
        />
      </div>
    </div>
  );
}
