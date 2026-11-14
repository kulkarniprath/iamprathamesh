const cursor=document.querySelector('.cursor');
document.addEventListener('mousemove',e=>{if(cursor){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';}});
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const el=document.querySelector(a.getAttribute('href'));
    if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'});}
  });
});
document.getElementById('year').textContent=new Date().getFullYear();


// Project case studies: edit the text and file names here when adding your own work.
const projectDetails = {
  social: {
    category: "GRAPHIC DESIGN",
    title: "Social Media Design",
    description: "A collection of social media creatives and promotional campaign designs. Add a short brief explaining the audience, objective and design approach for each real project.",
    role: "Graphic design, layout and visual direction",
    tools: "Photoshop · Illustrator",
    images: ["images/WhatsApp Image 2025-07-14 at 5.50.21 PM.jpeg", "images/social-media-02.jpg", "images/social-media-03.jpg"]
  },
  branding: {
    category: "BRAND IDENTITY",
    title: "Logo & Branding",
    description: "Show the logo, alternate versions, colour palette, typography and real-world applications. Explain the identity problem and the solution.",
    role: "Logo design and brand identity",
    tools: "Illustrator · Photoshop",
    images: ["images/branding-01.jpg", "images/branding-02.jpg", "images/branding-03.jpg"]
  },
  youtube: {
    category: "DIGITAL DESIGN",
    title: "YouTube Thumbnails",
    description: "A selection of YouTube thumbnail designs. Add a note about the content topic and how the composition, typography and image treatment support the video.",
    role: "Thumbnail design and image compositing",
    tools: "Photoshop",
    images: ["images/youtube-thumbnail-01.jpg", "images/youtube-thumbnail-02.jpg", "images/youtube-thumbnail-03.jpg"]
  },
  video: {
    category: "VIDEO EDITING",
    title: "Video Editing",
    description: "Present a finished video and a few supporting frames. Include the format, intended platform and the parts you personally handled.",
    role: "Editing, pacing, sound and delivery",
    tools: "Premiere Pro",
    images: ["images/video-editing-01.jpg", "images/video-editing-02.jpg"],
    video: "videos/video-editing-showreel.mp4"
  },
  motion: {
    category: "MOTION GRAPHICS",
    title: "Motion Graphics",
    description: "Show title animation, transitions, animated graphic elements or short explainers. Add a short explanation of the animation objective.",
    role: "Motion design and animation",
    tools: "After Effects · Premiere Pro",
    images: ["images/motion-graphics-01.jpg", "images/motion-graphics-02.jpg"],
    video: "videos/motion-graphics-showreel.mp4"
  },
  editorial: {
    category: "EDITORIAL DESIGN",
    title: "Book & Print Design",
    description: "Show the cover, back cover, selected inside pages and print layout details. Explain the intended readership and visual concept.",
    role: "Cover design and page layout",
    tools: "Photoshop · Illustrator",
    images: ["images/book-cover-01.jpg", "images/book-cover-02.jpg", "images/book-cover-03.jpg"]
  }
};

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card[data-project]");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const projectDialog = document.getElementById("projectDialog");
if (projectDialog) {
  const closeButton = projectDialog.querySelector(".dialog-close");
  const gallery = document.getElementById("dialogGallery");
  const video = document.getElementById("dialogVideo");
  const videoWrap = document.getElementById("dialogVideoWrap");

  projectCards.forEach(card => {
    card.addEventListener("click", () => {
      const project = projectDetails[card.dataset.project];
      if (!project) return;

      document.getElementById("dialogCategory").textContent = project.category;
      document.getElementById("dialogTitle").textContent = project.title;
      document.getElementById("dialogDescription").textContent = project.description;
      document.getElementById("dialogRole").textContent = project.role;
      document.getElementById("dialogTools").textContent = project.tools;

      gallery.replaceChildren();
      project.images.forEach((src, index) => {
        const image = document.createElement("img");
        image.src = src;
        image.alt = `${project.title} — image ${index + 1}`;
        image.loading = "lazy";
        image.addEventListener("error", () => image.remove());
        gallery.appendChild(image);
      });

      if (project.video) {
        video.src = project.video;
        videoWrap.hidden = false;
      } else {
        video.pause();
        video.removeAttribute("src");
        video.load();
        videoWrap.hidden = true;
      }
      projectDialog.showModal();
    });
  });

  closeButton.addEventListener("click", () => projectDialog.close());
  projectDialog.addEventListener("click", event => {
    if (event.target === projectDialog) projectDialog.close();
  });
  projectDialog.addEventListener("close", () => {
    video.pause();
  });
}


// Hide a thumbnail gracefully until its real portfolio image has been added.
document.querySelectorAll(".project-card img").forEach(image => {
  image.addEventListener("error", () => {
    image.hidden = true;
  });
});
