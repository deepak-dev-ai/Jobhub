"use client";
import { UserContext } from "@/app/(group)/layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext, useState } from "react";
import { toast } from "sonner";
import {
  company as CompanyType,
  openings,
  review as ReviewType,
} from "../../../../generated/prisma";
import JobCard from "../../job/job-card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import DeleteReviewButton from "./delete-review";
import UpdateReviewButton from "./update-review";

interface JobListingAndReviewProps {
  company: CompanyType & { jobs: openings[] };
  reviews: (ReviewType & { user: { email: string } })[];
}

export default function JobListingAndReviewContainer({
  company,
  reviews,
}: JobListingAndReviewProps) {
  const [reviewText, setReviewText] = useState("");
  const [reviewList, setReviewList] = useState(reviews);
  const { user } = useContext(UserContext);

  async function handleCreateReview() {
    if (!reviewText.trim()) return;

    const reviewToCreate = {
      content: reviewText,
      company_id: company.id,
    };

    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewToCreate),
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Review created");
      window.location.reload();
      const finalReview = {
        ...reviewToCreate,
        id: String(data.id),
        user_id: String(user?.id),
        user: { user, email: user?.email || "Unknown" },
      };

      setReviewList([finalReview, ...reviewList]);
      setReviewText("");
    } else {
      toast.error("Failed to add review please login");
    }
  }
  return (
    <div className="max-w-lg flex-col mt-8 gap-8">
      <Tabs defaultValue="listed-jobs">
        <TabsList className="mb-4 flex justify-center">
          <TabsTrigger
            value="listed-jobs"
            className="px-6 py-2 font-semibold cursor-pointer"
          >
            Listed Jobs
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="px-6 py-2 font-semibold cursor-pointer"
          >
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="listed-jobs">
          <Card className="p-6  space-y-4">
            <h2 className="text-xl font-bold mb-2">Open Positions</h2>
            {company.jobs.length === 0 ? (
              <p>No jobs listed yet.</p>
            ) : (
              <div className="space-y-4">
                {company.jobs.map((job) => (
                  <JobCard key={job.id} job={job} fromSearch={true} />
                ))}
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card className="p-6 space-y-6">
            {user?.id !== company.ownerId && (
              <div>
                <h2 className="text-xl font-bold mb-2">Add a Review</h2>
                <div className="flex gap-2 items-center">
                  <Input
                    placeholder="Share your experience..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                  <Button
                    onClick={handleCreateReview}
                    className="h-fit cursor-pointer"
                  >
                    Add
                  </Button>
                </div>
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold mb-2">Recent Reviews</h2>
              {reviewList.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                <div className="space-y-4">
                  {reviewList.map((rev) => (
                    <Card key={rev.id} className="p-4 flex flex-col gap-2">
                      <div className="flex justify-between">
                        <div>
                          <Badge variant="secondary">{rev.user.email}</Badge>
                        </div>
                        <div className="flex gap-2 items-center">
                          {user?.id === rev.user_id && (
                            <DeleteReviewButton id={rev.id} />
                          )}
                          {user?.id === rev.user_id && (
                            <UpdateReviewButton
                              id={rev.id}
                              revcon={rev.content}
                            />
                          )}
                        </div>
                      </div>
                      <p className="text-sm font-semibold px-2">
                        {rev.content}
                      </p>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
