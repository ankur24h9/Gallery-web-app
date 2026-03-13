export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by author..."
      value={search}
      onChange={setSearch}
      className="w-lg p-2 border rounded mb-4 mx-auto block "
    />
  );
}