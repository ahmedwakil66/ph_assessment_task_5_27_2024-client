// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Blog.css';
import { useLoaderData } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import BlogPdf from './BlogPdf';
import useTitle from '../../hooks/useTitle';

const Blog = () => {
    useTitle('Blog');
    const qAndA = useLoaderData();

    return (
        <div className='container'>
            {/* <div>
                <PDFViewer style={{ width: "100%", height: "88vh" }}>
                    <BlogPdf qAndA={qAndA} />
                </PDFViewer>
            </div> */}

            <div className='blog'>
                <div className='blogs-container'>
                    <h2 className='title-sec'>Blog</h2>
                    <hr />
                    <div>
                        <PDFDownloadLink
                            document={<BlogPdf qAndA={qAndA} />}
                            fileName="blog-qna.pdf"
                        >
                            <button className='btn'>Download as PDF</button>
                        </PDFDownloadLink>
                    </div>
                    {
                        qAndA.map(each => {
                            const { _id, question, answer } = each;
                            return (
                                <div className='qa-container' key={_id}>
                                    <div className='Q-Container'>
                                        <div className='Q-span' >Q.</div>
                                        <p className='Q'>{question}</p>
                                    </div>
                                    <div className='A-Container'>
                                        <div className='A-span'>A.</div>
                                        <div className='A'>
                                            {answer.split('\n').map((para, ind) => <p key={ind}>{para}</p>)}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Blog;