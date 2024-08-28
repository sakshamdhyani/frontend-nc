import React from 'react';
import './mediaGallery.css';
import FAQ from '../FAQ/FAQ';
import MetaData from '../Layouts/MetaData'; // Import MetaData component

const photos = [
  { src: 'inverter1.png', title: 'Photo 1', description: 'Description for Photo 1' },
  { src: 'inverter2.png', title: 'Photo 2', description: 'Description for Photo 2' },
  { src: 'inverter3.png', title: 'Photo 3', description: 'Description for Photo 3' },
  { src: 'inverter4.png', title: 'Photo 4', description: 'Description for Photo 4' },
  { src: 'inverter5.png', title: 'Photo 5', description: 'Description for Photo 5' },
  { src: 'inverter6.jpeg', title: 'Photo 6', description: 'Description for Photo 6' },
];

const videos = [
  { 
    src: 'https://www.youtube.com/embed/_QuUWvVPKZ4', 
    title: `Bharat के नए Product का Business! Dealer, Distributor, Stockist बनकर कमाएं Rs 1 से 12 लाख महीना!`, 
    description: 'Description for Video 2' 
  },

  { src: 'https://www.youtube.com/embed/wnl7OWBbWR8', title: `Lithium battery inbuilt solar hybrid wall mount lithium inverter
  `, description: 'Description for Video 3' },
  
  { src: 'https://www.youtube.com/embed/vs48iD_p3Fo', title: `इस Business में Dealer- Rs 2 लाख, Distributor- Rs 5 लाख, Stockist की कमाई- Rs 10 लाख हर महाने!!!`, description: 'Description for Video 4' },
  { src: 'https://www.youtube.com/embed/YL6IjVMkFpI', title: `Solar AC vs. Traditional AC: Which One is Better?  `, description: 'Description for Video 5' },
  { src: 'https://www.youtube.com/embed/_h9brCqEfAM', title: `इससे अच्छा सोलर एयरकंडीशनर ,सोलर हाइब्रडिड इन्वर्टर नहीं आता । 5स्टार रेटेड Bee सर्टिफाइड  `, description: 'Description for Video 6' },
  { src: 'https://www.youtube.com/embed/_h9brCqEfAM', title: `इससे अच्छा सोलर एयरकंडीशनर ,सोलर हाइब्रडिड इन्वर्टर नहीं आता । 5स्टार रेटेड Bee सर्टिफाइड  `, description: 'Description for Video 6' },
];


function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + '...';
}



const MediaGallery = () => {

  return (
    <div className="media-gallery">
      <MetaData title="Media Gallery - Moseta" description="Explore photos and videos of Moseta's products. View our gallery of images and videos showcasing our latest products." />

      {/* Auto-play video at the top */}
      <div className="auto-play-video">
        <iframe
          className="full-width-video"
          src="https://www.youtube.com/embed/wnl7OWBbWR8?autoplay=1"
          title="Lithium battery inbuilt solar hybrid wall mount lithium inverter"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {/* <h2>Photo Gallery</h2>
      <div className="gallery">
        {photos.map((item, index) => (
          <div className="gallery-item" key={index}>
            <img src={item.src} alt={item.title} />
            <div className="gallery-item-info">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div> */}
      
      <h2>Video Gallery</h2>
      <div className="gallery">
        {videos.map((item, index) => (
          <div className="gallery-item" key={index}>
            <iframe
              src={`${item.src}?autoplay=0`} // Ensuring these videos don't autoplay
              title={truncateString(item.title , 10)}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="gallery-item-info">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <FAQ />
    </div>
  );
};

export default MediaGallery;




