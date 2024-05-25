import './DevInfo.css';

const DevInfo = () => {
    return (
        // <div className='bg-gradient-to-b from-cyan-100 to-blue-200'>
        <div>
            <div className='container section py-12'>
                <h2 className='title-sec'>Meet the DEV 😎</h2>

                <div>
                    <div className="max-w-4xl mx-auto">
                        <h3 className="sm:text-[28px]">
                            <pre>Hello! I am Wakil Ahmed, </pre>
                            <pre className="border border-gray-500 text-center max-w-[700px]">a <span className="gradient-text-primary">P</span>assionate coder, </pre>
                            <pre className="text-end">a <span className="gradient-text-primary">N</span>ext Js and <span className="gradient-text-primary">MERN</span> Stack developer.</pre>

                        </h3>
                    </div>

                    <div className="ml-[-12px] overflow-hidden mt-6">
                        <div className="about-before sm:text-lg sm:w-2/3 mx-auto px-5 text-justify relative border-success">
                            <p>I blend creativity and proficiency to craft engaging and intuitive web solutions. I take challenges in shaping a website responsive and pixel perfect. I have a solid foundation in HTML and CSS. But what I love most is writing pure Javascript. Well, I also fell in love with React. And handling both of them leaves me breathless. However, I still find time to explore various awesome libraries and packages. That includes visual, performance, animation and a lot of other things.</p>
                        </div>

                        <div className="max-w-xs md:w-fit mx-auto mt-6">
                            <p className="about-divider"><b>Name:</b> Kazi Wakil Ahmed</p>
                            <p className="about-divider"><b>Email:</b> <a href="mailto:ahmedwakil66@gmail.com">ahmedwakil66@gmail.com</a></p>
                            <p className="about-divider"><b>Age:</b> 26</p>
                            <p className="about-divider"><b>Speak:</b> Bangle, English</p>
                            <p ><b>From:</b> Kushtia, Bangladesh</p>
                        </div>
                    </div>
                    <div className="gap-maker"></div>
                </div>

                {/* Education & Certification */}
                <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical mt-8">
                    <h3 className="text-xl font-semibold opacity-90 mb-6 sm:mb-8 text-center">
                        <pre>Education & Experience</pre>
                    </h3>
                    <li>
                        <div className="timeline-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                        </div>
                        <div className="timeline-start md:text-end mb-10">
                            <time className="font-mono italic">2015</time>
                            <div className="text-lg font-black">Higher Secondary Certificate</div>
                            I attended Higher Secondary Exam and passed with a GPA 5.00 from renowned Kushtia Government College.
                        </div>
                        <hr />
                    </li>
                    <li>
                        <hr />
                        <div className="timeline-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                        </div>
                        <div className="timeline-end mb-10">
                            <time className="font-mono italic">2019</time>
                            <div className="text-lg font-black">Bachelor of Business Administration</div>
                            I majored in Bachelor of Business Administration (BBA) from Islamic University Kushtia. The total duration of my BBA life was 4 years. Stating from 2016, ending at 2019.
                        </div>
                        <hr />
                    </li>
                    <li>
                        <hr />
                        <div className="timeline-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                        </div>
                        <div className="timeline-start md:text-end mb-10">
                            <time className="font-mono italic">2021</time>
                            <div className="text-lg font-black">Masters of Business Administration</div>
                            I took my Masters of Business Administration (MBA) degree from Islamic University Kushtia. The total duration of my MBA life was 1 year.
                        </div>
                        <hr />
                    </li>
                    <li>
                        <hr />
                        <div className="timeline-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                        </div>
                        <div className="timeline-end mb-10">
                            <time className="font-mono italic">2023</time>
                            <div className="text-lg font-black">Complete Web Development Course</div>
                            In this time I took a full featured MERN stack as well as NextJs training from Programming Hero&apos;s blockbuster course - Complete Web Development With Jhankar Mahbub.
                        </div>
                        <hr />
                    </li>
                    <li>
                        <hr />
                        <div className="timeline-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                        </div>
                        <div className="timeline-start md:text-end mb-10">
                            <time className="font-mono italic">2024...</time>
                            <div className="text-lg font-black">Self Learning</div>
                            Since I have been spending my time to further enhance my capability in Web development. I have completed numerous personal practice projects, along with three actual real world projects that actually have been serving their original purpose.
                        </div>
                    </li>
                </ul>

                {/* Technology */}
                <div>
                    <h3 className="text-xl font-semibold opacity-90 mb-6 sm:mb-8 text-center">
                        <pre>Technology</pre>
                    </h3>
                    <img src='https://ucarecdn.com/876138a4-3f3d-4a9d-87c0-0626d47e8289/' className='w-full rounded' />
                </div>

            </div>
        </div>
    );
};

export default DevInfo;