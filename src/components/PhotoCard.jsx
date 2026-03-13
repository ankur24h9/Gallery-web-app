export default function PhotoCard({ photo, isFav, toggleFav }) {
  return (
    <div className="border rounded shadow p-2 ">
      <img
        src={photo.download_url}
        alt={photo.author}
        className="w-lg h-48 object-cover rounded"
      />

      <div className="flex justify-between items-center mt-2">
        <p className="text-sm">{photo.author}</p>

        <button onClick={() => toggleFav(photo)}>
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}