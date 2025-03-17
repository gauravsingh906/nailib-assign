import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, ChevronRight, BookOpen, Clock, Award, RefreshCw, Bookmark } from 'lucide-react';

const VideoCard = ({ thumbnail, title, duration, subject, onClick, isNew }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    if (isHovered) {
      cardRef.current.style.transform = 'scale(1.03) translateY(-8px)';
      cardRef.current.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    } else {
      cardRef.current.style.transform = 'scale(1) translateY(0)';
      cardRef.current.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    }
  }, [isHovered]);
  
  const subjectColors = {
    "Biology": "bg-emerald-500",
    "Math AA": "bg-violet-600",
    "Chemistry": "bg-amber-500",
    "English": "bg-rose-500",
    "Physics": "bg-blue-500",
    "History": "bg-orange-500"
  };
  
  return (
    <div 
      ref={cardRef}
      className="relative rounded-2xl font-[IntegralCF] overflow-hidden bg-white shadow-lg cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative">
        <img src='/images/video/thumbnail.png' alt={title} className="w-full h-52 object-cover" />
        {isNew && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
            NEW
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
          <div className="p-4 text-white w-full">
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium flex items-center">
                <Clock className="w-3 h-3 mr-1" /> {duration}
              </span>
              <span className={`px-3 py-1 ${subjectColors[subject] || "bg-blue-600"} rounded-full text-xs font-medium`}>
                {subject}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 rounded-full p-4 transition-all duration-300 group-hover:scale-110 hover:bg-blue-600">
            <Play className="w-6 h-6 text-blue-600 group-hover:text-white" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-3 leading-tight">{title}</h3>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-blue-600 text-sm font-medium">
            Watch now <ChevronRight className="w-4 h-4 ml-1" />
          </div>
          <button className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="bg-blue-600 rounded-full p-4 transition-all duration-300 transform hover:scale-110">
            <Play className="w-8 h-8 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

const VideoSection = () => {
  const sectionRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const videos = [
    {
      id: 1,
      title: "IB Biology: Cell Theory Explained",
      thumbnail: "/images/video/thumbnail.png",
      duration: "12:45",
      subject: "Biology",
      description: "Master the fundamentals of cell theory with our comprehensive video lecture, designed specifically for IB Biology students.",
      isNew: true,
      views: "2.4k",
      rating: 4.8
    },
    {
      id: 2,
      title: "IB Math AA: Calculus Techniques",
      thumbnail: "/images/video/thumbnail.png",
      duration: "18:20",
      subject: "Math AA",
      description: "Learn advanced calculus techniques for IB Math Analysis and Approaches with step-by-step examples and practice problems.",
      isNew: false,
      views: "1.8k",
      rating: 4.9
    },
    {
      id: 3,
      title: "IB Chemistry: Organic Reactions",
      thumbnail: "/images/video/thumbnail.png",
      duration: "15:10",
      subject: "Chemistry",
      description: "Explore the key organic reactions you need to know for your IB Chemistry examinations with clear animations and explanations.",
      isNew: false,
      views: "3.2k",
      rating: 4.7
    },
    {
      id: 4,
      title: "IB English: Literary Analysis",
      thumbnail: "/images/video/thumbnail.png",
      duration: "14:30",
      subject: "English",
      description: "Develop essential literary analysis skills for IB English Literature and Language & Literature courses.",
      isNew: true,
      views: "1.5k",
      rating: 4.6
    }
  ];

  const filteredVideos = activeTab === 'all' ? videos : videos.filter(video => video.subject.toLowerCase() === activeTab);
  
  useEffect(() => {
    
    if (sectionRef.current) {
    
    }
  }, []);
  
  const handleVideoSelect = (video) => {
    setActiveVideo(video);
    setIsPlaying(true);
  
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  
  };
  
  return (
    <section 
    ref={sectionRef} 
    className="bg-gradient-to-b from-gray-50 to-gray-100 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative font-['Open_Sans']"
  >
    {/* Subtle background elements */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-400 blur-3xl"></div>
      <div className="absolute top-1/2 -right-48 w-96 h-96 rounded-full bg-indigo-400 blur-3xl"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-blue-300 blur-3xl"></div>
    </div>
    
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-12">
        <div className="inline-block mb-3 py-1 px-3 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
          VISUAL LEARNING
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 font-['IntegralCF'] leading-tight relative inline-block">
          <span className="relative z-10">Experience</span>
          <span className="text-blue-600 relative z-10"> Nailib </span>
          <span className="relative z-10">Video Lessons</span>
          <div className="absolute -bottom-3 left-0 right-0 h-3 bg-yellow-300 opacity-50 -rotate-1 z-0"></div>
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-6">
          Dive into our expertly crafted video lessons that transform complex IB concepts
          into engaging visual experiences, making learning both effective and enjoyable.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200">
          {activeVideo ? (
            <div className="relative aspect-video bg-black">
              {/* Video player would be implemented here in production */}
              <img 
                src={activeVideo.thumbnail} 
                alt={activeVideo.title} 
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={togglePlayPause}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 transition-all duration-300 transform hover:scale-110"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <div className="flex items-center text-white/80 text-sm mb-2">
                  <span className={`px-2 py-1 ${activeVideo.subject === "Biology" ? "bg-emerald-500" : activeVideo.subject === "Math AA" ? "bg-violet-600" : activeVideo.subject === "Chemistry" ? "bg-amber-500" : "bg-rose-500"} rounded-full mr-3 text-xs`}>
                    {activeVideo.subject}
                  </span>
                  <span className="flex items-center mr-3"><Clock className="w-3 h-3 mr-1" /> {activeVideo.duration}</span>
                  <span className="flex items-center mr-3"><RefreshCw className="w-3 h-3 mr-1" /> {activeVideo.views} views</span>
                  <span className="flex items-center"><Award className="w-3 h-3 mr-1" /> {activeVideo.rating}</span>
                </div>
                <h3 className="text-white text-xl font-bold mb-2 font-['IntegralCF']">{activeVideo.title}</h3>
                <p className="text-white/80 text-sm">{activeVideo.description}</p>
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 flex items-center justify-center text-white">
              <div className="text-center p-8 max-w-md">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Play className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 font-['IntegralCF']">Discover IB Excellence</h3>
                <p className="text-white/80 mb-6">Select from our curated collection of video lessons crafted by expert IB educators</p>
                <button className="bg-white font-['IntegralCF'] text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                  Browse Videos
                </button>
              </div>
            </div>
          )}
          
          {activeVideo && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    <BookOpen className="w-4 h-4" />
                    <span>Resources</span>
                  </button>
                  <button className="flex items-center space-x-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200">
                    <Bookmark className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  Related videos: {videos.filter(v => v.subject === activeVideo.subject).length - 1}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800 font-['IntegralCF']">Featured Videos</h3>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center"
            >
              <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
            </button>
          </div>
          
          {showFilters && (
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 animate-fadeIn">
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  All Subjects
                </button>
                {['biology', 'math aa', 'chemistry', 'english'].map((subject) => (
                  <button 
                    key={subject}
                    onClick={() => setActiveTab(subject)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${activeTab === subject ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {subject.charAt(0).toUpperCase() + subject.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
            <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {filteredVideos.map((video) => (
                <div 
                  key={video.id}
                  onClick={() => handleVideoSelect(video)}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 
                    ${activeVideo?.id === video.id 
                      ? 'bg-blue-50 border-l-4 border-blue-600' 
                      : 'hover:bg-gray-50 border-l-4 border-transparent'}`}
                >
                  <div className="relative flex-shrink-0">
                    <img src='/images/video/thumbnail.png' alt={video.title} className="w-28 h-20 object-cover rounded-md" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`${activeVideo?.id === video.id ? 'bg-blue-600' : 'bg-black/50'} rounded-full p-2 transition-colors duration-200`}>
                        <Play className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    {video.isNew && (
                      <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded-sm">
                        NEW
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate leading-tight font-['IntegralCF']">{video.title}</h4>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500 flex items-center"><Clock className="w-3 h-3 mr-1" />{video.duration}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-sm ${
                        video.subject === "Biology" ? "bg-emerald-100 text-emerald-700" :
                        video.subject === "Math AA" ? "bg-violet-100 text-violet-700" :
                        video.subject === "Chemistry" ? "bg-amber-100 text-amber-700" :
                        "bg-rose-100 text-rose-700"
                      }`}>{video.subject}</span>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span className="flex items-center"><RefreshCw className="w-3 h-3 mr-1" />{video.views} views</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="flex items-center"><Award className="w-3 h-3 mr-1" />{video.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 bg-blue-200 rounded-full opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 -mb-6 -ml-6 bg-indigo-200 rounded-full opacity-50"></div>
            
            <h3 className="text-lg font-bold text-gray-800 mb-3 font-['IntegralCF'] relative z-10">Why Nailib Videos?</h3>
            <ul className="space-y-3 relative z-10">
              <li className="flex items-start bg-white/80 p-2 rounded-lg shadow-sm">
                <div className="flex-shrink-0 mt-[1rem] h-5 w-5 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-2 text-sm text-gray-600">Created by experienced IB examiners and educators</p>
              </li>
              <li className="flex items-start bg-white/80 p-2 rounded-lg shadow-sm">
                <div className="flex-shrink-0 mt-[1rem] h-5 w-5 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-2 text-sm text-gray-600">Perfectly aligned with the latest IB curriculum requirements</p>
              </li>
              <li className="flex items-start bg-white/80 p-2 rounded-lg shadow-sm">
                <div className="flex-shrink-0 mt-[1rem] h-5 w-5 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-2 text-sm text-gray-600">Visual animations that break down complex concepts</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 font-['IntegralCF']">Browse by Subject</h3>
          <div className="hidden sm:flex items-center space-x-2">
            <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center underline underline-offset-2">
              View All
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <VideoCard 
              key={video.id}
              thumbnail={video.thumbnail}
              title={video.title}
              duration={video.duration}
              subject={video.subject}
              isNew={video.isNew}
              onClick={() => handleVideoSelect(video)}
            />
          ))}
        </div>
        
        <div className="relative mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold mb-2 font-['IntegralCF']">Ready to elevate your IB scores?</h3>
              <p className="text-white/80 max-w-md">Get unlimited access to our entire video library and supplementary learning resources.</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-['IntegralCF']">
                Start Free Trial
              </button>
              <button className="bg-blue-800/30 text-white hover:bg-blue-800/50 font-bold py-3 px-6 rounded-lg transition-all duration-300 font-['IntegralCF']">
                View Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default VideoSection;