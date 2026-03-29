import React from "react";

function FilmDetailsComp({ filmData }) {
  // const filmGenres = filmData.genres;
  const cast = filmData.credits.cast;
  const crew = filmData.credits.crew;
  const directorArr = crew.filter((item) => {
    return item.job === "Director" || item.job === "Co-Director";
  });
  const writerArr = crew.filter((item) => {
    return (
      item.job === "Writer" || item.job === "Novel" || item.job === "Screenplay"
    );
  });
  const topCast = cast.slice(0, 6);
  return (
    <div className="py-6 flex flex-col gap-8">
      {/* Header and overview */}
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Synopsis</h1>
        <p className="text-base leading-relaxed">{filmData.overview}</p>
      </div>
      {/* Director and other credits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
        {/* Director Section */}
        {directorArr.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-sm uppercase tracking-wider text-gray-400 font-bold">
              Director
            </h3>
            <div className="flex flex-wrap gap-2">
              {directorArr.map((d, index) => (
                <div
                  key={index}
                  className="group flex w-fit items-center gap-x-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 transition-all hover:border-blue-500/50 hover:bg-blue-500/10"
                >
                  <span className="text-sm font-medium text-white group-hover:text-blue-400">
                    {d.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Writer Section */}
        {writerArr.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-sm uppercase tracking-wider text-gray-400 font-bold">
              Writer
            </h3>
            <div className="flex flex-wrap gap-2">
              {writerArr.map((w, index) => (
                <div
                  key={index}
                  className="flex w-fit items-center rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 transition-all hover:border-purple-500/50 hover:bg-purple-500/10"
                >
                  <span className="text-sm font-medium text-white tracking-tight">
                    {w.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Studio Section */}
        {filmData.production_companies && (
          <div className="flex flex-col gap-3">
            <h3 className="text-sm uppercase tracking-wider text-gray-400 font-bold">
              Studio
            </h3>
            <div className="flex flex-wrap gap-2">
              {filmData.production_companies.map((studio, index) => (
                <div
                  key={index}
                  className="flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold text-gray-200 shadow-sm transition-transform hover:scale-105"
                >
                  {studio.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Each button will render its respective information */}
      {!filmData.number_of_seasons && (
        <div>
          <h3 className="text-xl font-bold mb-4">Cast</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {topCast.map((actor, index) => {
              return (
                <div
                  className="flex flex-col items-center text-center"
                  key={index}
                >
                  {/* https://image.tmdb.org/t/p/w780/ */}
                  <img
                    src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`}
                    className="w-30 h-30 object-cover rounded-full mb-2"
                  />
                  <p className="font-semibold text-sm">{actor.name}</p>
                  <p className="text-[#dae2fd]/60 text-xs">{actor.character}</p>
                </div>
              );
            })}
          </div>
          {/* maybe add a button that leads to more casts */}
          {/* <button onClick={()=> {
            s
          }}>See more</button> */}
        </div>
      )}
    </div>
  );
}
export default FilmDetailsComp;
