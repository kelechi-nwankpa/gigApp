import React, { useReducer, useState } from 'react';
import "./AddGig.scss";
import { INITIAL_STATE, gigReducer } from '../../reducers/gigReducer';
import gigActions from '../../reducers/gigActions';
import upload from '../../utils/upload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axiosRequest from '../../utils/axiosRequest';


const AddGig = () => {

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleChange = (e) => {

    dispatch({
      type: gigActions.CHANGE_INPUT,
      payload: {
        name: e.target.name,
        value: e.target.value
      }
    })
  }


  const handleUpload = async () => {
    setUploading(true);
    //receive the file or files,
    // apply the upload function to send cloudinary
    //send the urls gotten to the reducers

    try {
      //single file
      const cover = await upload(singleFile);

      //multiple files ([...files])- another method to convert Flatlist object into array.
      const images = await Promise.all(
        Array.from(files).map(async (file) => {
          const res = await upload(file);
          return res;

        }))
      setUploading(false);
      dispatch({
        type: gigActions.ADD_IMAGES, payload: {
          cover, images
        }
      })
    } catch (err) {
      console.log(err)
    }
  }


  const handleFeature = (e) => {
    e.preventDefault()
    dispatch({
      type: gigActions.ADD_FEATURES,
      payload: e.target[0].value
    })
    e.target[0].value = "";
  }

  const mutation = useMutation({
    mutationFn: (gig) => {
      return axiosRequest.post("/gigs", gig)
    },
    onSuccess: () => {
      //This invalidates and removes this request from cache and fetches a new set.
      queryClient.invalidateQueries(["myGigs"]);
    }
  })

  const handleSubmit = (e) => {

    setIsCreating(true)
    e.preventDefault();
    mutation.mutate(state);

    setTimeout(()=>{
      navigate("/myGigs");
      setIsCreating(false)
    }, 5000)
    //navigate("/myGigs");
  }

  return (
    <div className='addGig'>
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="">Title</label>
            <input onChange={handleChange} name="title" type="text" placeholder="e.g I will do something incredibly amazing" />
            <label htmlFor="">Categories</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="music">Music</option>
              <option value="web">Web</option>
              <option value="animation">Animation</option>
            </select>

            {/* create a div for contaiing the files input and add a button */}
            <div className="images">
              <div className="imagesInput">
                <label htmlFor="">Cover Photo</label>
                <input type="file" onChange={(e) => setSingleFile(e.target.files[0])} />
                <label htmlFor="">Upload Images</label>
                <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
              </div>
              <button onClick={handleUpload}>{uploading ? "Uploading..." : "Upload"}</button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              onChange={handleChange}
              id=""
              cols="30"
              rows="16"
              placeholder="Brief description to introduce your service to customers"
            >

            </textarea>
            <button className="btn_create" disabled={isCreating} onClick={handleSubmit}>
              {isCreating ? <div className="spinner" id="spinner"></div> : "Create"}
            </button>
          </div>
          <div className="right">
            <label htmlFor="">Service Title</label>
            <input name="shortTitle" type="text" placeholder="e.g. One-page web design" onChange={handleChange} />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              id=""
              cols="30"
              rows="16"
              placeholder="Short description of your service"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="">Delivery Time(e.g 3 days)</label>
            <input name="deliveryTime" type="number" min={1} onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input name="revisionNumber" type="number" min={1} onChange={handleChange} />
            <label htmlFor="">Add Features</label>

            <form className="formFeature" action="" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures" >
              {
                state?.features?.map((f) => (
                  <div className="item" key={f}>
                    <button onClick={() => dispatch({
                      type: gigActions.REMOVE_FEATURES,
                      payload: f
                    })}>
                      {f} <span>X</span>
                    </button>
                  </div>

                ))
              }
            </div>

            <label htmlFor="">Price</label>
            <input name="price" type="number" min={1} onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddGig