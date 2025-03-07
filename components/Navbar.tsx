import { auth, signOut, signIn } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <button
                className="cursor-pointer"
                onClick={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                Logout
              </button>
              <Link href={`/user/${session.user?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit" className="cursor-pointer">
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}
