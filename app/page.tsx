import Posts from "./components/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {/* FOR REDUX TOOL KIT */}
      {/* JUST localhost:3000 */}
      <Posts />
    </main>
  );
}
