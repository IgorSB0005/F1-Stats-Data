import Link from "next/link";
import Header from "@/components/header";
import Dashboard from "@/components/dashboard";

export default function Home() {
  return (
    <div>
      <Header/>
      <Dashboard/>
      <div>
        <button>
          <Link href="/news">Go to news</Link>
        </button>
      </div>
    </div>
  );
}
