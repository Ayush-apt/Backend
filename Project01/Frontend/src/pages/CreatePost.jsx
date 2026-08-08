import React from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const CreatePost = () => {

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("SUBMIT FIRED");

        const formData = new FormData(e.target);

        axios.post("http://localhost:3000/create-post", formData)
            .then((res) => {
                console.log("SUCCESS", res.data);
                navigate("/feed");
            })
            .catch((err) => {
                console.log("ERROR", err);
                alert("Error creating post");
            });
    }

  return (
    <section className='create-post-section'>
        <h1>Create Post</h1>

            <form onSubmit={handleSubmit}>
            <input type="file" name="image" accept='image/*'/>
            <input type="text" name="caption" required/>
            <button type="submit">Submit</button>
        </form>
    </section>
  )
}

export default CreatePost
