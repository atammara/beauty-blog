import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p>Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
        <Link
          href="/"
          className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-md"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}

