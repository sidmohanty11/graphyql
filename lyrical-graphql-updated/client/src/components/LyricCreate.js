import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

function LyricCreate({ id }) {
    const [lyric, setLyric] = useState('');
    const [addLyricToSong] = useMutation(mutation);

    const onLyricSubmit = (e) => {
        e.preventDefault();

        addLyricToSong({ variables: { content: lyric, songId: id } });
        setLyric('');
    };
    return (
        <form>
            <input value={lyric} type="text" onChange={(e) => setLyric(e.target.value)} placeholder="Add lyric." className="form-control" aria-describedby="lyric" required />
            <button onClick={onLyricSubmit} type="submit" className="btn btn-outline-dark my-2">Add</button>
        </form>
    );
};

const mutation = gql`
mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
        id
        lyrics {
            content
        }
    }
}
`;

export default LyricCreate;
