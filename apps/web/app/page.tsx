import { ModeToggle } from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      <Button variant="outline">Button</Button>
      <ModeToggle />
    </div>
  );
}
