import React, { useState, useEffect } from 'react';
import './student.css';
import Sidebar from './sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCheckSquare, faChartPie, faHandPointDown, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import Counter from './counter';
import OptBoxes from './optBoxes';
import Calender from './calender';
import axios from 'axios';

export default function Hod() {
    const { id } = useParams();
    const [a, seta] = useState(0);
    const [r, setr] = useState(0);
    const [o, seto] = useState(0);
    const [hod, sethod] = useState({});
    const nav = useNavigate();

    useEffect(() => {
        const fetchHodDetails = async () => {
            try {
                const hodResponse = await axios.post(`e-leave-hub-back.vercel.app/findhod/${id}`);
                sethod(hodResponse.data);
                console.log('HoD details:', hodResponse.data);
            } catch (err) {
                console.error('Error fetching HoD details:', err);
            }
        };

        const fetchCounts = async () => {
            try {
                // const [acceptResponse, rejectResponse, pendingResponse] = await Promise.all([
                //     axios.post(`e-leave-hub-back.vercel.app/countupdate1/${id}`),
                //     axios.post(`e-leave-hub-back.vercel.app/countupdate0/${id}`),
                //     axios.post(`e-leave-hub-back.vercel.app/countupdate-1/${id}`)
                // ]);
                seta(0);
                setr(0);
                seto(0);
                // console.log('Counts:', {
                //     accepted: acceptResponse.data,
                //     rejected: rejectResponse.data,
                //     pending: pendingResponse.data
                // });
            } catch (err) {
                console.error('Error fetching counts:', err);
            }
        };

        fetchHodDetails();
        fetchCounts();
    }, [id]);

    const name = hod.name;

    return (
        <div className='container-fluid'>
            <div className='row dash'>
                <Sidebar id={id} to={'/hodaccept/'} usr={'hod'} userType={'hod'} />
                <div className='col-md-11 col-lg-11 col-xl-11 col-sm-10 col-xs-10 box'>
                    <h1 className='pt-4 pb-1 mx-5 wel'>{name}...</h1>
                    <div className="row">
                        <div className='col-md-4 col-lg-4 col-xl-4 col-sm-4 col-xs-4 mx-3'>
                            <div className='row leaveCnt'>
                                <Counter purpose="Overall Requests" cnt={a + r + o} />
                            </div>
                        </div>
                        <div className='col-md-7 col-lg-7 col-xl-7 col-sm-12 col-xs-12'>
                            <div className='row leaveCnt m-3'>
                                <Calender />
                            </div>
                        </div>
                        <div className='row pt-5'>
                            <div className='col-md-4 col-lg-4 col-xl-4 col-sm-12 col-xs-12 msg'>
                                <p className='text-center p-5 pb-1 pt-1'>
                                    Click here to view request
                                    <FontAwesomeIcon icon={faHandPointDown} className="reqicon" />
                                </p>
                                <button className="btn-success btn" onClick={() => nav(`/hodaccept/${id}`)}>
                                    <FontAwesomeIcon icon={faMailBulk} className="reqicon" />
                                </button>
                            </div>
                            <div className='col-md-7 col-lg-7 col-xl-7 col-sm-12 col-xs-12 boxmain m-2 p-3'>
                                <div className='row boxesrow'>
                                    <div className='col p-3 m-2'>
                                        <div className='row'><OptBoxes name="Accepted" cnt={a} icon={faCheckSquare} /></div>
                                    </div>
                                    <div className='col p-3 m-2'>
                                        <div className='row'><OptBoxes name="Rejected" cnt={r} icon={faCircleXmark} /></div>
                                    </div>
                                    <div className='col p-3 m-2'>
                                        <div className='row'><OptBoxes name="Pending" cnt={o} icon={faChartPie} /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
