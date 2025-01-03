// import React, { useEffect, useState } from 'react';
// import type { Project } from '../types/types';
// import { fetchProjects } from '../services/portfolioService';

// const Projects: React.FC = () => {
//     const [projects, setProjects] = useState<Project[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
        
//         //console.log("Fetching projects data...");

//         const loadProjects = async () => {
//             try {
//                 const data = await fetchProjects();
//                 setProjects(data);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to load projects');
//                 setLoading(false);
//             }
//         };
        
//         loadProjects();
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
//         Projects
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {projects.map((project) => (
//           <div
//             key={project.id}
//             className="group bg-gradient-to-b from-gray-100 to-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
//           >
//             <div className="relative">
//               {project.image && (
//                 <img
//                   src={project.image}
//                   alt={project.title}
//                   className="rounded-t-lg w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//                 />
//               )}
//               {project.link && (
//                 <a
//                   href={project.link}
//                   className="absolute top-2 right-2 bg-blue-600 text-white text-sm px-3 py-1 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Visit
//                 </a>
//               )}
//             </div>
//             <div className="p-4">
//               <h2 className="text-lg font-semibold text-gray-800 mb-2">
//                 {project.title}
//               </h2>
//               <p className="text-sm text-gray-600 line-clamp-3 mb-3">
//                 {project.description}
//               </p>
//               <div className="flex flex-wrap gap-2 mt-4">
//                 {project.technologies.split(", ").map((tech, index) => (
//                   <span
//                     key={index}
//                     className="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full"
//                   >
//                     {tech}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Projects;

import React, { useEffect, useState } from 'react';
import type { Project } from '../types/types';
import { fetchProjects } from '../services/portfolioService';

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load projects');
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-10 text-center text-white">
                Personal <span className="text-blue-500">Projects</span>
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="group bg-[#1E1E1E] p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
                    >
                        <div className="relative overflow-hidden rounded-t-lg">
                            {project.image && (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="rounded-t-lg w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            )}
                        </div>
                        <div className="p-4 text-white">
                            <h2 className="text-lg font-semibold mb-2">{project.title}</h2>
                            <p className="text-sm text-gray-400 line-clamp-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.technologies.split(", ").map((tech, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-800 text-gray-300 text-xs font-medium px-3 py-1 rounded-full"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-4 border-t border-gray-700">
                            {project.link ? (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-blue-400 hover:text-blue-500 transition-colors"
                                >
                                    <img src="/icons/live-preview.svg" alt="Live Preview" className="w-5 h-5" />
                                    Live Preview
                                </a>
                            ) : (
                                <span className="flex items-center gap-2 text-gray-500 cursor-not-allowed">
                                    <img src="/icons/live-preview.svg" alt="Live Preview" className="w-5 h-5 opacity-50" />
                                    Live Preview
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
