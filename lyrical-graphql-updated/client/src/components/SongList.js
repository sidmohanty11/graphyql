import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";

function SongList(props) {
    const { loading, error, data, refetch } = useQuery(query);
    const [deleteSong] = useMutation(mutation);

    // refetch songs! ---- this is called realtime, bro. -----
    useEffect(() => refetch(), []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const onDelete = async (id) => {
        deleteSong({ variables: { id } });
        await refetch();
    }

    // fetch the songs from mongodb by graphQL
    const fetchSongs = () => {
        return data.songs.map(({ id, title }) => {
            return (
                <div key={id} className="list-group-item list-group-item-action d-flex justify-content-between">
                <Link to={`/song/${id}`} className="alert-light text-decoration-none">{title}</Link>
                <button onClick={() => onDelete(id)} className="btn btn-outline-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000">
                        <path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
                    </svg>
                </button>
                </div>
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

const mutation = gql`
mutation DeleteSong($id: ID){
    deleteSong(id: $id){
        id
    }
}
`;

export default SongList;
