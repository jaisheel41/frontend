import React from 'react';

const About: React.FC = () => {
    return (
        <div className="flex flex-col items-center text-white p-10">
            <h1 className="text-5xl font-extrabold mb-6">Overview.</h1>
            
            <div className="flex flex-col md:flex-row items-center md:items-start max-w-4xl">
                {/* Profile Picture */}
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-transparent shadow-lg 
                                transition-all duration-300 hover:scale-105 
                                before:content-[''] before:absolute before:inset-0 before:rounded-full 
                                before:border-4 before:border-blue-500 before:opacity-50 before:animate-pulse">
                    <img 
                        src="/images/Self.jpg" 
                        alt="Jaisheel Polimera" 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* About Text */}
                <div className="ml-0 md:ml-8 mt-6 md:mt-0 text-center md:text-left">
                    <p className="text-lg flex items-center gap-2">
                        <span role="img" aria-label="developer">👨‍💻</span> 
                        I'm a Software Engineer with experience in web development and cloud technologies.
                    </p>
                    <p className="text-lg flex items-center gap-2 mt-2">
                        <span role="img" aria-label="education">🎓</span> 
                        I hold an MSc in Computing Science from the University of Glasgow.
                    </p>
                    <p className="text-lg flex items-center gap-2 mt-2">
                        <span role="img" aria-label="projects">⚙️</span> 
                        From full-stack development to cloud solutions, I build scalable and high-impact projects.
                    </p>
                    <p className="text-lg flex items-center gap-2 mt-2">
                        <span role="img" aria-label="automation">🔧</span> 
                        I love automating workflows and solving complex problems efficiently.
                    </p>
                    <p className="text-lg flex items-center gap-2 mt-2">
                        <span role="img" aria-label="learning">💡</span> 
                        I'm always curious and constantly learning.
                    </p>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                        <a 
                            href="https://drive.google.com/file/d/1Owvgg_bEyaCjujqNW5hAGxNI531mEXCN/view?usp=sharing" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md 
                                       hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                        >
                            Resume
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/sai-jaisheel-polimera-4a170a1b8/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md 
                                       hover:bg-blue-600 hover:scale-105 transition-all duration-300"
                        >
                            LinkedIn
                        </a>
                        <a 
                            href="https://github.com/jaisheel41" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md 
                                       hover:bg-gray-800 hover:scale-105 transition-all duration-300"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
