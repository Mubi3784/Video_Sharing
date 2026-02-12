function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="p-8 rounded-2xl bg-white shadow-xl text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Tailwind CSS is working 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          If you see colors, spacing, and styling — Tailwind is installed correctly.
        </p>

        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Test Button
        </button>
      </div>
    </div>
  );
}

export default App;
