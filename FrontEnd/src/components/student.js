import React, { useState, useEffect } from 'react';
import './student.css';
import Studiv from './studiv';
import Sidebar from './sidebar';
import Counter from './counter';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointDown, faCircleXmark, faCheckSquare, faChartPie, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import OptBoxes from './optBoxes';
import Calender from './calender';
import axios from 'axios';

export default function Student() {
    const { id } = useParams();
    const [student, setStudent] = useState({});
    const [acceptedCount, setAcceptedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentRes = await axios.post(`https://e-leave-hub-back.vercel.app/findstudent/${id}`);
                const acceptedRes = await axios.post(`https://e-leave-hub-back.vercel.app/countupdate1/${id}`);
                const rejectedRes = await axios.post(`https://e-leave-hub-back.vercel.app/countupdate0/${id}`);
                const pendingRes = await axios.post(`https://e-leave-hub-back.vercel.app/countupdate-1/${id}`);

                setStudent(studentRes.data);
                setAcceptedCount(acceptedRes.data);
                setRejectedCount(rejectedRes.data);
                setPendingCount(pendingRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div className='text-center'>Loading...</div>;
    }

    return (
        <div className='container-fluid dashboard'>
            <div className='row dash'>
                <Sidebar id={id} to='/sendemail/' usr={'student'}  />
                <div className='col-md-11 col-lg-11 col-xl-11 col-sm-10 col-xs-10 box'>
                    <h1 className='pt-4 pb-1 mx-5 wel'>{student.name}...</h1>
                    <div className="row">
                        <div className='col-md-4 col-lg-4 col-xl-4 col-sm-4 col-xs-4 mx-3 pt-4'>
                            <div className='row leaveCnt'>
                                <Counter purpose="Overall Requests" cnt={acceptedCount + rejectedCount + pendingCount} />
                            </div>
                        </div>
                        <div className='col-md-7 col-lg-7 col-xl-7 col-sm-12 col-xs-12'>
                            <div className='row'>
                                <Calender />
                            </div>
                        </div>
                    </div>
                    <div className='row pt-5'>
                        <div className='col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12 msg'>
                            <p className='text-center p-5 pb-1 pt-1'>
                                Click here to send request <FontAwesomeIcon icon={faHandPointDown} className="reqicon" />
                            </p>
                            <button className="btn-success btn" onClick={() => navigate(`/sendemail/${id}`)}>
                                <FontAwesomeIcon icon={faPaperPlane} className="reqicon" />
                            </button>
                        </div>
                        <div className='col-md-7 col-lg-7 col-xl-7 col-sm-12 col-xs-12 boxmain m-2 p-3'>
                            <div className='row boxesrow'>
                                <div className='col p-3 m-2'>
                                    <OptBoxes name="Accepted" cnt={acceptedCount} icon={faCheckSquare} />
                                </div>
                                <div className='col p-3 m-2'>
                                    <OptBoxes name="Rejected" cnt={rejectedCount} icon={faCircleXmark} />
                                </div>
                                <div className='col p-3 m-2'>
                                    <OptBoxes name="Pending" cnt={pendingCount} icon={faChartPie} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <Studiv id={id} />
                    </div>
                </div>
            </div>
        </div>
    );
}
