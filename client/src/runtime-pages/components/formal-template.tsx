
type Props = {
  theme?: string;
  blogTitle?: string;
};

export default function FormalTemplate({ theme , blogTitle }: Props) {
  return (
    <div className={`runtime-theme-${theme} runtime-theme-light
    bg-runtimePrimaryBg min-h-screen text-runtimeOnPrimaryBg`}>
      {/* Header */}
      <header className="border-b border-runtimeSecondary p-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">{blogTitle}</h1>
          <nav className="space-x-6">
            <a href="#" className="text-runtimeSecondary hover:text-runtimePrimary">Home</a>
            <a href="#" className="text-runtimeSecondary hover:text-runtimePrimary">Articles</a>
            <a href="#" className="text-runtimeSecondary hover:text-runtimePrimary">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto py-16 text-center">
        <h2 className="text-4xl font-bold">Insights & Analysis for Professionals</h2>
        <p className="mt-4 text-runtimeSecondary">Delivering well-researched content for business leaders and professionals.</p>
      </section>

      {/* Blog Articles */}
      <section className="max-w-5xl mx-auto py-12">
        <h3 className="text-2xl font-semibold mb-6">Recent Articles</h3>
        <div className="space-y-6">
          {[1, 2, 3].map((post) => (
            <div
              key={post}
              className="border border-runtimeSecondaryLight p-6 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h4 className="text-xl font-medium">Understanding Market Trends</h4>
              <p className="text-runtimeSecondary mt-2">A deep dive into how market trends are shaping industries.</p>
              <a href="#" className="text-runtimeAccent font-medium mt-3 block hover:text-runtimeAccentLight">
                Read More
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-runtimeSecondary py-6 text-center text-runtimeSecondary">
        &copy; {new Date().getFullYear()} The Formal Blog. All rights reserved.
      </footer>
    </div>
  );
}