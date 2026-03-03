// src/pages/team.js
import { useState } from 'react';
import Layout from '../components/Layout';

export default function TeamMembers() {
    // Team members data - replace with your actual team members
    const teamMembers = [
        {
            name: "Dr. Vinod Lohani",
            email: "vlohani@vt.edu",
            role: "Director",
            photo: "/team/vlohani.jpeg" // These photos should be placed in the public/team directory
        },
        {
            name: "Yunus Naseri",
            email: "mohammadyunusn@vt.edu",
            role: "Phd Student",
            photo: "/team/yunus.jpeg"
        },
        {
            name: "Akshat Kothyari",
            email: "kakshat@vt.edu",
            role: "PhD Student",
            photo: "/team/akshat.jpeg"
        },
        {
            name: "Dhruv Varshney",
            email: "dhruvvarshney@vt.edu",
            role: "Undergraduate Student",
            photo: "/team/dhruv.jpeg"
        },
        {
            name: "Jeremy Smith",
            email: "smithjer@vt.edu",
            role: "PhD Student",
            photo: "/team/jeremy.jpeg"
        },
        {
            name: "Swatika Mohapatra",
            email: "swatikam@vt.edu",
            role: "PhD Student",
            photo: "/team/swatika.jpeg"
        }
    ];

    // Faculty collaborators data
    const facultyCollaborators = [
        {
            name: "Dr. Natasha Bell",
            email: "natashabell@vt.edu",
            role: "Faculty Collaborator",
            photo: "/team/Natasha_bell.jpeg" // Add her photo to the public/team directory
        },
        {
            name: "Dr. John Hoben",
            email: "jphoben@vt.edu",
            role: "Faculty Collaborator",
            photo: "/team/Hoben-John.jpeg"
        }
    ];

    // Past members data
    const pastMembers = [
        {
            name: "Yousef Jalali",
            email: "yousef@vt.edu",
            role: "PhD Student (2023)",
            photo: "/team/youself.jpeg"
        },
        {
            name: "Julia Hallworth",
            email: "jhallworth@vt.edu",
            role: "Undergraduate RA",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "Christine Trieu",
            email: "christinet@vt.edu",
            role: "Undergraduate RA",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "Dr. Randel L. Dymond",
            email: "dymond@vt.edu",
            role: "Assistant Director",
            photo: "/team/dymond.jpeg"
        },
        {
            name: "Debarati Basu",
            email: "",
            role: "PhD Student",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "Daniel Brogan",
            email: "",
            role: "PhD Student",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "Walter McDonald",
            email: "",
            role: "PhD Student",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "Bushra Chowdhury",
            email: "",
            role: "PhD Student",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "Todd Aronhalt",
            email: "",
            role: "PhD Student",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "Joshua Gozum",
            email: "",
            role: "PhD Student",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "James Taylor",
            email: "",
            role: "Undergraduate RA",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "Serena Emanuel",
            email: "",
            role: "Undergraduate RA",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "Nick Falls",
            email: "",
            role: "Undergraduate RA",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "Mathew Verghese",
            email: "",
            role: "Undergraduate RA",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "Chris Osterhout",
            email: "",
            role: "Undergraduate RA",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "Sara Freix",
            email: "",
            role: "Undergraduate RA",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "Trevor Jones",
            email: "",
            role: "Undergraduate RA",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "Leeciling Chea",
            email: "chea97@vt.edu",
            role: "Undergraduate RA",
            photo: "/team/lee.jpeg"
        },
        {
            name: "Nathan Moeliono",
            email: "nathanlm@vt.edu",
            role: "Undergraduate RA",
            photo: "/team/nathan.jpeg"
        },
        {
            name: "Derik Rangel Arone",
            email: "derik4@vt.edu",
            role: "Undergraduate RA",
            photo: "/team/derik.jpeg"
        },
        {
            name: "Ben Roston",
            email: "bhroston@vt.edu",
            role: "Graduate RA",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "Morgan Camper",
            email: "cmorgan4@vt.edu",
            role: "Undergraduate RA",
            photo: "/team/morgan.jpeg"
        },
        {
            name: "Uditi Goyal",
            email: "",
            role: "Undergraduate RA",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "Molly Sayles",
            email: "ssmolly7@vt.edu",
            role: "Undergraduate RA",
            photo: "/team/molly.jpeg"
        },
        {
            name: "Miriam Badre",
            email: "mbadre@vt.edu",
            role: "Undergraduate RA",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "Thomas Westfall",
            email: "",
            role: "Graduate RA",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "Angelica Melvin",
            email: "",
            role: "Graduate RA",
            photo: "/team/no_photos.jpeg"
        },
        {
            name: "Dylan Hondaroust",
            email: "dylanh8@vt.edu",
            role: "Graduate RA",
            photo: "/team/dylan.jpeg"
        }
    ];

    return (
        <Layout title="LEWAS Lab - Team Members">
            <div className="team-container">
                <h3 className="section-title">Current members</h3>
                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-member-card">
                            <div className="member-photo">
                                {/* If photo is not available, show initials */}
                                {member.photo ? (
                                    <img src={member.photo} alt={member.name} />
                                ) : (
                                    <div className="member-initials">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                )}
                            </div>
                            <div className="member-info">
                                <h3>{member.name}</h3>
                                <p className="member-role">{member.role}</p>
                                <p className="member-email">{member.email}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Divider line */}
                <div className="team-divider"></div>

                {/* Faculty Collaborators Section */}
                <h3 className="section-title">Faculty collaborators</h3>
                <div className="team-grid">
                    {facultyCollaborators.map((collaborator, index) => (
                        <div key={`collaborator-${index}`} className="team-member-card">
                            <div className="member-photo">
                                {/* If photo is not available, show initials */}
                                {collaborator.photo ? (
                                    <img src={collaborator.photo} alt={collaborator.name} />
                                ) : (
                                    <div className="member-initials">
                                        {collaborator.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                )}
                            </div>
                            <div className="member-info">
                                <h3>{collaborator.name}</h3>
                                <p className="member-role">{collaborator.role}</p>
                                <p className="member-email">{collaborator.email}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Divider line */}
                <div className="team-divider"></div>

                {/* Past Members Section */}
                <h3 className="section-title">Past members</h3>
                <div className="team-grid">
                    {pastMembers.map((member, index) => (
                        <div key={`past-member-${index}`} className="team-member-card">
                            <div className="member-photo">
                                {/* If photo is not available, show initials */}
                                {member.photo ? (
                                    <img src={member.photo} alt={member.name} />
                                ) : (
                                    <div className="member-initials">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                )}
                            </div>
                            <div className="member-info">
                                <h3>{member.name}</h3>
                                <p className="member-role">{member.role}</p>
                                <p className="member-email">{member.email}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="development-notice">
                    <p>Team member information is being updated.</p>
                </div>
            </div>
        </Layout>
    );
}