import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Header from './Header';

const flavorsData = [
  {
    id: 1,
    name: 'CARAMEL DELIGHTFUL',
    description: 'Indulge in the rich, buttery taste of Caramel Delightful, a luxurious ice cream experience. This flavor offers a velvety smooth texture with a perfectly balanced sweetness, topped with swirls of golden caramel. Ideal for those who love a touch of elegance in their dessert, this flavor is perfect for any occasion.',
    image: '/Images/Jenis_GreenMintChip-VolcanoPint-1500px_1100x.webp',
    backgroundColor: '#B9D5C4', // Light mint green
  },
  {
    id: 2,
    name: 'MIDNIGHT SNACKS',
    description: 'Experience the decadence of Midnight Snacks, a rich and creamy chocolate ice cream made for chocolate lovers. This indulgent flavor combines deep, dark chocolate with a smooth, luscious base, offering a perfect treat for any time of the day. It’s an irresistible delight for those who crave a little midnight indulgence.',
    image: '/Images/Jenis_LemonandBlueberriesParfait-VolcanoPint-1500px_1100x.webp',
    backgroundColor: '#CAD0FC', // Soft blue
  },
  {
    id: 3,
    name: 'PISTACHIO DELIGHT',
    description: 'Pistachio Delight is a refreshing and nutty flavor that captures the essence of real pistachios. With a delicate balance of sweetness and the unique taste of roasted pistachios, this flavor offers a creamy and delightful experience. It’s perfect for those who enjoy a sophisticated and refined ice cream experience.',
    image: '/Images/Jenis_MilkiestChocolate-VolcanoPint-1500px_1100x.webp',
    backgroundColor: '#FEFED7', // Creamy yellow
  },
  {
    id: 4,
    name: 'STRAWBERRY FROST',
    description: 'Strawberry Frost is a delightful fusion of fresh, ripe strawberries and a creamy base, creating a perfect summer treat. This flavor boasts a vibrant and fruity taste, with real strawberry pieces that add a refreshing twist. It’s a delightful choice for those who love a fruity and refreshing dessert.',
    image: '/Images/PDP-BrambleberryCrisp-VolPint-1500px_1100x.webp',
    backgroundColor: '#FEC6E8', // Light pink
  },
  {
    id: 5,
    name: 'MINTY FRESH',
    description: 'Minty Fresh combines the cool, refreshing taste of mint with the creamy richness of ice cream. This flavor is infused with natural mint extracts and features delightful chocolate chips for an extra crunch. It’s a perfect choice for those who enjoy a fresh and invigorating ice cream experience.',
    image: '/Images/PDP-CookiesinCream-VolcanoPint-1500px_1100x 15.05.30 copy.jpg',
    backgroundColor: '#C1B0DB', // Lavender
  },
];

const variants = {
  enter: {
    scale: 0.8,
    opacity: 0,
  },
  center: {
    scale: 1,
    opacity: 1,
  },
  exit: {
    scale: 0.8,
    opacity: 0,
  },
};

function App() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [selectedFlavor, setSelectedFlavor] = useState(flavorsData[0]);

  // Function to change the page
  const paginate = (newDirection) => {
    const newPage = (page + newDirection + flavorsData.length) % flavorsData.length;
    setSelectedFlavor(flavorsData[newPage]);
    setPage([newPage, newDirection]);
  };

  // Automatic page change
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1); // Automatically go to the next flavor
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [page]);

  return (
    <div className="App" style={{ backgroundColor: selectedFlavor.backgroundColor }}>
      <Header />
      <div className="content">
        <div className="flavor-details-circle">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={selectedFlavor.id}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.5 }}
              className="flavor-details"
            >
              <motion.h1
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="flavor-name"
              >
                {selectedFlavor.name}
              </motion.h1>
              <motion.p
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="flavor-description"
              >
                {selectedFlavor.description}
              </motion.p>
              <button className="explore-button">Our Flavors</button>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flavor-image-container">
          <img
            src={selectedFlavor.image}
            alt={selectedFlavor.name}
            className="flavor-image"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
