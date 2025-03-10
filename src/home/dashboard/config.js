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
        { 
            id: 2, 
            link: "/city/",
            title: "City", 
            image: getImagePrefix("fixtures/c1.png"), 
            detail: "Learn how to navigate your drone in a city using blockly",
            description1: "In the simulator, users take control of a drone, learning essential flight actions such as takeoff, landing, and maneuvering in three-dimensional space. As they explore, children can complete tasks that encourage critical thinking and spatial awareness, all while gaining practical knowledge about drone operation and safety.",
            description2: "The City Drone Simulator not only fosters creativity and curiosity but also introduces children to the principles of aviation and technology in an engaging way. It’s a unique blend of play and education, making learning about drones both enjoyable and accessible. With its user-friendly interface and captivating city environment, this simulator is the perfect platform for young adventurers to take flight!"
        },
        { 
            id: 3, 
            link: "/egypt/",
            title: "Egypt", 
            image: getImagePrefix("fixtures/e1.png"), 
            detail: "Learn how to navigate your drone in a Egypt using blockly",
            description1:"In the simulator, users take control of a drone, learning essential flight actions such as takeoff, landing, and maneuvering in three-dimensional space. As they explore a vibrant Egyptian landscape filled with iconic landmarks like the Pyramids of Giza and the Nile River, children can complete tasks that encourage critical thinking and spatial awareness, all while gaining practical knowledge about drone operation and safety.",
            description2:"The Egypt Drone Simulator not only fosters creativity and curiosity but also introduces children to the principles of aviation and technology in an engaging way. Set against the backdrop of ancient monuments and bustling markets, this simulator provides a unique blend of play and education, making learning about drones both enjoyable and accessible. With its user-friendly interface and captivating Egyptian environment, this simulator is the perfect platform for young adventurers to take flight!"
        },
        { 
            id: 4, 
            link: "/himalayas/",
            title: "Himalayas", 
            image: getImagePrefix("fixtures/m1.png"), 
            detail: "Learn how to navigate your drone in a Himalayas using blockly",
            description1: "In the simulator, users take control of a drone, learning essential flight actions such as takeoff, landing, and maneuvering in three-dimensional space. As they explore majestic mountain ranges with soaring peaks, lush valleys, and winding trails, children can complete tasks that enhance critical thinking and spatial awareness, all while gaining practical knowledge about drone operation and safety.",
            description2: "The Mountain Range Drone Simulator fosters creativity and curiosity by introducing children to the principles of aviation and technology in a breathtaking natural environment. Set against rugged cliffs, scenic rivers, and vast forests, this simulator provides an engaging blend of play and education, making learning about drones both enjoyable and accessible. With its user-friendly interface and stunning mountain landscapes, this simulator is the perfect platform for young adventurers to take flight and discover the thrill of exploration!"
        },
        { 
            id: 5, 
            link: "/slate/",
            title: "Slate", 
            image: getImagePrefix("fixtures/s1.png"), 
            detail: "Learn how to navigate your drone to draw letters using blockly",
            description1:"Unlock your creativity as you learn to navigate your drone and draw letters in this environment using Blockly, a visual programming language designed for all ages! In this engaging activity, you'll explore the fundamentals of drone programming while gaining hands-on experience in controlling your drone's movements.",
        },
        { 
            id: 6, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/education",
            title: "CTE Education", 
            image: getImagePrefix("fixtures/cte_education.png"), 
            detail: "Learn how to navigate your drone",
            description1:"Unlock your creativity as you learn to navigate your drone and draw letters in this environment using Blockly, a visual programming language designed for all ages! In this engaging activity, you'll explore the fundamentals of drone programming while gaining hands-on experience in controlling your drone's movements.",
        },
        { 
            id: 7, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/agriculture",
            title: "CTE Agriculture", 
            image: getImagePrefix("fixtures/cte_agriculture.png"), 
            detail: "Learn how to navigate your drone",
            description1:"Unlock your creativity as you learn to navigate your drone and draw letters in this environment using Blockly, a visual programming language designed for all ages! In this engaging activity, you'll explore the fundamentals of drone programming while gaining hands-on experience in controlling your drone's movements.",
        },
        { 
            id: 8, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/business",
            title: "CTE Business", 
            image: getImagePrefix("fixtures/cte_business.png"), 
            detail: "Learn how to navigate your drone",
            description1:"Unlock your creativity as you learn to navigate your drone and draw letters in this environment using Blockly, a visual programming language designed for all ages! In this engaging activity, you'll explore the fundamentals of drone programming while gaining hands-on experience in controlling your drone's movements.",
        },
        { 
            id: 9, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/communication",
            title: "CTE Communication", 
            image: getImagePrefix("fixtures/cte_communication.png"), 
            detail: "Learn how to navigate your drone",
            description1:"Unlock your creativity as you learn to navigate your drone and draw letters in this environment using Blockly, a visual programming language designed for all ages! In this engaging activity, you'll explore the fundamentals of drone programming while gaining hands-on experience in controlling your drone's movements.",
        },
        { 
            id: 10, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/architecture",
            title: "CTE Architecture", 
            image: getImagePrefix("fixtures/cte_architecture.png"), 
            detail: "Learn how to navigate your drone",
            description1:"Unlock your creativity as you learn to navigate your drone and draw letters in this environment using Blockly, a visual programming language designed for all ages! In this engaging activity, you'll explore the fundamentals of drone programming while gaining hands-on experience in controlling your drone's movements.",
        },
        { 
            id: 11, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/engineering",
            title: "CTE Engineering", 
            image: getImagePrefix("fixtures/cte_engineering.png"), 
            detail: "Learn how to navigate your drone",
            description1:"Unlock your creativity as you learn to navigate your drone and draw letters in this environment using Blockly, a visual programming language designed for all ages! In this engaging activity, you'll explore the fundamentals of drone programming while gaining hands-on experience in controlling your drone's movements.",
        },
        { 
            id: 12, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/healthscience",
            title: "CTE Health Science", 
            image: getImagePrefix("fixtures/cte_healthscience.png"), 
            detail: "Learn how to navigate your drone",
            description1:"Unlock your creativity as you learn to navigate your drone and draw letters in this environment using Blockly, a visual programming language designed for all ages! In this engaging activity, you'll explore the fundamentals of drone programming while gaining hands-on experience in controlling your drone's movements.",
        },
        { 
            id: 13,
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/hospitality",
            title: "CTE Hospitality", 
            image: getImagePrefix("fixtures/cte_hospitality.png"),
            detail: "Learn how to navigate your drone in an Airbnb using blockly",
            description1: "In the simulator, users take control of a drone, learning essential flight actions such as takeoff, landing, and maneuvering in three-dimensional space. As they explore a virtual hotel room—navigating around furniture, hallways, and balconies—they complete tasks that enhance critical thinking and spatial awareness. This hands-on experience provides insights into real-world applications of drone technology in hospitality, such as room inspections, guest services, and security monitoring.",
            description2: "The Hotel Room Drone Simulator fosters creativity and curiosity by introducing users to the role of drones in modern hospitality operations. Set within a realistic hotel suite featuring stylish interiors, cozy lounge areas, and panoramic balcony views, this simulator provides an engaging blend of play and education. With its user-friendly interface and immersive environment, this experience makes learning about drone technology both fun and practical—perfect for future industry professionals and tech enthusiasts looking to explore the evolving role of automation in hotel management!" 
        },
        { 
            id: 11, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/human-services",
            title: "CTE Human Services", 
            image: getImagePrefix("fixtures/cte_humanservices.png"), 
            detail: "Learn how to navigate your drone",
            description1:"Unlock your creativity as you learn to navigate your drone and draw letters in this environment using Blockly, a visual programming language designed for all ages! In this engaging activity, you'll explore the fundamentals of drone programming while gaining hands-on experience in controlling your drone's movements.",
        },
        { 
            id: 12, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/information-technology",
            title: "CTE Information Technology", 
            image: getImagePrefix("fixtures/cte_informationtechnology.png"), 
            detail: "Learn how to navigate your drone",
            description1:"Unlock your creativity as you learn to navigate your drone and draw letters in this environment using Blockly, a visual programming language designed for all ages! In this engaging activity, you'll explore the fundamentals of drone programming while gaining hands-on experience in controlling your drone's movements.",
        },
        { 
            id: 13, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/law",
            title: "CTE Law & Public Services", 
            image: getImagePrefix("fixtures/cte_law.png"), 
            detail: "Learn how to navigate your drone",
            description1:"Unlock your creativity as you learn to navigate your drone and draw letters in this environment using Blockly, a visual programming language designed for all ages! In this engaging activity, you'll explore the fundamentals of drone programming while gaining hands-on experience in controlling your drone's movements.",
        },
        { 
            id: 14, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/manufacturing",
            title: "CTE Manufacturing", 
            image: getImagePrefix("fixtures/cte_manufacturing.png"), 
            detail: "Learn how to navigate your drone",
            description1:"Unlock your creativity as you learn to navigate your drone and draw letters in this environment using Blockly, a visual programming language designed for all ages! In this engaging activity, you'll explore the fundamentals of drone programming while gaining hands-on experience in controlling your drone's movements.",
        },
        { 
            id: 15, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/transportation",
            title: "CTE Transportation", 
            image: getImagePrefix("fixtures/cte_transportation.png"), 
            detail: "Learn how to navigate your drone",
            description1:"Unlock your creativity as you learn to navigate your drone and draw letters in this environment using Blockly, a visual programming language designed for all ages! In this engaging activity, you'll explore the fundamentals of drone programming while gaining hands-on experience in controlling your drone's movements.",
        },
    ]
}






