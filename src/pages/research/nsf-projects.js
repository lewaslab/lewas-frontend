import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';

export default function NSFProjects() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/research" className="text-blue-600 hover:text-blue-800">
            ← Back to Research
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-8 text-blue-600">
          Ongoing NSF Projects
        </h1>
        
        <div className="nsf-project-content">
          {/* RET Site */}
          <h2 className="project-title">
            1) RET Site: Interdisciplinary Water Science and Engineering
          </h2>

          <h3 className="section-subtitle">Project Summary</h3>

          <div className="content-text">
            <p>
              The NSF RET Site: Interdisciplinary Water Science and Engineering (Award #2601558) at Virginia Tech provides a six-week interdisciplinary research and professional development experience for grades 9–12, community college, and pre-service teachers in Southwest Virginia. The project connects educators with current water science and engineering research—including water quality, sustainability, environmental monitoring, artificial intelligence, and biotechnology—and supports them in developing research-based STEM learning modules for their classrooms. Through its connection with the LEWAS Laboratory, the project brings authentic water data, environmental research, sensing technologies, and data-driven approaches into educational experiences, helping teachers and students explore real-world water challenges and the role of interdisciplinary engineering in addressing them.
            </p>
          </div>

          <div className="content-text project-meta">
            <p>
              <strong>PI:</strong> Vinod K. Lohani | <strong>Co-PI:</strong> Natasha L. Bell
            </p>
            <p>
              <strong>Project Period:</strong> October 1, 2026 – September 30, 2029 | <strong>Award:</strong> $600,000
            </p>
            <p>
              NSF Award{' '}
              <a
                href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=2601558"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                #2601558
              </a>
            </p>
          </div>

          {/* IUSE Project */}
          <h2 className="project-title">
            2) NSF/IUSE Project: An Interdisciplinary Approach to Prepare Undergraduates for Data Science Using Real-World Data from High-Frequency Monitoring Systems
          </h2>
          
          {/* Project Summary Subtitle */}
          <h3 className="section-subtitle">Project Summary</h3>
          
          {/* Overview */}
          <div className="content-text">
            <p>
              Overview: Motivated by a National Academy of Sciences report on Data Science for Undergraduates, this is the first time interdisciplinary faculty from Virginia Tech (VT), North Carolina Agricultural and Technical University (NC A&T, an HBCU), and Vanderbilt University (VU) proposed a large-scale collaborative effort to promote innovation and change in undergraduate STEM+C curricula. This unique effort is informed by investigators&apos; prior successful NSF grants and will generate new knowledge about data science-integrated STEM learning.
            </p>
          </div>
          
          {/* Project Image */}
          <div className="image-section">
            <Image 
              src="/images/iuse.png" 
              alt="NSF/IUSE Project" 
              width={0}
              height={0}
              sizes="37.44vw"
              priority
              className="project-image"
              style={{ width: '37.44%', height: 'auto' }}
            />
          </div>
          
          {/* Project Goals */}
          <div className="content-text">
            <p>
              <strong>Project Goals:</strong> Develop and implement an interdisciplinary collaborative approach to support undergraduate students in developing Data Science expertise through various STEM+C disciplines including engineering, computer science, environmental science, and biology. Specific objectives are to:
            </p>
            <ul className="goals-list">
              <li>integrate real-world data from two high-frequency monitoring systems (one on water monitoring at VT and another on traffic monitoring at VU) into 8 relevant STEM+C courses at VT, VU, and NC A&T</li>
              <li>conduct research on student and instructor perspectives of data science learning using data across various disciplines, institutions, gender, and ethnicity</li>
              <li>and extend the impact of this project beyond the partnering universities through the dissemination of learning materials created with key considerations for integrating data science into different STEM+C courses.</li>
            </ul>
          </div>
          
          {/* Data Sources */}
          <div className="content-text">
            <p>
              <strong>Data Sources:</strong> Two unique, high-frequency data monitoring systems – Learning Enhanced Watershed Assessment System (LEWAS) at VT and Smart Cities at VU – facilitated the proposed teaching, learning, and research activities.
            </p>
          </div>
          
          {/* Project Impact */}
          <div className="content-text">
            <p>
              <strong>Project Impact:</strong> 8 interdisciplinary courses in computer science, engineering, biology, and environmental science, from sophomore to senior levels, reached about 1300 students over the 3-year project period
            </p>
          </div>
          
          {/* NSF Grants */}
          <div className="content-text">
            <p>
              This project is supported by NSF grants #1029711, #1915487, and #1915268.
            </p>
          </div>
          
          {/* Project Resources Subtitle */}
          <h3 className="section-subtitle">Project&apos;s Resources</h3>
          
          {/* Main Website */}
          <div className="content-text">
            <p>
              The project&apos;s main website where more information about the project as well as its 11 of the 12 data science modules can be found:
            </p>
            <p className="resource-link">
              <a href="https://ds4stem.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                ds4stem.org
              </a>
            </p>
          </div>
          
          {/* 12th Module */}
          <div className="content-text">
            <p>
              The 12th module (named Frequency Analysis in Hydrology) can be found:
            </p>
            <p className="resource-link">
              <a href="https://hydrolearn.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                hydrolearn.org
              </a>
            </p>
          </div>
          
          {/* Project Workshops Subtitle */}
          <h3 className="section-subtitle">Project&apos;s Workshops</h3>
          
          {/* Project Workshops Content */}
          <div className="content-text">
            <p>
              <strong>Workshop 1: NCA&T Workshop</strong>
            </p>
            <p>
              On June 18th, 2025, we hosted a workshop at NCA&T State University featuring six concurrent sessions led by members from our three collaborative universities. The sessions covered civil engineering, environmental science, and engineering statistics. The event drew 12 in-person and 12 virtual attendees from 15 institutions, including eight U.S. states and one foreign country. Participating universities included NCA&T State University, Michigan State University, Purdue University, Wake Technical Community College, Durham Technical Community College, Danville Community College, East Carolina University, Bennett College, the U.S. Coast Guard Academy, California State Polytechnic Humboldt, National University, the Air Force Institute of Technology, Stony Brook University, Morgan State University, and the Lebanese American University.
            </p>
            <p>
              During the workshop, presenters demonstrated their modules and guided participants through hands-on exercises. Attendees were preassigned to seven groups (three in-person, four virtual), each supported by a team mentor. An afternoon session allowed groups to collaborate and develop implementation plans. Seventeen attendees from 10 institutions—including NCA&T, Michigan State, Purdue, Wake Tech, Durham Tech, Danville Community College, ECU, Bennett College, the U.S. Coast Guard Academy, and the Lebanese American University—later presented plans to integrate our modules into their courses. These courses span diverse disciplines such as Crop Ecology, Microbiology, Soil Chemistry, Statistics/Econometrics, Economics, Environmental Science/Engineering, Hydrology, Probability and Statistics, Biostatistics, Data Science, Transportation Engineering, Engineering Design, Systems Engineering, and more. The broad adoption across these courses highlights the project&apos;s significant impact.
            </p>
            <p>
              We conducted a post-workshop survey to gather attendee feedback, receiving responses from 13 participants. The table below summarizes their ratings on three key questions, measured on a 5-point Likert scale (1: Strongly Disagree to 5: Strongly Agree):
            </p>
            
            {/* Survey Results Table */}
            <div className="survey-table-container">
              <table className="survey-table">
                <thead>
                  <tr>
                    <th className="question-header">Question</th>
                    <th className="mean-header">Mean</th>
                    <th className="std-header">Standard Deviation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="question-cell">I plan to incorporate one or more modules (fully or partly) into courses at my institution.</td>
                    <td className="mean-cell">4.79</td>
                    <td className="std-cell">0.43</td>
                  </tr>
                  <tr>
                    <td className="question-cell">The workshop helped me develop ideas for integrating data science into undergraduate courses.</td>
                    <td className="mean-cell">4.57</td>
                    <td className="std-cell">0.65</td>
                  </tr>
                  <tr>
                    <td className="question-cell">Overall, the workshop met my expectations.</td>
                    <td className="mean-cell">4.64</td>
                    <td className="std-cell">0.63</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p>
              Feedback was overwhelmingly positive, with attendees praising the workshop&apos;s organization and impact. Representative comments included: &quot;This should be a 2-3 day workshop,&quot; &quot;I thought the workshop was well organized,&quot; and &quot;Keep holding these workshops.&quot;
            </p>
          </div>
          
          {/* Publications Subtitle */}
          <h3 className="section-subtitle">Project&apos;s Relevant Publications</h3>
          
          {/* Dissertations */}
          <section style={{ width: '100%', marginBottom: '2rem' }}>
            <h4 className="publication-category">Dissertations</h4>
            <div className="space-y-3" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>C. Vatral</span>, &quot;Design and Development of Educational Technology to Support Collaborative Debriefing for Nurse Training,&quot; <span style={{ fontStyle: 'italic' }}>Ph.D. dissertation</span>, Dept. Comput. Sci., Vanderbilt University, Nashville, TN, USA, 2024.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>C. Snyder</span>, &quot;Understanding Students&apos; Collaborative Problem-Solving during STEM+C Learning Using Multimodal Analysis,&quot; <span style={{ fontStyle: 'italic' }}>Ph.D. dissertation</span>, Dept. Comput. Sci., Vanderbilt University, Nashville, TN, USA, 2024.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>Md. Y. Naseri</span>, &quot;Data science for multisectoral water use management and STEM Education: A Synergistic Approach,&quot; <span style={{ fontStyle: 'italic' }}>Ph.D. dissertation</span>, Dept. Civil Eng., Virginia Polytechnic Institute and State Univ., Blacksburg, VA, USA, 2025. (Expected defense: Aug. 25, 2025)
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>H. Workneh</span>, &quot;Physics-guided machine learning for streamflow prediction,&quot; <span style={{ fontStyle: 'italic' }}>Ph.D. dissertation</span>, Dept. Comput. Data Sci. Eng., North Carolina A&T State Univ., Greensboro, NC, USA, 2025.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>M. A. Mollah</span>, &apos;[Title of dissertation should be added],&quot; <span style={{ fontStyle: 'italic' }}>Ph.D. dissertation</span>, Dept. Agricult. Environ. Syst., North Carolina A&T State Univ., Greensboro, NC, USA, 2028. [Partially funded, one semester]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          
          

          {/* Theses */}
          <section style={{ width: '100%', marginBottom: '2rem' }}>
            <h4 className="publication-category">Theses</h4>
            <div className="space-y-3" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>D. Asamen</span>, &quot;Stream stability analysis medium size streambed material D50,&quot; <span style={{ fontStyle: 'italic' }}>M.S. thesis</span>, Dept. Civil, Archit., Environ. Eng., North Carolina A&T State Univ., Greensboro, NC, USA, 2021.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>S. Bhandari</span>, &quot;Land suitability analysis for crop production using geospatial technology: a case study in the three diverse regions of North Carolina,&quot; <span style={{ fontStyle: 'italic' }}>M.S. thesis</span>, Dept. Civil, Archit., Environ. Eng., North Carolina A&T State Univ., Greensboro, NC, USA, 2023.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>S. Roy</span>, &quot;Fate of Amoxycillin in hybrid constructed wetlands,&quot; <span style={{ fontStyle: 'italic' }}>M.S. thesis</span>, Dept. Agricult. Environ. Syst., North Carolina A&T State Univ., Greensboro, NC, USA, 2025.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>F. H. Pernaleta</span>, &quot;Evaluating stress and attention in response to university food pantry outreach using EEG & eye-tracking,&quot; <span style={{ fontStyle: 'italic' }}>M.S. thesis</span>, Dept. Ind. Syst. Eng., North Carolina A&T State Univ., Greensboro, NC, USA, 2026. [Partially funded, one semester]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Conference Presentations */}
          <section style={{ width: '100%', marginBottom: '2rem' }}>
            <h4 className="publication-category">Conference presentations</h4>
            <div className="space-y-3" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>Md. Y. Naseri, V. K. Lohani, M. K. Jha, C. Snyder, and G. Biswas</span>, &quot;Integration of data science modules across interdisciplinary courses at multiple institutions: Analysis of students&apos; and faculty perspectives,&quot; in Proc. 2025 Amer. Soc. Eng. Educ. Annu. Conf., Montreal, Canada, Jun. 22-25, 2025.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>C. Sear, and L. Marston</span>, &quot;Using GPT personas in the classroom to develop holistic solutions to complex environmental challenges,&quot; presented at the Univ. Council Water Resources (UCOWR) Conf., Minneapolis, MN, USA, Jun. 4, 2025.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>D. Varshney, Md. Y. Naseri, A. Kothyari, J. Smith, and V. K. Lohani</span>, &quot;Smart environmental monitoring: An AI-driven approach to watershed data integration and access,&quot; presented at the Research Creative Scholarship Conf., Virginia Tech, Blacksburg, VA, USA, Apr. 25, 2025
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>C. Sear and L. Marston</span>, &quot;Using GPT personas in the classroom to develop holistic solutions to complex environmental challenges,&quot; presented at the Amer. Geophys. Union Fall Meeting, Washington, DC, USA, Dec. 12, 2024.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>Md. Y. Naseri et al.</span>, &quot;Integrating data science into multi-university undergraduate STEM courses: Lessons learned,&quot; presented at the 2024 Frontiers Educ. Conf., Washington, DC, USA, Oct. 13-16, 2024.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>D. Varshney, Md. Y. Naseri, A. Kothyari, and V. K. Lohani</span>, &quot;AI-enhanced teaching assistant: Bridging instructor knowledge and web intelligence,&quot; presented at the Summer Conf. Office Undergraduate Research, Virginia Tech, Blacksburg, VA, USA, Jul. 25, 2024.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>D. Varshney, Md. Y. Naseri, A. Kothyari, and V. K. Lohani</span>, &quot;Development of an AI-assisted chatbot for a water monitoring environment lab,&quot; presented at the Summer Conf. Office Undergraduate Research, Virginia Tech, Blacksburg, VA, USA, Jul. 25, 2024.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>Md. Y. Naseri et al.</span>, &quot;Integrating data science into multi-university undergraduate STEM courses: Lessons learned,&quot; presented at the 2024 IUSE Summit, Washington, DC, USA, Jun. 16-18, 2024.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>Md. Y. Naseri et al.</span>, &quot;A modular approach for integrating data science concepts into multiple undergraduate STEM+C courses,&quot; presented at the 2022 Amer. Soc. Eng. Educ. Annu. Conf., Minneapolis, MN, USA, Jun. 26-29, 2022.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>C. Snyder et al.</span>, &quot;Understanding data science instruction in multiple STEM disciplines,&quot; presented at the 2021 Amer. Soc. Eng. Educ. Annu. Conf., Virtual, Jul. 26-29, 2021.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Conference Papers */}
          <section style={{ width: '100%', marginBottom: '2rem' }}>
            <h4 className="publication-category">Conference papers</h4>
            <div className="space-y-3" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>Md. Y. Naseri, C. Snyder, M. K. Jha, and V. K. Lohani</span>, &quot;Integration of data science modules across interdisciplinary courses at multiple institutions: Analysis of students&apos; and faculty perspectives,&quot; in Proc. 2025 Amer. Soc. Eng. Educ. Annu. Conf., Montreal, Canada, Jun. 22-25, 2025.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>Md. Y. Naseri, C. Snyder, B. Mcloughlin, S. Bhandari, N. Aryal, G. Biswas, E. Henrick, E. R. Hotchkiss, M. K. Jha, S. X. Jiang, E. C. Kern, V. K. Lohani, L. T. Marston, C. P. Vanags, and K. Xia</span>, &quot;A modular approach for integrating data science concepts into multiple undergraduate STEM+C courses,&quot; in Proc. 2022 Amer. Soc. Eng. Educ. Annu. Conf., Minneapolis, MN, USA, Jun. 26-29, 2022. [Online]. Available: <a href="https://peer.asee.org/42010" target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a', marginLeft: '8px', textDecoration: 'none' }}>🔗</a>
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>C. Snyder, D. M. Asamen, Md. Y. Naseri, N. Aryal, G. Biswas, A. Dubey, E. Henrick, E. R. Hotchkiss, M. K. Jha, S. X. Jiang, E. C. Kern, V. K. Lohani, L. T. Marston, C. P. Vanags, and K. Xia</span>, &quot;Understanding data science instruction in multiple STEM disciplines,&quot; in Proc. 2021 Amer. Soc. Eng. Educ. Annu. Conf., Virtual, Jul. 26-29, 2021. [Online]. Available: <a href="https://par.nsf.gov/biblio/10287718" target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a', marginLeft: '8px', textDecoration: 'none' }}>🔗</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Workshops */}
          <section style={{ width: '100%', marginBottom: '2rem' }}>
            <h4 className="publication-category">Workshops</h4>
            <div className="space-y-3" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      &quot;Hybrid NSF/IUSE Workshop 2025: Integrating Data Science into Undergraduate Science and Engineering Courses,&quot; presented at the NSF IUSE Workshop, Martin Eng. Res. Innovation Complex, North Carolina A&T State Univ., Greensboro, NC, USA, Apr. 18, 2025.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      &quot;An Approach to Integrating Data Science into multiple STEM+C undergraduate courses,&quot; presented at the ASEE Workshop 2023, Baltimore Convention Center, Baltimore, MD, USA, Jun. 25, 2023.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      Snyder, C., Henrick, E., Pérez-Rivera K. X., Naseri, M. Y., Workneh H. A., Vanags, C., Biswas, G., Jiang, S., Jha, M., and Xia, K. (2023, June). An Approach to Integrating Data Science into multiple STEM+C undergraduate courses. Workshop in 2023 American Society Engineering Education Annual Meeting
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Journal Articles */}
          <section style={{ width: '100%', marginBottom: '2rem' }}>
            <h4 className="publication-category">Journal articles</h4>
            <div className="space-y-3" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>Md. Y. Naseri et al.</span>, &quot;Integrating data science into undergraduate science and engineering courses through discipline-specific modules: The student perspective,&quot; <span style={{ fontStyle: 'italic' }}>Eur. J. Eng. Educ.</span>, submitted for publication.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <span style={{ fontWeight: '400' }}>Md. Y. Naseri et al.</span>, &quot;Integrating data science into undergraduate science and engineering courses: Lessons learned by instructors in a multiuniversity research-practice partnership,&quot; <span style={{ fontStyle: 'italic' }}>IEEE Trans. Educ.</span>, 2024, doi: <a href="https://doi.org/10.1109/TE.2024.3436041" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', marginLeft: '8px', textDecoration: 'none' }}>🔗</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Other Resources Subtitle */}
          <h3 className="section-subtitle">Other Resources</h3>
          <div className="content-text">
            <div className="space-y-3" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <a href="https://drive.google.com/file/d/19yn-gLATmmxv0LGEzqRaiyKHQpUGqU-i/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>
                        Key Considerations for Data Science Integration
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <a href="https://docs.google.com/document/d/1bGNkQsp1yZXSNCaAIdZfGBtZGUpzF99sy2oiUNb-67I/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>
                        Module Development Tool
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      <a href="https://dstf.acm.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>
                        ACM Data Science Task Force
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <span style={{ color: '#000000', marginRight: '12px', marginTop: '4px', fontSize: '18px', flexShrink: '0' }}>•</span>
                <div style={{ flex: '1', width: '100%' }}>
                  <div style={{ color: '#1f2937', lineHeight: '1.6', width: '100%' }}>
                    <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                      Snyder, C., Henrick, E., Pérez-Rivera K. X., Naseri, M. Y., Workneh H. A., Vanags, C., Biswas, G., Jiang, S., Jha, M., and Xia, K. (2023, June). An Approach to Integrating Data Science into multiple STEM+C undergraduate courses. Workshop in 2023 American Society Engineering Education Annual Meeting
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%', marginLeft: '30px', marginTop: '6px' }}>
                    <span style={{ color: '#000000', marginRight: '10px', marginTop: '3px', fontSize: '14px', flexShrink: '0' }}>•</span>
                    <div style={{ flex: '1', width: '100%' }}>
                      <p style={{ width: '100%', textAlign: 'left', margin: '0' }}>
                        <a href="https://docs.google.com/presentation/d/14fB-3Hl6OcFoadNNH_9jqn9UgmoP-xc6QM5UTgwk_co/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>
                          Workshop Slides
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .nsf-project-content {
          max-width: 90vw;
          width: 90vw;
          min-width: 90vw;
          margin: 0 auto;
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #2c3e50;
          text-align: center;
          margin-top: 3rem;
          margin-bottom: 2rem;
          line-height: 1.4;
        }

        .project-title:first-of-type {
          margin-top: 0;
        }

        .section-subtitle {
          font-size: 1.3rem;
          font-weight: 600;
          color: #34495e;
          text-align: center;
          margin: 2rem 0 1rem 0;
          border-bottom: 2px solid #3498db;
          padding-bottom: 0.5rem;
        }

        .content-text {
          width: 100%;
          max-width: 90vw;
          min-width: 90vw;
          margin: 0 auto 1.5rem;
          text-align: left;
          overflow-wrap: break-word;
          word-wrap: break-word;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        }

        .content-text p {
          font-size: 1.1rem;
          color: #2c3e50;
          line-height: 1.8;
          margin-bottom: 1rem;
          text-align: justify;
          max-width: 90vw;
          min-width: 90vw;
          overflow-wrap: break-word;
          word-wrap: break-word;
        }

        .goals-list {
          list-style-type: disc;
          margin-left: 2rem;
          margin-bottom: 1rem;
        }

        .goals-list li {
          font-size: 1.1rem;
          color: #2c3e50;
          line-height: 1.8;
          margin-bottom: 0.5rem;
          text-align: justify;
        }

        .resource-link {
          text-align: center;
          margin: 1rem 0;
        }

        .resource-link a {
          font-size: 1.2rem;
          font-weight: 500;
        }

        .publication-category {
          font-size: 1.2rem;
          font-weight: 600;
          color: #34495e;
          margin: 1.5rem 0 1rem 0;
          text-align: left;
          width: 100%;
        }

        .publication-list {
          list-style-type: none;
          margin: 0;
          padding: 0;
          width: 100%;
        }

        .publication-list li {
          font-size: 1rem;
          color: #2c3e50;
          line-height: 1.6;
          margin-bottom: 0.8rem;
          text-align: justify;
          padding-left: 0;
        }

        /* Image Section */
        .image-section {
          display: flex;
          justify-content: center;
          margin: 2rem 0;
        }

        .project-image {
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          max-width: 100%;
          height: auto;
        }

        /* Survey Table Styles */
        .survey-table-container {
          width: 100%;
          max-width: 90vw;
          margin: 2rem auto;
          overflow-x: auto;
        }

        .survey-table {
          width: 100%;
          border-collapse: collapse;
          font-family: inherit;
          background-color: white;
        }

        .survey-table thead {
          border-top: 1px solid #333;
          border-bottom: 1px solid #333;
          background-color: white;
        }

        .survey-table th {
          background-color: white;
          color: #2c3e50;
        }

        .survey-table tbody {
          border-bottom: 1px solid #333;
        }

        .survey-table th,
        .survey-table td {
          padding: 12px 16px;
          text-align: left;
          vertical-align: top;
          color: #2c3e50;
        }

        .question-header {
          text-align: left;
          font-weight: 600;
        }

        .mean-header,
        .std-header {
          text-align: center;
          font-weight: 600;
          width: 120px;
        }

        .question-cell {
          text-align: left;
          line-height: 1.4;
        }

        .mean-cell,
        .std-cell {
          text-align: right;
          font-family: inherit;
          width: 120px;
        }

        .survey-table tbody tr:hover {
          background-color: #f8f9fa;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nsf-project-content {
            max-width: 95vw;
            width: 95vw;
            min-width: 95vw;
          }

          .project-title {
            font-size: 1.3rem;
            margin-bottom: 1.5rem;
          }

          .section-subtitle {
            font-size: 1.2rem;
            margin: 1.5rem 0 1rem 0;
          }

          .content-text p {
            font-size: 1rem;
            text-align: left;
          }

          .goals-list li {
            font-size: 1rem;
            text-align: left;
          }

          .project-image {
            width: 100%;
            height: auto;
          }

          .survey-table-container {
            max-width: 95vw;
          }

          .survey-table th,
          .survey-table td {
            padding: 8px 12px;
            font-size: 0.9rem;
          }

          .mean-header,
          .std-header,
          .mean-cell,
          .std-cell {
            width: 80px;
          }
        }
      `}</style>
    </Layout>
  );
}
