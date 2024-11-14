// src/pages/About.tsx
import React from 'react';

const About: React.FC = () => {
    return (
        <pre className="text-green-400 font-mono text-sm">
{`/* About Me */

function AboutMe() {
    return (
        <>
            Hi, I'm Jaisheel Polimera! 👋
            I'm a passionate developer specializing in front-end development.
            I enjoy creating interactive applications and love exploring
            new technologies to push the boundaries of web development.
            
            /* Contact me to learn more! */
        </>
    );
}`}
        </pre>
    );
};

export default About;
