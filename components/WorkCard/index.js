import React, { useState, useEffect, useRef } from "react";

const WorkCard = ({ project, onClick }) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const hasMultipleImages = Array.isArray(project.images) && project.images.length > 1;

  const nextImage = (e) => {
    e.stopPropagation();
    setUserInteracted(true);
    setIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setUserInteracted(true);
    setIndex((prev) =>
      prev - 1 < 0 ? project.images.length - 1 : prev - 1
    );
  };

  const currentImage = hasMultipleImages
    ? project.images[index]
    : project.imageSrc;

  // AUTO-ADVANCE (only when not hovered and no manual clicks yet)
 useEffect(() => {
  if (!hasMultipleImages) return;
  if (isHovered) return;
  if (userInteracted) return;

  // Do not autoplay if the current image is a GIF
  const isGif = project.images[index]?.toLowerCase().endsWith(".gif");
  if (isGif) return;

  const id = setInterval(() => {
    setIndex((prev) => (prev + 1) % project.images.length);
  }, 2500);

  return () => clearInterval(id);
}, [isHovered, userInteracted, hasMultipleImages, index, project.images]);


  return (
    <div
      className="overflow-hidden rounded-lg p-2 laptop:p-4 first:ml-0 link"
      onClick={onClick}
    >
      <div
        className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 h-48 mob:h-auto"
        style={{ height: "600px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* LEFT ARROW */}
        {hasMultipleImages && (
          <button
            className="left-arrow absolute top-1/2 -translate-y-1/2 left-3 z-20 bg-black/40 text-white text-3xl px-3 py-1 rounded-md hover:bg-black/60 transition"
            onClick={prevImage}
          >
            ‹
          </button>
        )}

        {/* IMAGE */}
        <img
          alt={project.title}
          className="h-full w-full object-cover hover:scale-110 transition-all ease-out duration-300"
          src={currentImage}
        />

        {/* RIGHT ARROW */}
        {hasMultipleImages && (
          <button
            className="right-arrow absolute top-1/2 -translate-y-1/2 right-3 z-20 bg-black/40 text-white text-3xl px-3 py-1 rounded-md hover:bg-black/60 transition"
            onClick={nextImage}
          >
            ›
          </button>
        )}
      </div>

      <h1 className="mt-5 text-3xl font-medium">
        {project.title ?? "Project Name"}
      </h1>
      <h2 className="text-xl opacity-50">
        {project.description ?? "Description"}
      </h2>
    </div>
  );
};

export default WorkCard;
