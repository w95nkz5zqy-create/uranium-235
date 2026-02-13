// Neutron Types Mod v2 - Fixed

if (typeof elements === 'undefined') {
    console.error('Elements not loaded');
} else {
    console.log('Neutron Types mod loading...');
    
    // Slow Neutron - orange, moves slower
    elements.slow_neutron = {
        color: "#ff9900",
        behavior: [
            "XX|M2%50|XX",
            "M2%50|XX|M2%50",
            "XX|M2%50|XX",
        ],
        category: "energy",
        state: "gas",
        temp: 20
    };
    
    // Fast Neutron - yellow, moves like normal neutron
    elements.fast_neutron = {
        color: "#ffff00",
        behavior: [
            "XX|M2%10|XX",
            "M2%10|XX|M2%10",
            "XX|M2%10|XX",
        ],
        category: "energy",
        state: "gas",
        temp: 20
    };
    
    // Moderator - light grey
    elements.moderator = {
        color: ["#d3d3d3", "#c8c8c8", "#dedede"],
        behavior: behaviors.WALL,
        reactions: {
            "neutron": { "elem1": "moderator", "elem2": "slow_neutron", "chance": 0.7 },
            "fast_neutron": { "elem1": "moderator", "elem2": "slow_neutron", "chance": 0.7 }
        },
        category: "solids",
        state: "solid",
        density: 1850,
        temp: 20,
        tempHigh: 3000,
        stateHigh: "molten_moderator"
    };
    
    elements.molten_moderator = {
        color: "#ff6600",
        behavior: behaviors.MOLTEN,
        category: "solids",
        state: "liquid",
        density: 1700,
        temp: 3100,
        tempLow: 3000,
        stateLow: "moderator"
    };
    
    console.log('Neutron Types loaded: slow_neutron, fast_neutron, moderator');
}
