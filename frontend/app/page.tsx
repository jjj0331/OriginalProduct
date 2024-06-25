import Card from "./Components/Cards/page";
import Serch from "./Components/Serch/page";

export default function Home() {
  return (
    <main>
      <Serch/>
      <div className="mt-4 mx-4 grid grid-cols-4 gap-4">
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      </div>
      
    </main>
  );
}
