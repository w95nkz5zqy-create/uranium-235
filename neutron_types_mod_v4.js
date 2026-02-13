// Neutron Types Mod v4 - Exact Copy of Normal Neutron Behavior

(function() {
    if (typeof elements === 'undefined' || !elements.neutron) {
        console.error('Neutron element not found');
        return;
    }
    
    console.log('Neutron Types mod v4 loading...');
    console.log('Normal neutron behavior:', elements.neutron.behavior);
    
    // Fast Neutron - EXACT copy of normal neutron
    elements.fast_neutron = {
        color: "#ffff00",
        behavior: JSON.parse(JSON.stringify(elements.neutron.behavior)), // Copy exact behavior
        reactions: JSON.parse(JSON.stringify(elements.neutron.reactions || {})),
        category: "energy",
        state: "gas",
        density: 0,
        temp: 20
    };
    
    console.log('Fast neutron behavior:', elements.fast_neutron.behavior);
    
    // Slow Neutron - Same as normal but with %50 instead of %10
    elements.slow_neutron = {
        color: "#ff9900",
        behavior: [
            "XX|M2%50|XX",
            "M2%50|XX|M2%50",
            "XX|M2%50|XX",
        ],
        reactions: JSON.parse(JSON.stringify(elements.neutron.reactions || {})),
        category: "energy",
        state: "gas",
        density: 0,
        temp: 20
    };
    
    console.log('Slow neutron behavior:', elements.slow_neutron.behavior);
    
    // Moderator - light grey
    elements.moderator = {
        color: ["#d3d3d3", "#c8c8c8", "#dedede", "#c0c0c0"],
        behavior: behaviors.WALL,
        reactions: {
            "neutron": { "elem1": "moderator", "elem2": "slow_neutron", "chance": 0.7 },
            "fast_neutron": { "elem1": "moderator", "elem2": "slow_neutron", "chance": 0.7 }
        },
        category: "solids",
        state: "solid",
        density: 1850,
        hardness: 0.6,
        temp: 20,
        tempHigh: 3000,
        stateHigh: "molten_moderator"
    };
    
    elements.molten_moderator = {
        color: ["#ff6600", "#ff7700", "#ff5500"],
        behavior: behaviors.MOLTEN,
        category: "solids",
        state: "liquid",
        density: 1700,
        temp: 3100,
        tempLow: 3000,
        stateLow: "moderator"
    };
    
    console.log('Neutron Types v4 loaded successfully!');
})();
