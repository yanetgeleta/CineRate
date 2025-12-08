import React from "react";

const GenresFilter = ()=> {
    const genres = ["Action","Adventure","Drama","Comedy","Science Fiction"]

    return (
        <div>
            {
                genres.map(genre=> {
                    return (
                    <label htmlFor="">
                        <input type="checkbox" value={genre} />
                        {genre}
                    </label>
                    )
                })
            }
        </div>
    )
}

export default GenresFilter;