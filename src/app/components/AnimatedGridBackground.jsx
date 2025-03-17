import React, { useEffect, useRef } from 'react';

const AnimatedGridBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let gridPoints = [];
    
    
    const handleResize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      
      
      generateGridPoints();
    };
    
    
    const generateGridPoints = () => {
      gridPoints = [];
      const spacing = 40; 
      
      
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          gridPoints.push({
            x: x,
            y: y,
            originalX: x,
            originalY: y,
            size: Math.random() * 1.5 + 0.5, 
            color: `rgba(220, 220, 250, ${Math.random() * 0.4 + 0.1})`, 
            speedX: Math.random() * 0.2 - 0.1,
            speedY: Math.random() * 0.2 - 0.1,
            amplitude: Math.random() * 8 + 2,
            angle: Math.random() * Math.PI * 2,
            angleSpeed: Math.random() * 0.01 + 0.005
          });
        }
      }
    };
    
    
    const drawConnections = (point, points) => {
      const maxDistance = 80; 
      
      points.forEach(otherPoint => {
        const dx = point.x - otherPoint.x;
        const dy = point.y - otherPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0 && distance < maxDistance) {
          
          const opacity = 1 - (distance / maxDistance);
          ctx.strokeStyle = `rgba(210, 210, 240, ${opacity * 0.2})`;
          ctx.lineWidth = 0.5;
          
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(otherPoint.x, otherPoint.y);
          ctx.stroke();
        }
      });
    };
    
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      
      gridPoints.forEach(point => {
        
        point.angle += point.angleSpeed;
        
        
        point.x = point.originalX + Math.sin(point.angle) * point.amplitude;
        point.y = point.originalY + Math.cos(point.angle) * point.amplitude;
        
        
        ctx.beginPath();
        ctx.fillStyle = point.color;
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fill();
        
        
        drawConnections(point, gridPoints);
      });
      
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    
    window.addEventListener('resize', handleResize);
    handleResize();
    animate();
    
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        opacity: 0.8,
        willChange: 'transform'
      }}
    />
  );
};

export default AnimatedGridBackground;