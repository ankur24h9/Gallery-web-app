import { useState, useReducer, useMemo, useCallback, useEffect } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import { favouriteImg } from "../reducer/favouriteImg";
import PhotoCard from "./PhotoCard";
import SearchBar from "./SearchBar";

export default function Gallery() {

  const { photos, loading, error } = useFetchPhotos();

  const [search, setSearch] = useState("");

  const [favourites, dispatch] = useReducer(
    favouriteImg,
    [],
    () => JSON.parse(localStorage.getItem("favourites")) || []
  );

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [photos, search]);

  const toggleFav = (photo) => {
    dispatch({ type: "TOGGLE_FAV", payload: photo });
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">
  <div className="animate-spin rounded-full h-50 w-50 border-2 border-blue-400 mx-150 font-bold"></div>
</div>
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">

      <SearchBar search={search} setSearch={handleSearch} />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

        {filteredPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            isFav={favourites.some((f) => f.id === photo.id)}
            toggleFav={toggleFav}
          />
        ))}

      </div>

    </div>
  );
}