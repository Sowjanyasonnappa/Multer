import React, { useEffect, useState } from 'react'

const Form = () => {
    const [file, setFile] = useState(null)
    const [select, setSelect] = useState(null);

    useEffect(()=>{
        const saveImage = localStorage.getItem("select image");
        if(saveImage){
            setSelect(saveImage)
        }
    }, [])


    const handleChange = (e) => setFile(e.target.files[0])

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try{
            const res = await fetch("http://localhost:3000/api/image/upload", {
                method: "POST",
                body: formData,
        });

         if (!res.ok) {
        throw new Error(`Upload failed: ${res.status}`);
      }


        const data = await res.json();
        fetchAndDisplayImage(data.id);
    }catch(err){
        console.log(err);

    }
}

    const fetchAndDisplayImage = async (id) => {
        try{
            const res = await fetch(`http://localhost:3000/api/image/${id}`);
            if(!res.ok) throw new Error("Image not found");

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);

            setSelect(url);
            localStorage.setItem("select image", url);

        }catch(err){
            console.log(err);
    }
}
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept='image/*' onChange={handleChange}/><br /><br />

        <button type="submit">Uplode</button>
      </form><br />
        {select && <img src={select} alt='uploaded' width="300px" />}
    </div>
  )
}

export default Form
