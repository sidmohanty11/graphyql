import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery, gql, useMutation } from "@apollo/client";
import LyricCreate from './LyricCreate';

function SongDetail(props) {
    const { id } = useParams();
    const { loading, error, data, refetch } = useQuery(query, {
        variables: { id },
    });
    const [likeLyric] = useMutation(mutation);

    useEffect(() => refetch(), []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const onLike = async (id) => {
        likeLyric({ variables: { id } });
        await refetch();
    }

    return (
        <div>
            <h1 className="display-2">{data.song.title}</h1>
            <LyricCreate id={id} />
            {data.song.lyrics.map(lyric => (
                <div key={lyric.id} className="list-group-item list-group-item-action d-flex justify-content-between">
                    {lyric.content}
                    <div>
                        <button onClick={() => onLike(lyric.id)} style={{
                        background: "none",
                        color: "inherit",
                        border: "none",
                        padding: 0,
                        font: "inherit",
                        cursor: "pointer",
                        outline: "inherit"
                        }}>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" /></svg>
                        </button>
                        <span className="mx-2">{lyric.likes}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

const query = gql`
query SongQuery($id: ID!){
    song(id: $id){
        id
        title
        lyrics {
            id
            likes
            content
        }
    }
}
`;

const mutation = gql`
mutation LikeLyric($id: ID!){
    likeLyric(id: $id) {
        id
        likes
    }
}
`;

export default SongDetail;
