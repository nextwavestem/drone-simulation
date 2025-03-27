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
            description1:"In this simulator, students program and pilot a drone to assist with everyday classroom tasks. The drone navigates around desks and the instructor’s area to deliver test papers, collect homework, assist with lost and found items, take attendance, and help with clean-up. This interactive experience builds problem-solving, spatial awareness, and basic programming skills using Blockly. By simulating real-world classroom scenarios, learners explore how drones can enhance organization and efficiency in educational settings, making the experience both educational and engaging.",
        },
        { 
            id: 7, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/agriculture",
            title: "CTE Agriculture", 
            image: getImagePrefix("fixtures/cte_agriculture.png"), 
            detail: "Learn how to navigate your drone",
            description1:"In this simulator, students program and control a drone to manage tasks in a virtual sunflower field. They’ll spray water, deliver pesticides from the barn, fly around to mimic a scarecrow, and monitor crops for diseases using zoom functions. The drone also assists with pollination and field mapping for crop monitoring. This engaging experience teaches problem-solving, spatial skills, and basic programming with Blockly while introducing real-world agricultural practices. Students learn how drones support modern farming, promoting efficiency and crop health in a fun, interactive way.",
        },
        { 
            id: 8, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/business",
            title: "CTE Business and Marketing", 
            image: getImagePrefix("fixtures/cte_business.png"), 
            detail: "Learn how to navigate your drone",
            description1:"In this simulator, students program and pilot a drone to explore business and marketing tasks. They’ll fly drones carrying banners for aerial advertisements and simulate logistics operations, including secure cash transfers. This hands-on experience develops problem-solving, spatial awareness, and basic programming skills using Blockly. Learners gain insights into how drones are revolutionizing marketing strategies and logistics in modern business, making the activity both educational and engaging.",
        },
        { 
            id: 9, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/communication",
            title: "CTE Communication", 
            image: getImagePrefix("fixtures/cte_communication.png"), 
            detail: "Learn how to navigate your drone",
            description1:"In this imaginative simulator, students transform drones into tools for artistic expression and communication. They’ll program drones to perform synchronized aerial shows, creating dynamic patterns in the sky. Additionally, they can guide drones to craft letters, shapes, and figures, blending art with technology. This creative experience encourages innovation, spatial thinking, and basic Blockly programming skills. It introduces learners to how drones can be used in artistic performances and visual storytelling, inspiring them to explore new ways of combining technology and creativity.",
        },
        { 
            id: 10, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/architecture",
            title: "CTE Architecture", 
            image: getImagePrefix("fixtures/cte_architecture.png"), 
            detail: "Learn how to navigate your drone",
            description1:"In this simulator, students navigate a drone through the historic Hallwyl Museum, exploring its intricate architecture and exhibits. They’ll program the drone to guide virtual tourists to specific spots, patrol the museum for security, and conduct interactive tours of different areas. This experience enhances spatial awareness, problem-solving, and Blockly programming skills while offering insights into how drones can assist in preserving and showcasing architectural landmarks. It’s an engaging way for learners to appreciate architectural beauty while discovering the practical uses of drone technology in cultural spaces.",
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
            description1: "In this simulator, students pilot a drone to conduct a virtual room inspection in a recently vacated hotel suite. They’ll navigate around furniture, check for cleanliness, and ensure safety standards are met. This activity encourages spatial awareness, critical thinking, and basic drone programming skills using Blockly. By exploring real-world hospitality tasks, learners gain insight into how drones assist with housekeeping, inspections, and safety checks. The immersive environment makes learning fun and practical, fostering curiosity about drone technology and its role in modern hospitality services."
        },
        { 
            id: 12, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/information-technology",
            title: "CTE Information Technology", 
            image: getImagePrefix("fixtures/cte_informationtechnology.png"), 
            detail: "Learn how to navigate your drone",
            description1:"In this simulator, students program and pilot a drone within a virtual office setting filled with desks and desktops. The drone assists with helpdesk support by identifying and addressing tech issues, ensures cybersecurity by monitoring for potential threats, delivers equipment across workstations, and oversees office activities for efficient operations. This hands-on experience develops problem-solving, critical thinking, and Blockly programming skills while demonstrating how drones can enhance IT support and security. It’s an engaging way for learners to explore real-world tech solutions in modern office environments.",
        },
        { 
            id: 13, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/law",
            title: "CTE Law & Public Services", 
            image: getImagePrefix("fixtures/cte_law.png"), 
            detail: "Learn how to navigate your drone",
            description1:"In this simulator, students pilot a drone through a virtual city, learning about law enforcement and traffic safety. The drone monitors for traffic violations like running red lights, oversees pedestrian safety, and assists in identifying parking violations. It can also help in crowd monitoring and ensuring public spaces follow local regulations. This interactive experience fosters critical thinking, problem-solving, and Blockly programming skills while teaching the importance of law and order in urban settings. Students gain insights into how drones support city safety and legal enforcement in a fun, educational way.",
        },
        { 
            id: 14, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/manufacturing",
            title: "CTE Manufacturing", 
            image: getImagePrefix("fixtures/cte_manufacturing.png"), 
            detail: "Learn how to navigate your drone",
            description1:"In this simulator, students navigate a drone inside a virtual boat manufacturing shed, assisting with key industrial tasks. They’ll program the drone to conduct inspections for quality control, manage inventory by locating materials, and assist in finding misplaced tools or parts. This hands-on experience builds problem-solving, spatial awareness, and Blockly programming skills while introducing learners to real-world applications of drones in manufacturing. It highlights how drones enhance efficiency, safety, and organization in industrial settings, making learning both practical and engaging.",
        },
        { 
            id: 15, 
            soon: true,
            url: "https://nextwavestem.github.io/drone-simulation-cte-alpha/#/transportation",
            title: "CTE Transportation", 
            image: getImagePrefix("fixtures/cte_transportation.png"), 
            detail: "Learn how to navigate your drone",
            description1:"In this simulator, students program and pilot a drone to explore transportation solutions in a busy city. Tasks include monitoring traffic flow, delivering small packages, reporting traffic accidents, and assisting in locating available parking spaces. This interactive experience builds problem-solving, spatial awareness, and Blockly programming skills while demonstrating how drones enhance urban mobility and logistics. Students gain valuable insights into innovative drone applications, making the learning experience dynamic and relevant to real-world transportation challenges.",
        },
    ]
}






