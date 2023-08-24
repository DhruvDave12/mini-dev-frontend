import { NAVIGATION_ITEMS } from "@/constants/navigation.constants";
import { Hero, NavigationBar } from "@/components/custom";
import { withPublic } from "@/hooks/route";

interface IHomeProps {
  auth: any;
}

function Home({ auth }: IHomeProps) {
  const { user } = auth;
  console.log("USER IN HERE HAHAHA");
  return (
    <div style={{ height: "80vh" }}>
      <NavigationBar items={NAVIGATION_ITEMS} />
      <div className="flex justify-center items-center w-full h-full">
        <Hero />
      </div>
    </div>
  );
}

export default withPublic(Home);
