import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, ChevronRight } from 'lucide-react';

const VideoCard = ({ thumbnail, title, duration, subject, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    if (isHovered) {
      cardRef.current.style.transform = 'scale(1.05)';
      cardRef.current.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    } else {
      cardRef.current.style.transform = 'scale(1)';
      cardRef.current.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    }
  }, [isHovered]);
  
  return (
    <div 
      ref={cardRef}
      className="relative rounded-xl overflow-hidden bg-white shadow-lg cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative">
        <img src='/images/video/thumbnail.png' alt={title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4 text-white">
            <span className="px-2 py-1 bg-blue-600 rounded-md text-xs font-medium">{duration}</span>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`bg-white/90 rounded-full p-3 transition-all duration-300 ${isHovered ? 'scale-110 bg-blue-600' : ''}`}>
            <Play className={`w-6 h-6 ${isHovered ? 'text-white' : 'text-blue-600'}`} />
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-gray-800/80 text-white rounded-md text-xs font-medium">{subject}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
        <div className="flex items-center text-blue-600 text-sm font-medium">
          Watch now <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  );
};

const VideoSection = () => {
  const sectionRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const videos = [
    {
      id: 1,
      title: "IB Biology: Cell Theory Explained",
      thumbnail: "/images/video/thumbnail.png",
      duration: "12:45",
      subject: "Biology",
      description: "Master the fundamentals of cell theory with our comprehensive video lecture, designed specifically for IB Biology students."
    },
    {
      id: 2,
      title: "IB Math AA: Calculus Techniques",
      thumbnail: "/images/video/thumbnail.png",
      duration: "18:20",
      subject: "Math AA",
      description: "Learn advanced calculus techniques for IB Math Analysis and Approaches with step-by-step examples and practice problems."
    },
    {
      id: 3,
      title: "IB Chemistry: Organic Reactions",
      thumbnail: "/images/video/thumbnail.png",
      duration: "15:10",
      subject: "Chemistry",
      description: "Explore the key organic reactions you need to know for your IB Chemistry examinations with clear animations and explanations."
    },
    {
      id: 4,
      title: "IB English: Literary Analysis",
      thumbnail: "/images/video/thumbnail.png",
      duration: "14:30",
      subject: "English",
      description: "Develop essential literary analysis skills for IB English Literature and Language & Literature courses."
    }
  ];
  
  useEffect(() => {
    // GSAP animation would be implemented here in production
    if (sectionRef.current) {
      // Animation for section entry
    }
  }, []);
  
  const handleVideoSelect = (video) => {
    setActiveVideo(video);
    setIsPlaying(true);
    // In production, this would trigger the video to play
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In production, this would control the video playback
  };
  
  return (
    <section ref={sectionRef} className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-['IntegralCF']">
            Learn Visually with <span className="text-blue-600">Nailib Videos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-['OpenSans']">
            Our video resources break down complex IB topics into easy-to-understand visual lessons, 
            helping you grasp difficult concepts faster and more effectively.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            {activeVideo ? (
              <div className="relative aspect-video bg-black">
                {/* Video player would be implemented here in production */}
                <img 
                  src={activeVideo.thumbnail} 
                  alt={activeVideo.title} 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={togglePlayPause}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 transition-all duration-300"
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{activeVideo.title}</h3>
                  <p className="text-white/80">{activeVideo.description}</p>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                <div className="text-center p-8">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-75" />
                  <h3 className="text-2xl font-bold mb-2">Select a Video</h3>
                  <p>Choose from our selection of IB-focused video lessons</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4 font-['IntegralCF']">Featured Videos</h3>
            <div className="bg-white p-4 rounded-xl">
              <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto pr-2">
                {videos.map((video) => (
                  <div 
                    key={video.id}
                    onClick={() => handleVideoSelect(video)}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${activeVideo?.id === video.id ? 'bg-blue-50 border-l-4 border-blue-600' : 'hover:bg-gray-50'}`}
                  >
                    <div className="relative flex-shrink-0">
                      <img src='/images/video/thumbnail.png' alt={video.title} className="w-24 h-16 object-cover rounded-md" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-1">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">{video.title}</h4>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">{video.duration}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{video.subject}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <h3 className="text-lg font-bold text-gray-800 mb-2 font-['IntegralCF']">Why Nailib Videos?</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-600">Created by experienced IB teachers</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-600">Aligned with the latest IB curriculum</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-600">Visual explanations of complex concepts</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-800 mb-6 font-['IntegralCF']">Browse by Subject</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard 
                key={video.id}
                thumbnail={video.thumbnail}
                title={video.title}
                duration={video.duration}
                subject={video.subject}
                onClick={() => handleVideoSelect(video)}
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 font-['OpenSans']">
              Browse All Videos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;