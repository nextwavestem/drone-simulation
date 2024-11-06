export const getImagePrefix = (image) => {
    if (window.location.hostname.includes('localhost')) {
      return 'assets/' + image;
    }

    return '/drone-simulation/assets/' + image;
};

export const projects = () => {
    return [
        { 
            id: 1, 
            link: "/space/",
            title: "Space Simulator", 
            image: getImagePrefix("fixtures/solar_system.jpg"), 
            detail: "Learn how to navigate your drone in space using blockly",
            description1: "Experience the thrill of space exploration with our Drone Simulator! This innovative platform allows you to control a virtual drone using intuitive Blockly code, making programming accessible and fun. Navigate through a stunning 3D environment, discovering planets, moons, and the International Space Station (ISS).",
            description2: "With realistic flight physics and an engaging user interface, our simulator invites users of all ages to embark on exciting missions. Explore the cosmos, learn about space navigation, and unleash your creativity as you chart your course through the stars. Join us in launching this extraordinary journey into space!"
        },
        // { 
        //     id: 2, 
        //     link: "/city/",
        //     title: "City", 
        //     image: getImagePrefix("fixtures/city_2.png"), 
        //     detail: "Learn how to navigate your drone in a city using blockly",
        //     description1: "In the simulator, users take control of a drone, learning essential flight actions such as takeoff, landing, and maneuvering in three-dimensional space. As they explore, children can complete tasks that encourage critical thinking and spatial awareness, all while gaining practical knowledge about drone operation and safety.",
        //     description2: "The City Drone Simulator not only fosters creativity and curiosity but also introduces children to the principles of aviation and technology in an engaging way. It’s a unique blend of play and education, making learning about drones both enjoyable and accessible. With its user-friendly interface and captivating city environment, this simulator is the perfect platform for young adventurers to take flight!"
        // },
        // { 
        //     id: 3, 
        //     link: "/egypt/",
        //     title: "Egypt", 
        //     image: getImagePrefix("fixtures/egypt.jpg"), 
        //     detail: "Learn how to navigate your drone in a Egypt using blockly",
        //     description1:"In the simulator, users take control of a drone, learning essential flight actions such as takeoff, landing, and maneuvering in three-dimensional space. As they explore a vibrant Egyptian landscape filled with iconic landmarks like the Pyramids of Giza and the Nile River, children can complete tasks that encourage critical thinking and spatial awareness, all while gaining practical knowledge about drone operation and safety.",
        //     description2:"The Egypt Drone Simulator not only fosters creativity and curiosity but also introduces children to the principles of aviation and technology in an engaging way. Set against the backdrop of ancient monuments and bustling markets, this simulator provides a unique blend of play and education, making learning about drones both enjoyable and accessible. With its user-friendly interface and captivating Egyptian environment, this simulator is the perfect platform for young adventurers to take flight!"
        // },
        // { 
        //     id: 4, 
        //     link: "/himalayas/",
        //     title: "Himalayas", 
        //     image: getImagePrefix("fixtures/himalayas.jpg"), 
        //     detail: "Learn how to navigate your drone in a Himalayas using blockly",
        //     description1:"In the simulator, users take control of a drone, learning essential flight actions such as takeoff, landing, and maneuvering in three-dimensional space. As they explore a vibrant Egyptian landscape filled with iconic landmarks like the Pyramids of Giza and the Nile River, children can complete tasks that encourage critical thinking and spatial awareness, all while gaining practical knowledge about drone operation and safety.",
        //     description2:"The Egypt Drone Simulator not only fosters creativity and curiosity but also introduces children to the principles of aviation and technology in an engaging way. Set against the backdrop of ancient monuments and bustling markets, this simulator provides a unique blend of play and education, making learning about drones both enjoyable and accessible. With its user-friendly interface and captivating Egyptian environment, this simulator is the perfect platform for young adventurers to take flight!"
        // },
        { 
            id: 5, 
            link: "/slate/",
            title: "Slate", 
            image: getImagePrefix("fixtures/slate.jpg"), 
            detail: "Learn how to navigate your drone to draw letters using blockly",
            description1:"Unlock your creativity as you learn to navigate your drone and draw letters in this environment using Blockly, a visual programming language designed for all ages! In this engaging activity, you'll explore the fundamentals of drone programming while gaining hands-on experience in controlling your drone's movements.",
        },
    ]
}






