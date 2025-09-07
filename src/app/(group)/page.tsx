import AuroraBackgroundDemo from "@/components/home/bg";
import UserBackground from "@/components/home/user-bg";
import { getUserFromCookies } from "@/services/helper";

export default async function HomePage() {
  const user = await getUserFromCookies();
  return <div>{user ? <UserBackground /> : <AuroraBackgroundDemo />}</div>;
}
