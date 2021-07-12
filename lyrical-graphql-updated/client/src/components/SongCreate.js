import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

function SongCreate() {
    const [title, setTitle] = useState('');
    const history = useHistory();
    const [addSong] = useMutation(mutation);

    const submitSong = (e) => {
        e.preventDefault();
        // the mutation_function({ variables: { $the_variables } })
        addSong({ variables: { title } });
        setTitle('');
        history.push("/");
    }

    return (
        <div>
            <h1 className="display-2">Add a Song.</h1>
            <form>
                <div className="mb-3">
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="song title" type="text" className="form-control" aria-describedby="song" required />
                </div>
                <button onClick={submitSong} type="submit" className="btn btn-dark">Submit</button>
                <Link className="btn btn-outline-dark mx-2" to="/">Cancel</Link>
            </form>
        </div>
    );
};

const mutation = gql`
mutation AddSong($title: String){
    addSong(title: $title){
        id
        title
    }
}
`;

export default SongCreate;
