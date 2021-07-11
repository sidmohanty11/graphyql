import React, { useEffect } from 'react';
import { useQuery, gql } from "@apollo/client";

function SongList(props) {
    const { loading, error, data, refetch } = useQuery(query);

    // refetch songs! ---- this is called realtime, bro. -----
    useEffect(() => refetch(), []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    // fetch the songs from mongodb by graphQL
    const fetchSongs = () => {
        return data.songs.map(song => {
            return (
                <a href="" className="list-group-item list-group-item-action" key={song.id}>{song.title}</a>
            );
        });
    };
    return (
        <div className="list-group py-2">
            {fetchSongs()}
        </div>
    )
}

const query = gql`
{
    songs {
        id
      title
    }
}
`;

export default SongList;
