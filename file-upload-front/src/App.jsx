import { useState } from 'react';
const backendBaseURL = 'http://localhost:8000/';

function App() {
  const [formOne, setFormOne] = useState({ profile_pic: null });
  const [links, setLinks] = useState(null);

  const handleFormOne = async (e) => {
    e.preventDefault();
    if (!formOne.profile_pic) return;
    const formData = new FormData();
    formData.append('image', formOne.profile_pic);
    try {
      const res = await fetch(backendBaseURL + 'file-upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      setLinks(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleFormOne}>
        <div>
          <label htmlFor='profile_pic'>Select your profile picture:&nbsp;</label>
          <input
            name='profile_pic'
            type='file'
            id='profile_pic'
            onChange={(e) => setFormOne({ profile_pic: e.target.files[0] })}
          />
        </div>
        <div>
          <input type='submit' value='Upload' />
        </div>
      </form>
      <hr />

      {links && (
        <img
          src={backendBaseURL + links.file}
          width={250}
          height={200}
          style={{ objectFit: 'contain', marginInline: '15px' }}
          alt={links.alt}
        />
      )}
    </>
  );
}

export default App;
