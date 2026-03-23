import Link from "next/link";

export default function News() {
  return (
    <div>
      <p>News page</p>
      <div>
        <p>Test element</p>
        <button>
          <Link href="/home">Go to home</Link>
        </button>
      </div>
    </div>
  );
}
