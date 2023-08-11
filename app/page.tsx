import { Button } from "@/components/ui/button";
import NavigationBar from "@/components/custom/navigation-bar.custom";
import { NAVIGATION_ITEMS } from "@/constants/navigation.constants";

export default function Home() {
  return (
    <div>
      <NavigationBar items={NAVIGATION_ITEMS} />
    </div>
  );
}
