
import {prismaClient} from "db/client";
export default async function Home() {
  const users:any = await prismaClient.user.findMany();
  return (
    <div >
     {JSON.stringify(users)}
    </div>
  );
}
export const dynamic = "force-dynamic";
