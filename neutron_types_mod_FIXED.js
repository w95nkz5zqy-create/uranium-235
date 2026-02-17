// Neutron Types - CORRECT VERSION - Neutrons that fly like they should!

(function() {
    console.log('Loading CORRECT neutron types...');
    
    // Wait for elements to exist
    var checkReady = setInterval(function() {
        if (typeof elements !== 'undefined' && elements.neutron) {
            clearInterval(checkReady);
            loadNeutrons();
        }
    }, 100);
    
    function loadNeutrons() {
        console.log('Original neutron behavior:', elements.neutron.behavior);
        
        // FAST NEUTRON - Exact copy of normal neutron behavior
        elements.fast_neutron = {
            color: "#ffff00",
            behavior: [
                "XX|M2%10|XX",
                "M2%10|XX|M2%10",
                "XX|M2%10|XX"
            ],
            category: "energy",
            state: "gas",
            density: 0,
            temp: 20
        };
        
        // SLOW NEUTRON - Same pattern but slower (50% instead of 10%)
        elements.slow_neutron = {
            color: "#ff9900",
            behavior: [
                "XX|M2%50|XX",
                "M2%50|XX|M2%50",
                "XX|M2%50|XX"
            ],
            category: "energy",
            state: "gas",
            density: 0,
            temp: 20
        };
        
        // MODERATOR - Light grey, slows neutrons
        elements.moderator = {
            color: ["#d3d3d3", "#c8c8c8", "#dedede", "#c0c0c0"],
            behavior: behaviors.WALL,
            reactions: {
                "neutron": { "elem1": "moderator", "elem2": "slow_neutron" },
                "fast_neutron": { "elem1": "moderator", "elem2": "slow_neutron" }
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
        
        console.log('CORRECT neutron types loaded!');
        console.log('fast_neutron behavior:', elements.fast_neutron.behavior);
        console.log('slow_neutron behavior:', elements.slow_neutron.behavior);
    }
})();
