import React, { useState } from 'react';
import './student.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHomeUser, faUser, faCamera } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Sidebar({ id, to, usr, userType }) {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); // State to store image URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("myfile", selectedFile);
            const res = await axios.post(`e-leave-hub-back.vercel.app/filedata/${id}`, formData);
            alert(res.data.msg);

            // Create a Blob object from selected file
            const blob = new Blob([selectedFile], { type: selectedFile.type });

            // Generate a URL for the Blob object
            setImageUrl(URL.createObjectURL(blob));
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const showPopup = () => {
        setPopupVisible(true);
    };

    const hidePopup = () => {
        setPopupVisible(false);
    };

    return (
        <div className='col-md-1 col-lg-1 col-xl-1 col-sm-1 col-xs-1 pt-1 menu'>
            <button className="btn btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                <FontAwesomeIcon icon={faHomeUser} className="menuicon" />
            </button>
            <div className="offcanvas offcanvas-start sidebar show" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel" aria-modal="true" role="dialog">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel"></h5>
                    <button type="button" className='btn btn-success' data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className='row mb-1'>
                        <div className='profileCircle'>
                            {imageUrl ? (
                                <img src={imageUrl} alt="Profile" className="profileicon pt-3 circular-image" />
                            ) : (
                                <FontAwesomeIcon icon={faUser} className="profileicon pt-3" />
                            )}
                            {isPopupVisible && (
                                <div>
                                    <div className='row file pt-1 pb-1'>
                                        <form onSubmit={handleSubmit}>
                                            <input type="file" className='form-control col-12' name="myfile" onChange={handleFileChange} />
                                            <button type='submit' className='btn-xs btn btn-success filebtn p-2 pt-0 pb-0 mx-2'>Upload</button>
                                            <button onClick={hidePopup} className='btn-xs btn btn-danger filebtn mx-2 p-2 pt-0 pb-0'>Close</button>
                                        </form>
                                    </div>
                                </div>
                            )}
                            <button className='camera' onClick={showPopup}><FontAwesomeIcon icon={faCamera} /></button>
                        </div>
                    </div>
                    <Link className='row mt-5 pt-5' to={`/${usr}Dashboard/${id}`}>Dashboard</Link>
                    <Link className='row' to='/about'>About</Link>
                    <Link className='row' to='/contact'>Contact</Link>
                    <Link className='row' to={`${to}${id}`}>Request</Link>
                    <Link className='row' to={`/${usr}Dashboard/${id}`}>Settings</Link>
                    <Link className='row' to='/'>Logout</Link>
                </div>
            </div>
        </div>
    );
}
