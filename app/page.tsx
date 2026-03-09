import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-center px-6 py-16 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
              Discover. Share. Explore.
            </p>

            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Discover Unique
              <span className="block">Travel Experiences</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
              Explore hidden adventures, local gems, and unforgettable moments
              shared by travelers and experience hosts from around the world.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/feed"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-lg transition hover:scale-[1.02] hover:bg-gray-100"
              >
                Explore Experiences
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Start Sharing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Travelers Love Lynkerr
            </h2>
            <p className="mt-3 text-gray-600">
              A simple platform for discovering and sharing memorable travel
              experiences.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 10l9-7 9 7" />
                  <path d="M5 10v10h14V10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Unique Experiences
              </h3>
              <p className="mt-2 text-gray-600">
                Find authentic adventures and local discoveries beyond typical
                tourist spots.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20a6 6 0 0 1 12 0" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Built for Hosts
              </h3>
              <p className="mt-2 text-gray-600">
                Let travel providers showcase what they offer in a clean and
                accessible way.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10z" />
                  <circle cx="12" cy="11" r="2.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Explore Anywhere
              </h3>
              <p className="mt-2 text-gray-600">
                Browse destinations, discover inspiring trips, and plan your
                next experience with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gray-900 px-8 py-12 text-center shadow-xl">
          <h2 className="text-3xl font-bold text-white">
            Ready to find your next adventure?
          </h2>
          <p className="mt-3 text-white/75">
            Browse experiences from different locations or create your own and
            share it with the world.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/feed"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              Browse Feed
            </Link>
            <Link
              href="/register"
              className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Register
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}